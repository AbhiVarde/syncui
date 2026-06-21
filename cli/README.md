# syncui

A CLI for adding components and blocks to your project.

## Install

You can use syncui directly without installing anything.

```bash
npx @abhivarde/syncui@latest add accordion
```

Or install it globally once, then use the shorter `syncui` command everywhere.

```bash
npm install -g @abhivarde/syncui
```

The rest of this guide assumes you've installed it globally.

## add

Use the `add` command to add a component or block to your project.

The `add` command writes the code directly into your project and prints the dependencies you need to install. Nothing is added as a package dependency, you own the code.

```bash
syncui add [name]
```

### Example

```bash
syncui add accordion
```

Running `add` without a variant uses the default style. To add a specific variant, use `[name]/[variant]`.

```bash
syncui add accordion/brutalist
```

This works the same way for blocks.

```bash
syncui add hero
syncui add hero/center
```

## list

Use the `list` command to view every component and block available.

```bash
syncui list
```

## Options

Use `--path` to choose a custom output directory, and `--overwrite` to replace a file that already exists.

```bash
syncui add buttons --path src/ui --overwrite
```

## Package managers

If you'd rather not install globally, the same commands work with any package manager.

```bash
npx @abhivarde/syncui@latest add accordion
pnpm dlx @abhivarde/syncui@latest add accordion
yarn dlx @abhivarde/syncui@latest add accordion
bunx --bun @abhivarde/syncui@latest add accordion
```

## Documentation

Visit https://syncui.design to browse the full component library and preview every variant.

## License

Licensed under the [MIT license](https://github.com/AbhiVarde/syncui/blob/main/LICENSE.md).
