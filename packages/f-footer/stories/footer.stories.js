import { select, boolean } from '@storybook/addon-knobs';
import VueFooter from '../src/components/Footer.vue';

export default {
    title: 'Shared'
};

export const FooterComponent = () => ({
    components: { VueFooter },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        showCourierLinks: {
            default: boolean('Show courier links', true)
        }
    },
    template: '<vue-footer :showCourierLinks="showCourierLinks" :locale="locale" />'
});

FooterComponent.story = {
    name: 'f-footer'
};
