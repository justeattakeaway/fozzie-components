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
        isExternalSite: {
            default: boolean('Opens an external site', false)
        },

        opensInNewLocation: {
            default: boolean('Open link in a new tab/window', false)
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

    computed: {
        target() {
            return this.opensInNewLocation ? '_blank' : null;
        }
    },

    template: `<v-link
                    :data-test-id="dataTestId"
                    href="https://www.just-eat.co.uk/"
                    :is-bold="isBold"
                    :has-text-decoration="hasTextDecoration"
                    :is-full-width="isFullWidth"
                    :no-line-break="noLineBreak"
                    :is-external-site="isExternalSite"
                    :target="target">
                    <span>This is a Link</span>
                </v-link>`
});

VLinkComponent.storyName = 'f-link';
