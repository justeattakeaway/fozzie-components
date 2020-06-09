
<div align="center">
  <h1>f-content-cards</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Content cards component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-content-cards.svg)](https://badge.fury.io/js/%40justeat%2Ff-content-cards)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-content-cards/badge.svg)](https://coveralls.io/github/justeat/f-content-cards)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-content-cards/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-content-cards?targetFile=package.json)

## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-content-cards
    ```

    ```bash
    npm install @justeat/f-content-cards
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import ContentCards from '@justeat/f-content-cards';
    import '@justeat/f-content-cards/dist/f-content-cards.css';

    export default {
        components: {
            ContentCards
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-content-cards/dist/f-content-cards.css';

    export default {
        components: {
            ...
            ContentCards: () => import(/* webpackChunkName: "f-content-cards" */ '@justeat/f-content-cards')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-content-cards
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
