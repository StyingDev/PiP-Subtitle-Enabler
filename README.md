# 🖼️ Firefox PiP Subtitle Enabler

A simple Firefox extension that forces all `<video>` elements to activate their soft subtitles (`<track>` elements), ensuring they're visible in Picture-in-Picture (PiP) mode - **if the browser and site support it**.


## I) Why This Might Help

Firefox **does** support displaying subtitles in PiP, but only if:
- The subtitles are part of the native `<track>` element (WebVTT format).
- The `mode` of the track is set to `"showing"` **before** PiP is activated.

Most sites don’t default to `'showing'`, so this extension ensures subtitles are active and ready for PiP use.

## II) Installation

<details>
<summary><h2>🦊 Firefox</h2></summary>

### Option 1: Official Store Download
1. Visit the [Firefox Addon Store](https://addons.mozilla.org/en-US/firefox/addon/pip-subtitle-enabler/)
2. Click "Add to Firefox"

### Option 2: Manual Installation
1. Download the latest release
2. Navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select any file from the downloaded folder
</details>



## III) Limitations

* **Does NOT work** with JS-rendered or WASM-rendered captions (e.g. Crunchyroll, canvas, divs).
* **Cannot generate subtitles** where none exist.
* Firefox may intentionally restrict PiP captions on some domains for security/privacy.



## IV) Credits

Thanks to Ataeshi for the inspiration and technical breakdown.

## V) License

This project is licensed under the MIT License, check out the [LICENSE](LICENSE) file for details.
