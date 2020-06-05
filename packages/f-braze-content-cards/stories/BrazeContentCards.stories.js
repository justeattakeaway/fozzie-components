import { storiesOf } from '@storybook/vue';
import BrazeContentCards from '../src/components/BrazeContentCards.vue';

storiesOf('Components', module)
  .add('f-braze-content-cards', () => ({
      components: { BrazeContentCards },
      template: '<BrazeContentCards />'
  }));
