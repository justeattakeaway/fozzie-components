<div align="center">
<h1>fozzie</h1>

<img width="125" alt="Fozzie Bear" src="bear.png" />

<p>SCSS Helper Library for Front-End projects that are implementing PIE across JET.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ffozzie.svg)](https://badge.fury.io/js/%40justeat%2Ffozzie)
[![Build Status](https://travis-ci.org/justeat/fozzie.svg)](https://travis-ci.org/justeat/fozzie)
[![Coverage Status](https://coveralls.io/repos/github/justeat/fozzie/badge.svg)](https://coveralls.io/github/justeat/fozzie)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/justeat/fozzie.svg)](https://lgtm.com/projects/g/justeat/fozzie/alerts/)

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
