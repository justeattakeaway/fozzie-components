import Vue from 'vue';
import Cookie from 'cookie-universal';

// Check out the Cookie Universal docs for usage -> https://www.npmjs.com/package/cookie-universal
// In your mono repo component use this.$cookies.get('je-auser');
Vue.prototype.$cookies = Cookie();
