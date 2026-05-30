# José DA COSTA - Browser Extension Releases

Public distribution of build artifacts for my browser extensions.

The source code of each extension is private. This repository hosts only the
compiled builds, published as GitHub Releases, so anyone can download and install
them without access to the source. GitHub does not allow public releases on a
private repository (asset visibility follows repository visibility), so the
private source repositories publish their builds here instead.

Showcase site: https://extensions.josedacosta.net

## How this repository is organized

- The compiled builds (`.zip`, `.xpi`) live in the **Releases**, not in the Git tree.
- The Git tree holds only documentation and per-extension metadata, so it stays small and readable.

```
.
├── README.md                  # this file
├── INSTALL.md                 # per-browser install instructions
└── extensions/
    ├── _TEMPLATE/             # copy this folder to add a new extension
    │   ├── extension.json     # canonical metadata
    │   ├── README.md          # description and latest-release link
    │   └── CHANGELOG.md       # human-readable changelog
    └── <slug>/                # one folder per extension
```

## Naming conventions

| Item        | Pattern                                   | Example                              |
| ----------- | ----------------------------------------- | ------------------------------------ |
| Git tag     | `<slug>-v<semver>`                        | `tab-master-pro-v2.1.0`              |
| Release name| `<Name> <semver>`                         | `Tab Master Pro 2.1.0`               |
| Chrome asset| `<slug>-<version>-chrome.zip`             | `tab-master-pro-2.1.0-chrome.zip`    |
| Firefox     | `<slug>-<version>-firefox.xpi`            | `tab-master-pro-2.1.0-firefox.xpi`   |
| Edge        | `<slug>-<version>-edge.zip`               | `tab-master-pro-2.1.0-edge.zip`      |
| Checksums   | `SHA256SUMS.txt`                          | one per release                      |

A single repository hosts every extension. The slug prefix on each tag keeps
releases from different extensions from colliding.

## Available extensions

No public release yet. New extensions appear here once their first build is published.

## Installation

See [INSTALL.md](./INSTALL.md). Some of these extensions are distributed outside
the Chrome Web Store, so they are installed in developer mode or as a signed
Firefox package.

## License

The build artifacts are provided as-is for installation. The source code remains
private and is not covered by this repository.
