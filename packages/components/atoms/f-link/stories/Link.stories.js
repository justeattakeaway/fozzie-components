import {
    withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VLinkComponent = () => ({
    components: { VLink },
    data () {
        return {
            dataTestId: 'link-component'
        }
    },
    props: {
        linkText: {
            default: text('Link Text', 'This is a link')
        },

        isExternal: {
            default: boolean('isExternal', false)
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
    template: `<v-link
                    :data-test-id="dataTestId"
                    href="https://www.just-eat.co.uk/"
                    :link-text="linkText"
                    :url="url"
                    :is-external="isExternal"
                    :opens-in-new-location="opensInNewLocation"
                    :is-bold="isBold"
                    :has-text-decoration="hasTextDecoration"
                    :is-full-width="isFullWidth"
                />`
});

VLinkComponent.storyName = 'f-link';
