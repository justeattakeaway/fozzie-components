// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ContactPreferences from '../src/components/ContactPreferences.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const ContactPreferencesComponent = () => ({
    components: {
        ContactPreferences
    },
    props: {
    },
    template: `<contact-preferences
        get-preferences-url="/consumer/preferences" />`
});

ContactPreferencesComponent.storyName = 'f-contact-preferences';
