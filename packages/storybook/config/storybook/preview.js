import Vue from 'vue';
import VueI18n from 'vue-i18n';

// Setup Context as a Web Host (I18n, Cookies etc)
import '../../context/index';

import { addDecorator } from '@storybook/vue';
import { ENGLISH_LOCALE } from '../../constants/globalisation';

Vue.use(VueI18n);

Vue.config.devtools = true;

const i18n = new VueI18n({
    locale: ENGLISH_LOCALE,
    fallbackLocale: ENGLISH_LOCALE,
    messages: {}
});

addDecorator(() => ({
    template: '<story/>',
    i18n
}));
