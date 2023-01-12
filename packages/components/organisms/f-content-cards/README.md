<div align="center">
  <h1>f-content-cards</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Content cards component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-content-cards.svg)](https://badge.fury.io/js/%40justeat%2Ff-content-cards)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-content-cards/badge.svg)](https://coveralls.io/github/justeat/f-content-cards)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-content-cards/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-content-cards?targetFile=package.json)

# Content Cards (f-content-cards)

## Introduction

The content cards component is a headless vue component that takes an array of adapters (functions that return cards) and exposes the cards collected from these adapters via the slot prop `cards`. The component also handles the tracking events for viewing and clicking cards, which are then sent back through to the relevant adapter.

## Structure

The component has the following folder structure

- cards (folder for new cards to be placed in)
- cardTemplates (deprecated folder for older cards not yet updated)
- templates (components which are sections of content cards, used to make cards)
- ContentCards.js (Main headless component)

## Main Component (ContentCards.js)

### Props

| Name     | Type   | Required | Default       | Purpose                             |
|----------|--------|----------|---------------|-------------------------------------|
| adapters | Array  | true     | N/A           | Functions that return content cards |
| locale   | String | true     | N/A           | Users tenant, used for i18n         |
| tags     | String | false    | content-cards | Provides tags for logging           |
| filters  | Array  | false    | []            | Filters provided cards              |

### Events

| Name               | Event Data | Description |
|--------------------|------------|-------------|
| has-loaded         |            |             |
| on-error           |            |             |
| voucher-code-click |            |             |

### Slots

The `ContentCards` component makes heavy use of slots in order to surface different states of data retrieval

| Slot name | scoped data | Description                                                                                                                                                         |
|:----------|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| loading   |     {}      | The loading slot can be used by the consuming code to surface a loading state to the user before card data has been retrieved                                       |
| default   |  { cards }  | The `default` slot is used to display the cards when they have been received from the cards source instance, or alternatively injected via the `custom-cards` prop. |
| no-cards  |     {}      | The `no-cards` slot can be used to surface a message to the user when no cards have been received from the cards source(s)                                          |
| error     |     {}      | The `error` slot can be used by the consuming code to surface a message to the user when an error has been encountered upon initialising the cards source instance  |


### Data

The `state` property is set to the current state of the content cards component, using one of four states to show one of the corresponding four slots. For example `STATE_NO_CARDS` shows the no cards slot.

The `cards` array is where all the cards from all adapters are pushed into so that it can be exposed as a slot prop.

The `errors` array is used to push errors onto which occur while retrieving cards from the adapters in the `adapters` array.

The `cardObserver` is an object that holds the information about intersection time and whether its intersecting using teh cards id. (esentually the viewing time and when it comes on screen and off-screen.)

### Watchers

The `errors` property is watched so that we can update the components state to show the correct slot

## Card Templates

More information coming soon

## Future Changes

More information coming soon

## Unit Testing

More information coming soon

## Visual Regression

More information coming soon

## Prerequisites

### Vue

This component requires Vue to render. This can either be implemented as part of an existing Vue application or as a micro front-end.

If implementing Vue as part of a static application, we recommend using the following CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
```

> More information can be found at [https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include](https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include)

### yarn

This package is a lerna monorepo that makes use of yarn workspaces.

yarn can be installed with the following curl script:

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

> More information can be found at [https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

## Usage

### Installation

This package can be installed using npm or yarn:

```bash
# npm
$ npm i @justeat/f-content-cards

# yarn
$ yarn add @justeat/f-content-cards
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import { ContentCards } from '@justeat/f-content-cards';
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

## Cards

The following 'cards' are given as named exports by this package, for use by consuming
applications within the contained slots:

* `FirstTimeCustomerCard`
* `PromotionCard`
* `PostOrderCard`
* `SkeletonLoader`
* `TermsAndConditionsCard`
* `VoucherCard`
* `HomePromotionCard1`
* `HomePromotionCard2`
* `GroupHeaderCard`
* [`StampCard1`](./docs/StampCard1.md)

## Development

Start by cloning the repository and installing the required dependencies:

```bash
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-content-cards` package:

```bash
$ cd packages/f-content-cards
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the root level of the monorepo.

```bash
# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080/](http://localhost:8080/).

## Issues

Feel free to submit issues and enhancement requests.

Please use [Fozzie Components Issues](https://github.com/justeat/fozzie-components/issues) specific bugs and errors.

## Contributing

1. Optional: Fork the repo on github
2. Clone the project to your own machine
3. Create your own branch (This should follow the pattern *component-name@version* e.g. *f-content-cards@1.0.0*).
4. Ensure you've bumped the package version and added a CHANGELOG entry.
4. Push your work (Commit messages should follow the pattern *component-name@version - commit description* e.g. *f-content-cards@1.0.0 - Update README*)
5. Submit a pull request

### Versioning

Our versioning format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

For more information on versioning and previous examples please see the [CHANGELOG](CHANGELOG.md).

### Deployment

Publishing to npm is handled automatically as part of our CI process. Once a PR has been merged to master, any package versions that are not present on npm will be published as part of the master build.

More information on publihing via npm can be found in our [monorepo docs](https://vue.pie.design/?path=/story/documentation-getting-started-contributing--page/#publishing-via-npm).

## License

This project is licensed under the Apache v2.0 License - see the [LICENSE](LICENSE) file for details.
