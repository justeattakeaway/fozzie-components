// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Breadcrumbs from '../src/components/Breadcrumbs.vue';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const BreadcrumbsComponent = () => ({
    components: { Breadcrumbs },
    // props: {
    //     buttonType: {
    //         default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
    //     },
    //     fullWidth: {
    //         default: boolean('fullWidth', false)
    //     }
    // },
    template: '<breadcrumbs :links="links" />',
    data: () => ({
        links: ['Home', 'For you', 'Stamp Cards']
    })
});

BreadcrumbsComponent.storyName = 'f-breadcrumbs';
