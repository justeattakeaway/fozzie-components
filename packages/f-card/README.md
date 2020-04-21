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

## Documentation to be completed once module is in stable state.
