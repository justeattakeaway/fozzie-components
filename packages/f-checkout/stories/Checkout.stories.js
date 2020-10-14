import VueCheckout from '../src/components/Checkout.vue';
import results from '../src/components/tests/.jest-test-results.json';
import { withTests } from '@storybook/addon-jest';

export default {
  title: 'Components/Organisms',
  decorators: [withTests({ results })]
};

export const Checkout = () => ({
  components: { VueCheckout },
  template:
      '<vue-checkout />',
  parameters: {
    notes: 'some documentation here'
}
});

Checkout.parameters = {
  jest: ['Checkout.test.js'],
};

Checkout.storyName = 'f-checkout';