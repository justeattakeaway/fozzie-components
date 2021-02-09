import { select, boolean } from '@storybook/addon-knobs';
import VueFooter from '../src/components/Footer.vue';
import { withA11y } from '@storybook/addon-a11y';

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
        }
    }
};

export const FooterComponent = () => ({
    components: { VueFooter },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO'])
        },
        showCourierLinks: {
            default: boolean('Show courier links', false)
        },
        showCountrySelector: {
            default: boolean('Show country selector', false)
        }
    },
    template: `
        <vue-footer
            :showCourierLinks="showCourierLinks"
            :locale="locale"
            :showCountrySelector="showCountrySelector" />`
});

FooterComponent.storyName = 'f-footer';
