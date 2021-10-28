<div align="center">

# f-template-subnav

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

This component provides the styling for template that includes a breadcrumb, sub navigation navigation and a slot for the main body of the page.

On wider views, this will be laid out with the breadcrumb running along the top, the subnav on the left and the main body content positioned to the right of the subnav. A good example of where this might be used is on the account info pages.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-template-subnav.svg)](https://badge.fury.io/js/%40justeat%2Ff-template-subnav)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-template-subnav/badge.svg)](https://coveralls.io/github/justeat/f-template-subnav)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-template-subnav/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-template-subnav?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-template-subnav
```

```sh
npm install @justeat/f-template-subnav
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import TemplateSubNav from '@justeat/f-template-subnav';
import '@justeat/f-template-subnav/dist/f-template-subnav.css';

export default {
    components: {
        TemplateSubNav
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `template-subnav` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-template-subnav/dist/f-template-subnav.css';

export default {
    components: {
        // …
        TemplateSubNav: () => import(/* webpackChunkName: "template-subnav" */ '@justeat/f-template-subnav')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-template-subnav` package:

```sh
$ cd packages/components/organisms/f-template-subnav
```

## Testing

To test all components, run from root directory.
To test only `f-template-subnav`, run from the `./fozzie-components/packages/components/organisms/f-template-subnav` directory.

### Unit and Integration tests

```sh
yarn test
```
## Documentation to be completed once module is in stable state.


