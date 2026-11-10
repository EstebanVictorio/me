## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design language

The brand is defined in `brand-guidelines.pdf` at the repo root (source of truth). It is encoded as Tailwind v4 theme tokens in `src/styles/`, one file per concern, all imported by `src/styles/global.css`:

| File | Owns |
|---|---|
| `colors.css` | Brand palette + semantic roles. Tailwind's default palette is removed (`--color-*: initial`). |
| `typography.css` | Font roles + the brand type scale |
| `motion.css` | Easings, entrance animations, `animate-delay-*`, reduced-motion handling |
| `base.css` | Defaults for bare elements (`html`, headings, links, selection, focus) |
| `components.css` | Brand components as `@utility` classes: `btn-primary`, `btn-outline`, `btn-light`, `chip`, `chip-accent` |

Global styles and fonts load once in `src/layouts/Layout.astro`. Every page uses that layout.

### Color: 60 / 30 / 10

- **60% page** → `bg-background` (Janna in light, Bronze in dark). Raised surface: `bg-surface`
- **30% text** → `text-foreground` (Big Stone in light, Janna in dark). Secondary text: `text-foreground-muted`
- **10% Rob Roy** `#E8C77A`: buttons, links, highlights → `bg-accent` / `text-accent-ink`. Text on a Rob Roy fill is `text-on-accent`
- Brand values: Big Stone `#1A2340`, Janna `#F4EAD5`, Rob Roy `#E8C77A`, and **Bronze** `#615432` (Rob Roy 900 promoted to a primary of its own; it is the dark-mode page).
- Raw scales exist (`big-stone-100…900`, `janna-…`, `rob-roy-…`, `bronze-100…900`). Use them only when no semantic role fits. They do **not** change with the theme.
- Never put Rob Roy text on Janna (1.4:1), and never put Janna text on a Rob Roy tint (1.1:1). These pairs are for shapes only. Don't use pale, low-contrast text.
- Bronze is a mid-dark, so its pairings have less contrast: Janna on Bronze is 6.2:1, and plain Rob Roy on Bronze is 4.6:1 (fine for shapes, too close for text). The roles already account for this. Check contrast before adding raw-scale text on Bronze.
- Don't add new colors unless the brand guide changes.

### Themes: light and dark

| Theme | Page | Text | Gold text (`text-accent-ink`) |
|---|---|---|---|
| Light | Janna | Big Stone | Rob Roy 900 |
| Dark (default dark) | Bronze | Janna | Rob Roy 300 |
| Dark, Big Stone palette | Big Stone | Janna | Rob Roy |

- **Which theme loads:** the visitor's stored choice (`localStorage` key `theme`: `"light"` | `"dark"`) → else the OS color-scheme setting → else light. Until the visitor picks one, the page follows OS changes live.
- **Big Stone night** is kept as an alternative dark palette: add `data-dark-palette="big-stone"` to `<html>` in `src/layouts/Layout.astro`. Bronze is used otherwise.
- The roles swap per theme via `data-theme` (and `data-dark-palette`) on `<html>` (see `colors.css`). Use roles and every theme works for free.
- Rob Roy as a **fill** is `bg-accent` in every theme. As **text** use `text-accent-ink`. Never use `text-accent`.
- Per-theme tweaks: the `light:` and `dark:` variants (attribute-based, not media queries). `dark:` covers both dark palettes.
- The inline script in `src/layouts/Layout.astro` applies the theme before first paint. `src/components/ThemeToggle.astro` is the switch. Keep the two in sync, including the `theme-color` meta values (`#f4ead5`, `#615432`, `#1a2340`).

### Typography

- **Cormorant Garamond** (`font-heading`) for headlines only: `text-display-xl`, `text-display`, `text-h1`, `text-h2`.
- **Niramit** (`font-body`, the default) for everything people read: `text-h3` (semibold), `text-intro`, `text-large`, `text-body`, `text-small`, `text-label` (use with `uppercase`).
- Use the brand sizes, not Tailwind's generic `text-xl`/`text-4xl`. Each brand size already sets its own line-height, tracking and weight.
- Fonts come from Astro's Fonts API (`fonts` in `astro.config.mjs`). Add weights there, not via `<link>` tags.
- Never stretch or squash type. Keep the hero size at or below `text-display-xl` (6rem max).

### Shape, icons, motion

- Buttons and chips are pills (`rounded-full`). Larger panels use soft radii.
- The Rob Roy circle is a brand motif. Use it as a graphic shape, not as a container for text.
- Icons: [Feather Icons](https://feathericons.com) (stroke-based, MIT). Don't mix in other icon sets.
- Motion is calm: exponential ease-outs (`ease-out-expo`, `ease-out-quart`), no bounce. Entrances are CSS keyframes (`animate-rise`, `animate-fade`, `animate-sun`), so content stays visible without JS. Reduced motion is handled globally in `motion.css`.

### Tailwind usage: strict

- Style with Tailwind utility classes in markup, using the brand tokens above. Don't write `<style>` blocks, inline `style=""` or ad-hoc CSS files.
- If a value keeps coming back, add a token to the matching `src/styles/*.css` file and don't repeat arbitrary values (`[...]`). If a pattern keeps coming back, add an `@utility` to `components.css`.
- Deviate (scoped `<style>`, custom CSS, arbitrary values) only when the complexity truly warrants it, e.g. complex keyframes, SVG/canvas effects, or selectors Tailwind can't express. Leave a one-line comment saying why.
- Use `@apply` only inside `src/styles/*.css`, never in components.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
