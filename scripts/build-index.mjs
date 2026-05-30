#!/usr/bin/env node
// Regenerates the "Available extensions" table in README.md and refreshes the
// `latestVersion` field of every extensions/<slug>/extension.json from the
// published GitHub Releases of this repository.
//
// Run by .github/workflows/sync-index.yml. No npm dependencies: Node built-ins
// plus the `gh` CLI, which is preinstalled on GitHub-hosted runners.

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO = process.env.GITHUB_REPOSITORY || 'josedacosta/josedacosta-extensions-releases';
const EXT_DIR = 'extensions';
const README = 'README.md';
const BEGIN = '<!-- BEGIN:index -->';
const END = '<!-- END:index -->';

// 1. Every extension folder, minus the template.
const slugs = readdirSync(EXT_DIR).filter(
  (name) => name !== '_TEMPLATE' && statSync(join(EXT_DIR, name)).isDirectory(),
);

// 2. Releases, reduced to the most recent one per slug.
let releases = [];
try {
  const raw = execFileSync(
    'gh',
    ['release', 'list', '--repo', REPO, '--limit', '300', '--json', 'tagName,publishedAt,isDraft'],
    { encoding: 'utf8' },
  );
  releases = JSON.parse(raw);
} catch (err) {
  console.warn(`Could not list releases, continuing with none: ${err.message}`);
}

const latestBySlug = new Map();
for (const rel of releases) {
  if (rel.isDraft) continue;
  const match = /^(.+)-v(\d+\.\d+\.\d+.*)$/.exec(rel.tagName);
  if (!match) continue;
  const [, slug, version] = match;
  const prev = latestBySlug.get(slug);
  if (!prev || new Date(rel.publishedAt) > new Date(prev.publishedAt)) {
    latestBySlug.set(slug, { version, publishedAt: rel.publishedAt, tagName: rel.tagName });
  }
}

// 3. Refresh each extension.json and build the table rows.
const rows = [];
for (const slug of slugs.sort()) {
  const metaPath = join(EXT_DIR, slug, 'extension.json');
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  const latest = latestBySlug.get(slug) || null;

  meta.latestVersion = latest ? latest.version : null;
  writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

  const latestCell = latest
    ? `[${latest.version}](https://github.com/${REPO}/releases/tag/${latest.tagName})`
    : 'unreleased';
  const browsers = (meta.browsers || []).join(', ');
  rows.push(`| [${meta.name}](./extensions/${slug}/) | ${meta.category} | ${meta.storeStatus} | ${latestCell} | ${browsers} |`);
}

const table = ['| Extension | Category | Status | Latest | Browsers |', '| --------- | -------- | ------ | ------ | -------- |', ...rows].join('\n');

// 4. Inject the table between the markers.
const readme = readFileSync(README, 'utf8');
const start = readme.indexOf(BEGIN);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  throw new Error(`Markers ${BEGIN} / ${END} not found in ${README}`);
}
const block = `${BEGIN}\n<!-- Managed by scripts/build-index.mjs (Sync index workflow). Do not edit by hand. -->\n\n${table}\n\n`;
writeFileSync(README, readme.slice(0, start) + block + readme.slice(end));

console.log(`Index rebuilt: ${slugs.length} extension(s), ${latestBySlug.size} with a release.`);
