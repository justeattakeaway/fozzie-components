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
            default: text('Link URL', 'https://www.just-eat.co.uk/')
        },

        isExternal: {
            default: boolean('Is external', false)
        },

        opensInNewLocation: {
            default: boolean('opensInNewLocation', false)
        },

        isBold: {
            default: boolean('isBold', false)
        },

        hasTextDecoration: {
            default: boolean('hasTextDecoration', true)
        },

        isFullWidth: {
            default: boolean('isFullWidth', false)
        }

    },
    template: `<v-link ` +
                ':locale="locale" ' +
                ':linkText="linkText" ' +
                ':url="url" ' +
                ':isExternal="isExternal" ' +
                ':opensInNewLocation="opensInNewLocation" ' +
                ':isBold="isBold" ' +
                ':hasTextDecoration="hasTextDecoration"  ' +
                ':isFullWidth="isFullWidth"  ' +
                '/>'
});

VLinkComponent.storyName = 'f-link';
