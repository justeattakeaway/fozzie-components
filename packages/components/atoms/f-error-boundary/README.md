<div align="center">

# f-error-boundary

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A reusable component for catching JavaScript errors and displaying fallback UIs

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-error-boundary.svg)](https://badge.fury.io/js/%40justeat%2Ff-error-boundary)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-error-boundary --exact
```

```sh
npm install @justeat/f-error-boundary --save-exact
```

### Vue Applications

You can import it in your Vue SFC like this:

```js
import ErrorBoundary from '@justeat/f-error-boundary';

export default {
    components: {
        ErrorBoundary
    }
}
```
### Example Usage

Here are some examples of how you can set up and use the error boundary component

#### Control visibility component using the `hideOnError` prop

Setting the prop to `true` will automatically hide the nested component when an error is thrown. Currently there is no option to display fallback content using this technique.

```html
<error-boundary hide-on-error>
  <component-that-throws />
</error-boundary>
```

#### Use a slot prop to control visibility

The error boundary component provides a `hasError` boolean slot prop that you can use to control element visibility as well as display fallback content.

```html
<error-boundary #default="{ hasError }">
  <fallback-component v-show="hasError">
  <component-that-throws v-show="!hasError" />
</error-boundary>
```

#### Use event to control visibility

The error boundary will trigger an `on-error` event when an error is caught. This can be used to control element visibility as well as display fallback content.

```html
<template>
  <error-boundary @on-error="handleComponentError">
    <fallback-component v-show="shouldHideComponent">
    <component-that-throws v-show="!shouldHideComponent" />
  </error-boundary>
</template>

<script>
export default {
  data: () => ({
    shouldHideComponent: false
  }),

  methods: {
    handleComponentError () {
      this.shouldHideComponent = true;
    }
  }
}
</script>
```
#### Wrap the error boundary component in order to provide custom behaviour across the app

If you'd like to apply some custom behaviour when errors are captured you can wrap the error boundary component and use that throughout your application.

```html
<template>
    <error-boundary
        v-show="showComponent"
        v-bind="$attrs"
        @on-error="handleComponentError">
        <slot />
    </error-boundary>
</template>

<script>
import ErrorBoundary from '@justeat/f-error-boundary';
import loggerService from '../../services/logger.service';

export default {
    components: {
        ErrorBoundary
    },

    data: () => ({
        showComponent: true
    }),

    methods: {
        handleComponentError ({
            error,
            vm,
            info,
            loggerPayload
        }) {
            this.showComponent = false;

            // Do something custom with the error values
            const error = loggerService.buildVueError(err, vm, info);
            loggerService.pushError(error);
            clearTimeout(this.waitForBatch);
            this.waitForBatch = setTimeout(loggerService.sendErrorLogs, 25);

            // OR

            // Log the error info using the `loggerPayload`
            loggerService.logError(
              `Error in ${info}: "${error.toString()}"`,
              loggerPayload
            );
        }
    }
};
</script>
```

## Configuration

`f-error-boundary` offers a few ways to handle component visibility following an error being thrown as well as logging related options.

### Props

`f-error-boundary` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop              | Type      | Required   | Default  | Description |
| :---              | :---:     | :---:      | :---:    | :---        |
| `tier`            | `String`  | No         | `null`   | Set a tier level associated with the wrapped component. If set, the value will be included in the `loggingPayload` object. |
| `stopPropagation` | `Boolean` | No         | `true`   | Controls whether errors should continue to propagate up through parent components. |
| `hideOnError`     | `Boolean` | No         | `false`  | Hides the component from view when an error is captured. |

### Events

The events that can be subscribed to are as follows:

| Event       | Description |
| :---        | :---        |
| `on-error`  | Fired when an error is captured, args are detailed in the [error properties section](#error-properties). |

### Slot Props

Slot properties that can be read are are detailed in the [error properties section](#error-properties).

### Error Properties

The events that can be subscribed to are as follows:

| Name            | Type      | In Slot Prop?  | In Error Event? | Description |
| :---            | :---:     | :---           | :---:           | :---        |
| `hasError`      | `Boolean` | `true`         | `false`         | Indicates if an error was captured. |
| `error`         | `Object`  | `true`         | `true`          | The error object. |
| `vm`            | `Object`  | `true`         | `true`          | Vue component object. |
| `info`          | `String`  | `true`         | `true`          | Vue-specific error info, e.g. which lifecycle hook the error was found in. |
| `tier`          | `String`  | `true`         | `true`          | Component tier level. |
| `loggerPayload` | `Object`  | `true`         | `true`          | Object containing error info in a format ready to be sent to a logging endpoint. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-error-boundary` package:

```sh
$ cd packages/components/atoms/f-error-boundary
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-error-boundary directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
