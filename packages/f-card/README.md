<div align="center">
<h1>f-card</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Card Component – Used for providing wrapper card styling to an element (or group of elements).</p>


---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-card.svg)](https://badge.fury.io/js/%40justeat%2Ff-card)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-card/badge.svg)](https://coveralls.io/github/justeat/f-card)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-card/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-card?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-card
    ```

    ```bash
    npm install @justeat/f-card
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import CardComponent from '@justeat/f-card';
    import '@justeat/f-card/dist/f-card.css';

    export default {
        components: {
            CardComponent
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-card/dist/f-card.css';

    export default {
        components: {
            ...
            CardComponent: () => import(/* webpackChunkName: "vue-card" */ '@justeat/f-card')
        }
    }

    ```

## Props

`f-card` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop                      | Required       | Type          | Default | Description |
| :---                      |     :---:      |     :---:     |  :---:  | :---        |
| locale                    | false          | `string`      | `en-GB` | Sets the locale of the component (which determines what theme and translations to use.<br><br>If the application consuming the `f-card` component is using the vue `i18n` module, then the locale from that module will be used when this prop isn't defined. When this prop is defined, it takes precedence over the locale defined by the `i18n` module.<br><br>If not defined and the `i18n` module isn't present, the default locale used is `en-GB`.|
| isRounded                | false           | `boolean`     | `false` | When set to `true`, rounded corners are applied to the card component. |
| hasOutline               | false           | `boolean`     | `false` | When set to `true`, an outline is applied to the card component.  |
| isPageContentWrapper     | false           | `boolean`     | `false` | When set to `true`, applies styles to make the card act like a page content wrapper.<br><br>The card will be full width on narrow devices, and then a fixed width above a certain breakpoint width (about 480px), when the card will be centred on the page. |
| cardHeadingPosition     | false           | `string`     | `left` | Sets the text alignment of the card component's heading.<br><br>When set to `left` the heading will aligned to the left.<br>When set to `center` the heading will be centrally aligned.<br>When set to `right` the heading will be aligned to the right. |

## Development
It is recommended to run the following commands at the root of the monorepo in order to install dependencies and allow you to view components in isolation via Storybook.

```bash
# cd ./fozzie-components
yarn install

## Testing
Unit / Integration / Contract

```bash
# Run Unit / Integration / Contract tests for all components
cd ./fozzie-components
yarn test
```

OR

```bash
# Run Unit / Integration / Contract tests for f-card
cd ./fozzie-components/packages/f-card
yarn test
```

Component Tests
```bash
# Run Component tests for all components
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

OR

```bash
# Run Component tests for f-card
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-card
yarn test-component:chrome
```
