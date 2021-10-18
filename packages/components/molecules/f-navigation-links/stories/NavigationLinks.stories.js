// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import NavigationLinks from '../src/components/NavigationLinks.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const NavigationLinksComponent = () => ({
    components: { NavigationLinks },
    props: {
    },
    template: '<navigation-links />'
});

NavigationLinksComponent.storyName = 'f-navigation-links';
