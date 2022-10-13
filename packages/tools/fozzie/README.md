<div align="center">
<h1>fozzie</h1>

<img width="125" alt="Fozzie Bear" src="bear.png" />

<p>SCSS Helper Library for Front-End projects that are implementing PIE across JET.</p>
</div>

## What is Fozzie?

Fozzie is an SCSS Helper Library that's used to help ensure web projects across JET have access to a set of baseline SCSS variables, mixins and functions.

By including this helper library, the consuming web application will have access to our shared PIE Design tokens, as well as common SCSS helper mixins and functions for things like font-size, spacing and setting media queries.

## Usage

### Pre-requisites

To use the fozzie SCSS helper library, you'll need to ensure a couple of things:

1. That you use `dart-sass` to compile your Sass. The [sass](https://www.npmjs.com/package/sass) module uses dart-sass by default now, so if you use the latest version of this module, you'll be good-to-go.

   `node-sass` support in Sass has been officially deprecated and as this library uses up-to-date Sass syntax (namely `@use` and `@forward`, rather than `@import`), it won't work when compiling with `node-sass`.

2. Your build tool supports importing via the `node_modules` folder.

   Both Webpack and Parcel support this by setting `includePaths` to point to the `node_modules` folder. More info on setting this up in your project can be found in the FAQ's (TODO: Add Link to docs).

### Installation

1.  Install the fozzie module using NPM or Yarn:

    ```bash
    yarn add @justeat/fozzie
    ```

2.  Then within your Sass files, you will need to import this module.

    ```scss
    @use 'fozzie' as f;
    ```

Once you have imported fozzie into your Sass, you'll have access to the fozzie variables, mixins and functions, which can be used as in the following example:

  ```scss
    .myCoolComponent {
      // Using PIE Variables
      background: f.$color-background-default;
      border-radius: f.$radius-rounded-b;

      // Using helper mixins
      @include f.font-size('body-l');

      // Using helper functions
      padding: f.spacing('b');

      // Using media query helper
      @include media('>mid') {
        padding: f.spacing('c');
      }
    ]
  ```

## Testing
We currently test our SCSS in two ways:
1. Unit testing
2. Snapshot testing


### Unit Testing

We use a library called `sass-true` to enable writing unit tests for sass functions and mixins. These tests live in `src/test/scss/unit-tests`. We should use these as a means of documentation for our functions and mixins, as well as ensuring that API regressions aren't introduced.

### Snapshot Testing

We use `Jest` to write snapshot tests of the compiled CSS for parts of Fozzie. These live in `src/test/scss/snapshot-tests`. Snapshot tests provide a means of ensuring that no unexpected styles will be introduced for consumers of the library. They can also be used to ensure that the compiled CSS is 100% valid, or to make sure there's simply nothing unexpected being rendered.

To write these tests, we can either import an SCSS file or write a line of SCSS we'd like to test and compile it using the `compileToCss.js` module. We can then use Jest to snapshot test the outputted string.
