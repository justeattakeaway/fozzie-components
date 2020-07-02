import { select, boolean } from '@storybook/addon-knobs';
import VueFooter from '../src/components/Footer.vue';
import { withA11y } from '@storybook/addon-a11y';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
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
