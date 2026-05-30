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

## Mozilla Firefox

Firefox allows installing signed packages from outside the add-ons store.

1. Download `<slug>-<version>-firefox.xpi`.
2. Open `about:addons`.
3. Click the gear icon, then **Install Add-on From File**, and select the `.xpi`.

For a temporary install during testing, use `about:debugging` -> **This Firefox**
-> **Load Temporary Add-on**, then select the `.xpi`. Temporary add-ons are removed
when Firefox restarts.
