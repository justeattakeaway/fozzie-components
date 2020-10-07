import { storiesOf } from '@storybook/vue';
import VueAlert from '../src/components/Alert.vue';

storiesOf('Components', module)
  .add('f-alert', () => ({
    components: { VueAlert },
    template: `<vue-alert />`
  })
);
