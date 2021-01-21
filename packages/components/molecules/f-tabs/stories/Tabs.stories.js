// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueTabs from '../src/components/Tabs.vue';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const VueTabsComponent = () => ({
    components: { VueTabs },
    // props: {
    //     buttonType: {
    //         default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
    //     },
    //     fullWidth: {
    //         default: boolean('fullWidth', false)
    //     }
    // },
    template: '<vue-tabs />'
});

VueTabsComponent.storyName = 'f-tabs';
