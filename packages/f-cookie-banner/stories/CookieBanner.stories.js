// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import CookieBanner from '../src/components/CookieBanner.vue';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const CookieBannerComponent = () => ({
    components: { CookieBanner },
    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
        },
        fullWidth: {
            default: boolean('fullWidth', false)
        }
    },
    template: `<cookie-banner />`
});

CookieBannerComponent.storyName = 'f-cookie-banner';
