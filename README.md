# 🌙 Luna — Drupal 11 Theme

A full-featured, production-ready Drupal 11 theme built on [Halfmoon CSS](https://gethalfmoon.com) (v2.0.2).
Dark/light mode, three built-in core themes, 25+ components, and a fully editor-managed hero section.

---

## Installation

### Fresh install

```bash
unzip luna-drupal11-theme.zip -d web/themes/custom/
drush theme:enable luna
drush config:set system.theme default luna
drush cr
```

### Upgrading from a previous Luna version

```bash
drush cr
drush cim --partial --source=web/themes/custom/luna/config/install/
drush cr
```

---

## Setting up the Hero section

The hero section is a **Custom Block** managed entirely through the Drupal UI.

### Step 1 — Create the Hero block

**Structure → Block layout → Custom block library → Add custom block → Hero**

| Field | Description |
|-------|-------------|
| Block description | Internal label, e.g. "Home Hero" |
| Heading | Main headline. Use `<em>word</em>` for accent colour. |
| Subheading | Short paragraph below the heading. |
| CTA Button Text | Button label, e.g. "Learn More" |
| CTA Button URL | Destination, e.g. `/about` |
| Hero Style | Gradient (default), Dark, or Light |

### Step 2 — Place the block

**Structure → Block layout → Hero region → Place block**

Set page visibility to `<front>` to show it only on the home page.

### Step 3 — Done

To edit the content later: **Structure → Block layout → Custom block library → Edit**

---

## Theme Settings

**Appearance → Luna → Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| Halfmoon Core | modern | Default / Modern / Elegant |
| Default Color Mode | light | First-visit default |
| Dark Mode Toggle | true | Show toggle in navbar |
| Layout Width | wide | fluid / wide / normal / narrow |
| Sidebar Position | right | left or right |
| Footer Text | auto | Blank = auto from site name + year |

---

## Requirements

- Drupal 11.x
- Core modules: block_content, link, options (enabled by default)
- No contributed modules required

---

## License

MIT
