import { withA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import ContactPreferences from '../src/components/ContactPreferences.vue';

export default {
    title: 'Components/Pages',
    decorators: [withKnobs, withA11y]
};

export const ContactPreferencesComponent = () => ({
    components: {
        ContactPreferences
    },
    props: {
        locale: {
            default: select('Locale', [locales.gb], locales.gb)
        }
    },
    template: `<contact-preferences
        :locale="locale"
        smart-gateway-base-url="https://localhost:8080" />`
});

ContactPreferencesComponent.storyName = 'f-contact-preferences';
