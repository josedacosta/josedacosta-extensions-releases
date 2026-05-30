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

| Item          | Pattern                          | Example                              |
| ------------- | -------------------------------- | ------------------------------------ |
| Git tag       | `<slug>-v<semver>`               | `linkedin-enhancer-v0.7.0`           |
| Release name  | `<Name> <semver>`                | `LinkedIn Enhancer 0.7.0`            |
| Browser asset | `<slug>-<version>-<browser>.zip` | `linkedin-enhancer-0.7.0-chrome.zip` |
| Checksums     | `SHA256SUMS.txt`                 | one per release                      |

`<browser>` is one of `chrome`, `firefox`, `edge`, `opera`, `safari`. Source
archives are never published here - the source code stays private.

A single repository hosts every extension. The slug prefix on each tag keeps
releases from different extensions from colliding.

## Available extensions

<!-- BEGIN:index -->
<!-- Managed by scripts/build-index.mjs (Sync index workflow). Do not edit by hand. -->

| Extension | Category | Status | Latest | Browsers |
| --------- | -------- | ------ | ------ | -------- |
| [AI Chat Export by José DA COSTA](./extensions/ai-chat-export/) | productivity | self-hosted | [1.29.0](https://github.com/josedacosta/josedacosta-extensions-releases/releases/tag/ai-chat-export-v1.29.0) | chrome, firefox, edge, brave, opera |
| [LinkedIn Enhancer by José DA COSTA](./extensions/linkedin-enhancer/) | productivity | self-hosted | [0.8.1](https://github.com/josedacosta/josedacosta-extensions-releases/releases/tag/linkedin-enhancer-v0.8.1) | chrome, firefox, edge, opera, safari |

<!-- END:index -->

## Installation

See [INSTALL.md](./INSTALL.md). Some of these extensions are distributed outside
the Chrome Web Store, so they are installed in developer mode or as a signed
Firefox package.

## License

The build artifacts are provided as-is for installation. The source code remains
private and is not covered by this repository.
