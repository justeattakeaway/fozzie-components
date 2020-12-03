import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { addDecorator } from '@storybook/vue';
import { ENGLISH_LOCALE } from '../constants/globalisation';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: ENGLISH_LOCALE,
    fallbackLocale: ENGLISH_LOCALE,
    messages: {}
});

addDecorator(() => ({
    template: '<story/>',
    i18n
}));
