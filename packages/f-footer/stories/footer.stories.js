import { storiesOf } from '@storybook/vue';
import { select } from '@storybook/addon-knobs';
import VueFooter from '../src/components/Footer.vue'


storiesOf('Storybook Knobs', module)
  .add('f-footer', () => ({
    components: { VueFooter },
    props: {
      locale: {
        default: select('Locale', ['en-GB', 'en-AU'])
      },
    },
    template: `<vue-footer :locale="locale" />`
  })
);