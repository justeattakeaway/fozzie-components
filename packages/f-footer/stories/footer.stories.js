import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import VueFooter from '../src/components/Footer.vue'


storiesOf('Shared', module)
  .add('f-footer', () => ({
    components: { VueFooter },
    props: {
      localeProp: {
        default: select('Locale', ['en-GB', 'en-AU'])
      },
      showCourierLinks: {
        default: boolean('Show courier links', true)
      }
    },
    template: `<vue-footer :showCourierLinks="showCourierLinks" :localeProp="localeProp" />`
  })
);