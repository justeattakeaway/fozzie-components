import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs';
import VueHeader from '../src/components/Header.vue'

const userInfo = {
  "friendlyName" : "John",
  "isAuthenticated" : true,
  "email" : "je@test.com",
  "userData" : {
    "globalUserId" : "HIklAeKVjNy36xgHiqcWHdY6gjk=",
    "userId" : "5BBD2617",
    "authType" : "Login",
    "signinType" : "Email",
    "signupDate" : "2018-05-21T22:54:49.4630000Z",
    "email" : "8f8f5657841d20ab618b4eefd347a6c1e37294d304c4457a2847f1b06322ab41",
    "a-UserId" : "30e7b5e5-e1ee-476b-9ddd-cbc82855f944",
    "consumerStatus" : "Undefined"  
  }
}

storiesOf('Shared', module)
  .addDecorator(withKnobs)
  .add('f-header', () => ({
    components: { VueHeader },
    props: {
      locale: {
        default: select('Locale', ['en-GB', 'en-AU'])
      },
      showOffersLink: {
        default: boolean('Show offers link', false)
      },
      showDeliveryEnquiry: {
        default: boolean('Show delivery enquiry', false)
      },
      headerBackgroundTheme: {
        default: select('Header theme', ["white", "red", "transparent"])
      },
      userInfoProp: {
        default: object('User info', userInfo)
      },
    },
    parameters: {
      notes: 'some documentation here',
    },
  template: `<vue-header :userInfoProp="userInfoProp" :showOffersLink="showOffersLink" :locale="locale" :headerBackgroundTheme="headerBackgroundTheme" :showDeliveryEnquiry="showDeliveryEnquiry" />`
}));
