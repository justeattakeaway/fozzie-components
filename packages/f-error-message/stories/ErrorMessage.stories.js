import { storiesOf } from '@storybook/vue';
import ErrorMessage from '../src/components/ErrorMessage.vue';

storiesOf('Components', module)
  .add('f-error-message', () => ({
    components: { ErrorMessage },
    template: `<error-message />`
  })
);
