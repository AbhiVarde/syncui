# syncui

A CLI for setting up and adding components and blocks to your project.

## Install

You can use syncui directly without installing anything.

```bash
npx @abhivarde/syncui@latest init
```

Or install it globally once, then use the shorter `syncui` command everywhere.

```bash
npm install -g @abhivarde/syncui
```

The rest of this guide assumes you've installed it globally.

## init

Use the `init` command to set up Sync UI in your project.

It detects your framework, creates a `components.json` config, sets up an import alias if one doesn't exist, and installs the base dependencies.

```bash
syncui init
```

## add

Use the `add` command to add a component or block to your project.

The `add` command writes the code directly into your project and installs any missing dependencies automatically. Nothing is added as a package dependency, you own the code.

```bash
syncui add [name]
```

### Example

```bash
syncui add card
```

Running `add` without a variant uses the default style. To add a specific variant, use `[name]/[variant]`.

```bash
syncui add card/lens
```

This works the same way for blocks.

```bash
syncui add hero
syncui add hero/left
```

## list

Use the `list` command to view every component and block available.

```bash
syncui list
```

## Options

Use `--path` to choose a custom output directory, `--overwrite` to replace a file that already exists, and `--skip-install` to skip automatic dependency installation.

```bash
syncui add buttons --path src/ui --overwrite
syncui add buttons --skip-install
```

## Package managers

If you'd rather not install globally, the same commands work with any package manager.

```bash
npx @abhivarde/syncui@latest init
npx @abhivarde/syncui@latest add accordion
pnpm dlx @abhivarde/syncui@latest add accordion
yarn dlx @abhivarde/syncui@latest add accordion
bunx --bun @abhivarde/syncui@latest add accordion
```

## Documentation

Visit https://syncui.design to browse the full component library and preview every variant.

## License

Licensed under the [MIT license](https://github.com/AbhiVarde/syncui/blob/main/LICENSE.md).