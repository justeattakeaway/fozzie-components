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

This component requires data that it needs to pass on to embedded components. This can be done using the following props:

| Prop  | Type  | Default | Required | Description |
| ----- | ----- | ------- | ----- | ----------- |
| breadcrumbs-links | array | [ ] | true | An array of links objects (_see example #1 below_) |
| navigation-links | array | [ ] | true | An array of links objects (_see example #2 below_) |

Example #1
```js
[
  {
    id: 'accountNavLinkInfo'  // Test Data Id
    url: '/account/info',     // Url
    name: 'Your account',     // Text Label
    selected: false
  },
  {
    id: 'accountNavLinkOrderHistory',
    url: '/order-history',
    name: 'Your orders',
    selected: true            // True indicates the currently selected item
  }
]
```
Example #2
```js
[
  {
    // Start of breadcrumb
    name: 'Link 1',
    url: '/link/1',
    routerLink: false
  },
  {
    name: 'Link 2',
    url: '/link/2',
    routerLink: true
  },
  {
    // End of (Current Active Page) breadcrumb
    name: 'Link 2'
  }
];
```
### Slots

This component has a space (main body) for a dynamic component to be added at runtime via a slot, see an example below:

```js
  <template-sub-nav
      :breadcrumb-links="breadcrumbLinks"
      :navigation-links="navigationLinks">
```
The Slot component is then added here:
```
      <contact-preferences
          :auth-token="authToken"
          :locale="locale"
          :smart-gateway-base-url="settings.smartGatewayBaseUrl" />
```
```js
  </template-sub-nav>
```

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
### Component and Accessibility Tests

As this component holds no, or very little, logic it only needs visual testing which will be the responsibility of the consuming component.


