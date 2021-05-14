import {
    withKnobs, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VLinkComponent = () => ({
    components: { VLink },
    props: {
        linkText: {
            default: text('Link Text', 'This is a link')
        },

        linkHref: {
            default: text('Link Destination', 'https://www.just-eat.co.uk/')
        },
    },
    template: `<v-link :linkText="linkText" :linkHref="linkHref"/>`
});

VLinkComponent.storyName = 'f-link';
