# esbuild-svelte-dts

An esbuild plugin to generate typescript declaration files for svelte components.

## Why

I had a hard time finding a plugin that wasn't outdated or worked at all.

## How

I looked at how `svelte-kit` was doing things and so this here is a rough copy of their solution, which at the heart uses `svelte2tsx` and adds some overhead to trick `tsc` into accepting svelte files. The problem with this trick (renaming `.svelte` files to `.svelte.ts`) is, that the resolution process in my editor didn't work (because wrong filenames). So still no types.

I made it work without the extra complexity and put it into plugin form. Seems to work. Works for me at least.

The plugin makes a list of all the files it needs to process when they are loaded by esbuild. The actual processing happens when the build is done, so the build itself should be fast as ever.

This plugin can also generate declarations for typescript files, by supplying an appropriate `filter`.

## Disclaimer

This plugin works for me and should work in general, but I don't know. Maybe that extra complexity was good for something after all.

Feel free to open an issue or provide a pull request.

## Installation

Just install the package with your favourite package manager

```sh
npm install -D @sngn/esbuild-svelte-dts
pnpm add -D @sngn/esbuild-svelte-dts
```

## Usage

Add the plugin to your plugins list. All options are optional.

I would have thought one ought to put the plugin before `esbuild-svelte` (or whichever plugin you use to process `.svelte` files), but it seems not to matter.

If it doesn't work for you after, put it in front.


```js
import {default as svelteDts} from "@sngn/esbuild-svelte-dts";
...
  plugins: [
    ...
    svelteDts({
      filter: /(\.svelte)$/,
    }),
    ...
  ],
...
```

## Options

```js
type Params = {
  /**
   * files that match this regular expression will be processed by the plugin
   *
   * @default /(\.svelte)$/
   */
  filter ?:RegExp;
};
```

