// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import StampcardsHeader from '../src/components/StampcardsHeader.vue';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const StampcardsHeaderComponent = () => ({
    components: { StampcardsHeader },
    // props: {
    //     buttonType: {
    //         default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
    //     },
    //     fullWidth: {
    //         default: boolean('fullWidth', false)
    //     }
    // },
    template: `<stampcards-header />`
});

StampcardsHeaderComponent.storyName = 'f-stampcards-header';
