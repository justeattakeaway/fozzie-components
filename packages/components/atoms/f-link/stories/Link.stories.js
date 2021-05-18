import {
    withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';
import { locales } from '@justeat/storybook/constants/globalisation';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

// Removes DK and NO from `@justeat/storybook/constants/globalisation` locales
const availableLocales = [
    locales.gb,
    locales.au,
    locales.nz,
    locales.ie,
    locales.es,
    locales.it
]

export const VLinkComponent = () => ({
    components: { VLink },
    props: {
        locale: {
            default: select('Locale', availableLocales)
        },

        linkText: {
            default: text('Link Text', 'This is a link')
        },

        url: {
            default: text('Link Destination', 'https://www.just-eat.co.uk/')
        },

        isExternalLink: {
            default: boolean('Is external', false)
        },

        opensInNew: {
            default: boolean('new', false)
        },

        isBold: {
            default: boolean('Is bold', false)
        },

        hasDecoration: {
            default: boolean('Has text decoration', true)
        },

        isFullWidth: {
            default: boolean('Is full-width', false)
        }

    },
    template: `<v-link ` +
                ':locale="locale" ' +
                ':linkText="linkText" ' +
                ':url="url" ' +
                ':isExternalLink="isExternalLink" ' +
                ':opensInNew="opensInNew" ' +
                ':isBold="isBold" ' +
                ':hasDecoration="hasDecoration"  ' +
                '/>'
});

VLinkComponent.storyName = 'f-link';
