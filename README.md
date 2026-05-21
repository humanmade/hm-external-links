# HM External Links

A WordPress plugin that automatically detects and handles external links sitewide — no configuration needed. On every page load it scans all links and:

- Opens external links in a new tab (`target="_blank"`)
- Adds `rel="noopener noreferrer"` (preserving any existing `rel` values)
- Optionally displays an icon after external links in `header`, `footer`, and navigation items

Links added dynamically after page load (e.g. via AJAX or the Interactivity API) are handled automatically too.

## Installation

Drop the plugin folder into `wp-content/plugins/` or `client-mu-plugins/` and activate it.

The `build/` directory is included so no build step is required.

## Disabling the icon

The icon is shown by default. To disable it:

```php
add_filter( 'hm_external_links_show_icon', '__return_false' );
```

## Customising the icon appearance

The icon inherits its size from two CSS custom properties. If your theme already defines these (e.g. for button arrow icons), the external link icon will match automatically. You can also override them directly:

```css
:root {
    --arrow-size: 0.9em;
    --arrow-margin: 0.5em;
}
```

To replace the icon SVG entirely, override the CSS variable the plugin injects:

```css
:root {
    --hm-external-icon-url: url('/path/to/your-icon.svg');
}
```

## Accessibility note

The plugin adds `target="_blank"` to external links but does not automatically announce this to screen reader users. It is recommended to add a visible or visually-hidden indication (e.g. "(opens in new tab)") in your theme where relevant.

## Development

```bash
npm install
npm run build
```
