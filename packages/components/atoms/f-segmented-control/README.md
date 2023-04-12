<div align="center">

# f-segmented-control

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-segmented-control.svg)](https://badge.fury.io/js/%40justeat%2Ff-segmented-control)

---

## Usage
A Segmented Control component is a group of toggle buttons that behave like a single choice element. It is useful for displaying a set of options to the user when only one option can be selected.


Import the SegmentedControl component in your .vue file and use it as follows:

```
<template>
    <SegmentedControl
        :screenreaderLabel="screenreaderLabel"
        :options="options"
        :size="size"
    />
</template>

<script>
import SegmentedControl from '@justeat/f-segmented-control';

export default {
    components: { SegmentedControl },
    data() {
        return {
            screenreaderLabel: 'Select an option',
            options: [
                { label: 'Option 1', iconName: 'SomeIconName' },
                { label: 'Option 2' },
                { label: 'Option 3', selected: true },
                { label: 'Option 4', disabled: true }
            ],
            size: 'large', // Can be 'small' or 'large', defaults to 'small'
        };
    }
};
</script>

```

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-segmented-control
```

```sh
npm install @justeat/f-segmented-control
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import SegmentedControl from '@justeat/f-segmented-control';
import '@justeat/f-segmented-control/dist/f-segmented-control.css';

export default {
    components: {
        SegmentedControl
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `segmented-control` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-segmented-control/dist/f-segmented-control.css';

export default {
    components: {
        // …
        SegmentedControl: () => import(/* webpackChunkName: "segmented-control" */ '@justeat/f-segmented-control')
    }
}
```

## Configuration

### Props

| Prop | Type | Required | Default | Validator | Description |
| --- | --- | --- | --- | --- | --- |
| `screenreaderLabel` | `String` | `true` | N/A | N/A | The label that is read by screen readers to describe the segmented control |
| `options` | `Array` | `true` | N/A | Array must have 2-3 elements, and each element must have a `label` property of type `string`. The `iconName`, `disabled`, and `selected` properties are optional. `iconName` corresponds with the name of a PIE Icon found [here](https://github.com/justeattakeaway/pie/tree/main/packages/tools/pie-icons-vue). `selected` will set the default selected option. | An array of objects representing each button in the segmented control |
| `size` | `String` | `false` | `'small'` | Must be either `'small'` or `'large'`. | The size of the segmented control |



### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| input | Emitted when the user selects an option. The value emitted is the label of the selected option. |

## Accessibility
The Segmented Control component follows accessibility best practices and includes support for keyboard navigation. Users can use the arrow keys to navigate between options and the space or enter key to select an option. The component also includes ARIA attributes for screen readers.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-segmented-control` package:

```sh
$ cd packages/components/atoms/f-segmented-control
```

## Testing

To test all components, run from root directory.
To test only `f-segmented-control`, run from the `./fozzie-components/packages/components/atoms/f-segmented-control` directory.

### Unit and Integration tests

```sh
yarn test
```

### Component Tests

```bash
# Note: Ensure Storybook is running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

### Accessibility tests
```bash
yarn test-a11y:chrome
```

## Documentation to be completed once module is in stable state.


