import { withA11y } from '@storybook/addon-a11y';
import VueFooter from '../src/components/Footer.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y],
    parameters: {
        a11y: {
            element: '.c-footer', // root element
            config: {},
            options: {
                rules: {
                    'duplicate-id': { enabled: false }
                }
            }
        },
        layout: 'fullscreen'
    }
};

export const FooterComponent = (args, { argTypes }) => ({
    components: { VueFooter },
    props: Object.keys(argTypes),
    template: `
        <vue-footer
            style="margin-top: 300px"
            :showCourierLinks="showCourierLinks"
            :locale="locale"
            :showCountrySelector="showCountrySelector" />`
});

FooterComponent.storyName = 'f-footer';

FooterComponent.args = {
    locale: 'en-GB',
    showCourierLinks: false,
    showCountrySelector: false
};


FooterComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        description: 'Select a tenant',
        options: ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']
    },

    showCourierLinks: {
        control: { type: 'boolean' },
        description: 'If set to true, courier links are displayed'
    },

    showCountrySelector: {
        control: { type: 'boolean' },
        description: 'If set to true, country selector is displayed'
    }
};

