#!/usr/bin/env node
// Security guard for release builds.
//
// This repository is PUBLIC and must only ever distribute minified,
// production-secured builds — never source code and never source maps
// (see CLAUDE.md). This script inspects build archives and FAILS (exit 1) if it
// finds a `.map` source map, a `sourceMappingURL` marker, or any source file
// that would leak the original code.
//
// Usage:
//   node scripts/check-release-security.mjs <path ...>     # check .zip/.xpi files or folders
//   node scripts/check-release-security.mjs --tag <tag>    # download a release's assets and check
//
// No npm dependencies: Node built-ins plus `unzip` (preinstalled on macOS and
// GitHub-hosted runners) and, for --tag, the `gh` CLI.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';

const REPO = process.env.GITHUB_REPOSITORY || 'josedacosta/josedacosta-extensions-releases';

// Forbidden ENTRY NAMES inside a build archive (matched case-insensitively).
const FORBIDDEN_NAME = [
  { re: /\.map$/i, why: 'source map' },
  { re: /\.(ts|tsx|jsx|mts|cts)$/i, why: 'TypeScript/JSX source' },
  { re: /\.(scss|sass|less|styl)$/i, why: 'CSS preprocessor source' },
  { re: /\.(vue|svelte|coffee)$/i, why: 'component/source file' },
  { re: /(^|\/)\.env(\.|$)/i, why: 'environment file' },
  { re: /(^|\/)node_modules\//i, why: 'bundled node_modules' },
  { re: /(^|\/)\.git(\/|$)/i, why: 'git metadata' },
];

// Forbidden CONTENT inside shipped text files (source-map leak markers).
const FORBIDDEN_CONTENT = [{ re: /sourceMappingURL\s*=/, why: 'sourceMappingURL marker' }];

const TEXT_EXT = new Set(['.js', '.mjs', '.cjs', '.css', '.html', '.json']);

function listEntries(archive) {
  const out = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' });
  return out
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function scanContent(archive) {
  const dir = mkdtempSync(join(tmpdir(), 'relcheck-'));
  const hits = [];
  try {
    execFileSync('unzip', ['-qq', '-o', archive, '-d', dir]);
    const walk = (current) => {
      for (const name of readdirSync(current)) {
        const full = join(current, name);
        if (statSync(full).isDirectory()) {
          walk(full);
          continue;
        }
        if (!TEXT_EXT.has(extname(name).toLowerCase())) continue;
        const text = readFileSync(full, 'utf8');
        for (const rule of FORBIDDEN_CONTENT) {
          if (rule.re.test(text)) {
            hits.push({ entry: full.slice(dir.length + 1), why: rule.why });
          }
        }
      }
    };
    walk(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  return hits;
}

function checkArchive(archive) {
  const violations = [];
  for (const entry of listEntries(archive)) {
    for (const rule of FORBIDDEN_NAME) {
      if (rule.re.test(entry)) violations.push({ entry, why: rule.why });
    }
  }
  for (const hit of scanContent(archive)) {
    violations.push(hit);
  }
  return violations;
}

// Collect the archives to check from the CLI arguments.
function collectArchives(args) {
  const isArchive = (name) => /\.(zip|xpi|crx)$/i.test(name);
  const archives = [];

  if (args[0] === '--tag') {
    const tag = args[1];
    if (!tag) {
      throw new Error('Missing tag after --tag');
    }
    const dir = mkdtempSync(join(tmpdir(), 'relassets-'));
    execFileSync(
      'gh',
      ['release', 'download', tag, '--repo', REPO, '--dir', dir, '--pattern', '*.zip', '--pattern', '*.xpi', '--clobber'],
      { stdio: 'inherit' },
    );
    for (const name of readdirSync(dir)) {
      if (isArchive(name)) archives.push(join(dir, name));
    }
    return archives;
  }

  const walk = (path) => {
    if (statSync(path).isDirectory()) {
      for (const name of readdirSync(path)) walk(join(path, name));
    } else if (isArchive(path)) {
      archives.push(path);
    }
  };
  for (const arg of args) walk(arg);
  return archives;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: check-release-security.mjs <path ...> | --tag <release-tag>');
  process.exit(2);
}

let archives;
try {
  archives = collectArchives(args);
} catch (err) {
  console.error(`Could not collect archives: ${err.message}`);
  process.exit(2);
}

if (archives.length === 0) {
  console.error('No .zip/.xpi build archives found to check.');
  process.exit(2);
}

let failed = false;
for (const archive of archives) {
  const violations = checkArchive(archive);
  const name = archive.split('/').pop();
  if (violations.length === 0) {
    console.log(`✓ ${name} — clean (no source maps, no source leaks)`);
  } else {
    failed = true;
    console.error(`✗ ${name} — ${violations.length} issue(s):`);
    for (const v of violations) {
      console.error(`    ${v.why}: ${v.entry}`);
    }
  }
}

if (failed) {
  console.error('\nSecurity check FAILED: builds must not ship source maps or source code.');
  process.exit(1);
}
console.log(`\nSecurity check passed: ${archives.length} archive(s) clean.`);
