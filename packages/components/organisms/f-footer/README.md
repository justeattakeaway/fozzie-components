<div style="text-align: center">

# f-footer

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Global Footer Component for Vue.js.
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-footer.svg)](https://badge.fury.io/js/%40justeat%2Ff-footer)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-footer/badge.svg)](https://coveralls.io/github/justeat/f-footer)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-footer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-footer?targetFile=package.json)

---

## Usage

### Installation

```sh
yarn add @justeat/f-footer
```

```sh
npm install @justeat/f-footer
```

#### Vue Applications

```js
import VueFooter from '@justeat/f-footer';
import '@justeat/f-footer/dist/f-footer.css';

export default {
    components: {
        VueFooter
    }
}
```

#### Webpack

Import the component dynamically to separate the _footer_ bundle from the main `bundle.client.js`:

```js
import '@justeat/f-footer/dist/f-footer.css';

export default {
    components: {
        ...
        VueFooter: () => import(/* webpackChunkName: "vue-footer" */ '@justeat/f-footer')
    }
}
```

If there's a _vue-i18n_ plugin in the project, _footer_ can be called without any props.

e.g.:

```vue
<vue-footer />
```

Or you can pass locale as a property to specify the tenant:

```vue
<vue-footer locale="en-GB" />`
```

## Browser Support

The component extends [@justeat/browserslist-config-fozzie](https://github.com/justeat/browserslist-config-fozzie).

## Configuration

### Props

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `locale` | `String` | Empty | Set the translation file to use. |
| `showCourierLinks` | `bool` | `true` | Show/hide the courier link buttons |

### CSS Classes

| Class | Description |
| ----- | ----------- |

### Events

| Event | Description |
| ----- | ----------- |

## Development

```sh
git clone git@github.com:justeat/fozzie-components.git
cd fozzie-components
yarn
```
## Testing

### Unit, Integration and Contract

Run from the `f-footer` directory.

```sh
yarn test
```

## Component Tests

If storybook is not running, start it:

```sh
yarn storybook:build
yarn storybook:serve-static
```

Once Storybook is listening, run the following from with the root or the component directory.

```sh
yarn test-component:chrome
```
