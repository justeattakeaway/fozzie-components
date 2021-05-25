import {
    withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';
import { DEFAULT_LINK_TYPE, VALID_LINK_TYPE, VALID_LINK_TYPES }  from '../src/constants'
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
        linkType: {
            default: select('Link Type', VALID_LINK_TYPES, DEFAULT_LINK_TYPE)
        },

        isBold: {
            default: boolean('isBold', false)
        },

        hasTextDecoration: {
            default: boolean('hasTextDecoration', true)
        },

        isFullWidth: {
            default: boolean('isFullWidth', false)
        },

        noLineBreak: {
            default: boolean('noLineBreak', false)
        }

    },
    template: `<v-link
                    :data-test-id="dataTestId"
                    href="https://www.just-eat.co.uk/"
                    :link-type="linkType"
                    :is-bold="isBold"
                    :has-text-decoration="hasTextDecoration"
                    :is-full-width="isFullWidth"
                    :no-line-break="noLineBreak"
                >
                    <span>This is a Link</span>
                </v-link>`
});

VLinkComponent.storyName = 'f-link';
