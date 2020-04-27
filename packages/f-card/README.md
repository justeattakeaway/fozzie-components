<div align="center">
<h1>f-card</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Card Component – Used for providing wrapper card styling to an element (or group of elements).</p>


---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-card.svg)](https://badge.fury.io/js/%40justeat%2Ff-card)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
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

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-card
yarn install

# followed by
yarn demo
```

### Storybook

The component is also available to demo through our storybook instance which can be served locally by running `yarn storybook:serve` from the mono-repo root.


## Props

`f-card` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

<table class="js-options">
    <tr>
        <th align="left">Prop</th>
        <th>Required</th>
        <th>Type</th>
        <th>Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td><code>locale</code></td>
        <td align="center">false</td>
        <td align="center">string</td>
        <td align="center"><code>en-GB</code></td>
        <td>
          <p>Sets the locale of the component (which determines what theme and translations to use.</p>
          <p>If the application consuming the <code>f-card</code> component is using the vue <code>i18n</code> module, then the locale from that module will be used when this prop isn't defined. When this prop is defined, it takes precedence over the locale defined by the <code>i18n</code> module.</p>
          <p>If not defined and the <code>i18n</code> module isn't present, the default locale used is <code>en-GB</code>.</p>
        </td>
    </tr>
    <tr>
        <td><code>isRounded</code></td>
        <td align="center">false</td>
        <td align="center">boolean</td>
        <td align="center"><code>false</code></td>
        <td>
            When set to <code>true</code>, rounded corners are applied to the card component.
        </td>
    </tr>
    <tr>
        <td><code>hasOutline</code></td>
        <td align="center">false</td>
        <td align="center">boolean</td>
        <td align="center"><code>false</code></td>
        <td>
            When set to <code>true</code>, an outline is applied to the card component.
        </td>
    </tr>
    <tr>
        <td><code>isPageContentWrapper</code></td>
        <td align="center">false</td>
        <td align="center">boolean</td>
        <td align="center"><code>false</code></td>
        <td>
            <p>When set to <code>true</code>, applies styles to make the card act like a page content wrapper.</p>
            <p>The card will be full width on narrow devices, and then a fixed width above a certain breakpoint width (about 480px), when the card will be centred on the page.</p>
        </td>
    </tr>
</table>
