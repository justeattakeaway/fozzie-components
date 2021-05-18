import {
    withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';
import { locales } from '@justeat/storybook/constants/globalisation';
import { VALID_LINK_TARGETS } from '../src/constants';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VLinkComponent = () => ({
    components: { VLink },
    props: {
        locale: {
            default: select('Locale', [locales.gb])
        },

        linkText: {
            default: text('Link Text', 'This is a link')
        },

        linkHref: {
            default: text('Link Destination', 'https://www.just-eat.co.uk/')
        },

        isBold: {
            default: boolean('Is bold', false)
        },

        hasDecoration: {
            default: boolean('Has text decoration', true)
        },

        isFullWidth: {
            default: boolean('Is full-width', false)
        },

        target: {
            default: select('Link target', VALID_LINK_TARGETS)
        },

        isExternalLink: {
            default: boolean('Is external', false)
        }
    },
    template: `<v-link ` +
                ':locale="locale" ' +
                ':linkText="linkText" ' +
                ':linkHref="linkHref" ' +
                ':isBold="isBold" ' +
                ':hasDecoration="hasDecoration"  ' +
                ':isFullWidth="isFullWidth" ' +
                ':target="target" ' +
                ':isExternalLink="isExternalLink" ' +
                '/>'
});

VLinkComponent.storyName = 'f-link';
