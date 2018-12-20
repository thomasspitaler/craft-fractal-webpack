# Project Template: Fractal and webpack for use with Craft cms

Basic starter project that uses [Fractal](https://fractal.build/) for managing components and [webpack](https://webpack.js.org/) for building the frontend, to be used with  [Craft cms](https://craftcms.com/).

Besides of an example `templates/index.html`, this repository does not contain any files specific to the Craft cms installation.

Instead, it contains configuration files for both Fractal and webpack as well as npm scripts for building the frontend, running the Fractal server, and making the components available to Craft cms.

## Installation

Copy the files in this repository to an existing Craft cms project, then run

```
npm install
```

If you already have a `package.json`, take care not to overwrite it and instead merge the `package.json` in this repository with your `package.json`.

Same with `.gitignore` or any other files that might overlap.

Then install the [Fractal plugin for Craft 3](https://github.com/ournameismud/fractal) using composer:

```
composer require ournameismud/fractal
```

and install the plugin in the Craft control panel.

## Watching and Building

The components to be built are located in the directory `src/components`, and the build output will be located in the `build` directory.

To start a build run:

```
npm run dev
```

This will create and copy assets to `build`. Webpack is launched in watch mode (`-w` option), and Fractal is run with the `--sync` option. Visit http://localhost:3000 to access the Fractal server.

## Providing the Components to Craft cms

To deploy the components for use in Craft cms, run:

```
npm run deploy
```

This will copy all the `.twig` files in `build` to `templates`, preserving the directory structure.

JavaScript and CSS assets will be copied from `build` to `web`.

The `components-map.json` file required by the Fractal plugin for Craft 3 will be copied from `build` to the project root directory.

For an example of how to use the components in your Craft cms templates, see `templates/index.html`:

```
{% include '@blockquote' with {
    'text': 'Something stupid.',
    'citation': 'A guy in love'
} %}
```

## Production Build

TODO implement
