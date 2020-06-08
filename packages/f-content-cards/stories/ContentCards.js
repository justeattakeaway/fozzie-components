import { storiesOf } from '@storybook/vue';
import ContentCards from '../src/components/ContentCards.vue';

storiesOf('Components', module)
  .add('f-content-cards', () => ({
      components: { ContentCards },
      template: '<content-cards />'
  }));
