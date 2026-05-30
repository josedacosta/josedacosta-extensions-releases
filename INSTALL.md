# Installation

Each release ships one build per browser. Download the file that matches your
browser from the extension's latest release, then follow the steps below.

## Verify the download (optional but recommended)

Each release includes a `SHA256SUMS.txt`. Check the file integrity before installing:

```bash
sha256sum --check SHA256SUMS.txt
```

## Google Chrome

These extensions may be distributed outside the Chrome Web Store, so Chrome
installs them in developer mode.

1. Download `<slug>-<version>-chrome.zip` and unzip it to a permanent folder.
2. Open `chrome://extensions`.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the unzipped folder.

Keep the folder in place. Removing it uninstalls the extension.

## Microsoft Edge

1. Download `<slug>-<version>-edge.zip` and unzip it to a permanent folder.
2. Open `edge://extensions`.
3. Turn on **Developer mode** (left sidebar).
4. Click **Load unpacked** and select the unzipped folder.

## Opera

1. Download `<slug>-<version>-opera.zip` and unzip it to a permanent folder.
2. Open `opera://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the unzipped folder.

## Mozilla Firefox

These builds are not signed by Mozilla, so release Firefox installs them as a
temporary add-on (removed on restart). For a permanent install, use Firefox
Developer Edition, Nightly, or ESR with `xpinstall.signatures.required` set to
`false` in `about:config`.

1. Download `<slug>-<version>-firefox.zip`.
2. Open `about:debugging` -> **This Firefox** -> **Load Temporary Add-on**.
3. Select the downloaded `.zip` (or the `manifest.json` inside its unzipped folder).

## Safari

Safari requires wrapping the build in a Safari Web Extension app with Xcode
(`xcrun safari-web-extension-converter`), then signing it with an Apple Developer
certificate. The `<slug>-<version>-safari.zip` asset is the starting point for
that conversion.
