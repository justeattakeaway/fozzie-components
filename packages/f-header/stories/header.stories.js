import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import VueHeader from '../src/components/Header.vue'

storiesOf('Storybook Knobs', module)
  .addDecorator(withKnobs)
  .add('f-header', () => ({
    components: { VueHeader },
    props: {
      locale: {
        default: select('Locale', ['en-GB', 'en-AU'])
      },
      showDeliveryEnquiry: {
        default: boolean('Show Delivery Enquiry', true)
      },
      showForYouCopy: {
        default: boolean('Show For You copy', true)
      },
      headerBackgroundTheme: {
        default: select('Header theme', ["white", "red", "transparent"])
      }
    },
  template: `<vue-header :locale="locale" :headerBackgroundTheme="headerBackgroundTheme" :showDeliveryEnquiry="showDeliveryEnquiry" />`
}));