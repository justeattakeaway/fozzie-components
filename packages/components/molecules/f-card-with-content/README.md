<div align="center">

# f-card-with-content

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A page content card which can contain an image, heading, text, and (primary and secondary) buttons.
The purpose of this component is to offer a reusable card with a common layout.
This may also potentially prevent the need for a consuming component to directly reference `f-card`, `f-button`, and define the layout itself.

The icon can be any image but it is recommended to use an icon from `f-vue-icons`, e.g., one of the bag icons.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-card-with-content.svg)](https://badge.fury.io/js/%40justeat%2Ff-card-with-content)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-card-with-content/badge.svg)](https://coveralls.io/github/justeat/f-card-with-content)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-card-with-content/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-card-with-content?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-card-with-content
```

```sh
npm install @justeat/f-card-with-content
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import CardWithContent from '@justeat/f-card-with-content';
import '@justeat/f-card-with-content/dist/f-card-with-content.css';

export default {
    components: {
        CardWithContent
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `card-with-content` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-card-with-content/dist/f-card-with-content.css';

export default {
    components: {
        // …
        CardWithContent: () => import(/* webpackChunkName: "card-with-content" */ '@justeat/f-card-with-content')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop                  | Type     | Default | Description                                        |
| --------------------- | -------- | ------- | -------------------------------------------------- |
| `cardHeading`         | `String` | `''`    | If given, will render an `h1` tag within the card. |
| `cardDescription`     | `String` | `''`    | If given, will render a `p` tag below the heading. |
| `primaryButton`       | `Object` | `null`  | If given, and contains the property `text`, will render a primary button below the description. Also supports `href`/`to` for using the button as an anchor or router-link. |
| `secondaryButton`     | `Object` | `null`  | If given, and contains the property `text`, will render a secondary button below the primary. Also supports `href`/`to` for using the button as an anchor or router-link.   |

### Events

The events that can be subscribed to are as follows (if any):

| Event                    | Description                                   |
| ------------------------ | --------------------------------------------- |
| `primary-button-click`   | Emitted when the primary button is clicked.   |
| `secondary-button-click` | Emitted when the secondary button is clicked. |


### Slots

The available slots are:

| Slot name | Description                                    |
| --------- | ---------------------------------------------- |
| `icon`    | For displaying an icon at the top of the card. |


## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-card-with-content` package:

```sh
$ cd packages/components/molecules/f-card-with-content
```

## Testing

To test all components, run from root directory.
To test only `f-card-with-content`, run from the `./fozzie-components/packages/components/molecules/f-card-with-content` directory.

### Unit and Integration tests

```sh
yarn test
```

### Component and Accessibility Tests

```bash
# Note: Ensure Storybook is running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
```

yarn test-component:chrome
```
### Accessibility tests
```bash
yarn test-a11y:chrome
```
## Documentation to be completed once module is in stable state.
