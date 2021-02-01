// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import <%= name.component %> from '../src/components/<%= name.filename %>.vue';

export default {
    title: 'Components/<%= storybook.componentCategory %>',
    decorators: [withA11y]
};

export const <%= name.component %>Component = () => ({
    components: { <%= name.component %> },
    props: {
    },
    template: `<<%= name.template %> />`
});

<%= name.component %>Component.storyName = 'f-<%= name.default %>';
