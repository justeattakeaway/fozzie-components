import { storiesOf } from '@storybook/vue';
import VueCheckout from '../src/components/Checkout.vue';

storiesOf('Components', module)
  .add('f-checkout', () => ({
    components: { VueCheckout },
    template: `<vue-checkout />`
  })
);
