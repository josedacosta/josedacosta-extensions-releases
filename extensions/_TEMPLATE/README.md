# Extension Name

> Copy this `_TEMPLATE` folder to `extensions/<slug>/` to register a new extension,
> then fill in the fields below and in `extension.json`.

One short paragraph describing what the extension does and who it is for.

- **Category**: productivity
- **Store status**: self-hosted
- **Browsers**: Chrome, Firefox, Edge
- **Latest release**: link to the latest GitHub Release once published

## Metadata fields (`extension.json`)

| Field           | Type      | Notes                                                                 |
| --------------- | --------- | --------------------------------------------------------------------- |
| `slug`          | string    | URL-safe identifier, used in tags and asset names                     |
| `name`          | string    | Display name                                                          |
| `tagline`       | string    | One short sentence                                                    |
| `category`      | string    | `productivity`, `developer-tools`, `privacy`, `utilities`, ...        |
| `storeStatus`   | string    | `listed`, `rejected`, `self-hosted`, `beta`, `removed`                |
| `sourcePrivate` | boolean   | `true` when the source code is private                                |
| `browsers`      | string[]  | Any of `chrome`, `firefox`, `edge`                                    |
| `homepage`      | string    | Page on the showcase site                                            |
| `latestVersion` | string    | Set by the publish step, or `null` before the first release          |

## Installation

See the repository [INSTALL.md](../../INSTALL.md).
