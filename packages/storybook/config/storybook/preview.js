import Vue from 'vue';
import VueI18n from 'vue-i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import { addDecorator } from '@storybook/vue';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en-GB',
    fallbackLocale: 'en-GB',
    messages: {}
});

addDecorator(() => ({
    template: '<story/>',
    i18n
}));
