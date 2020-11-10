// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import <%= name.component %> from '../src/components/<%= name.filename %>.vue';

import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '../../storybook/constants/globalisation';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const <%= name.component %>Component = () => ({
    components: { <%= name.component %> },
    props: {
        locale: {
            default: select('Locale', VALID_LOCALES, ENGLISH_LOCALE)
        },
        buttonType: {
            default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
        },
        fullWidth: {
            default: boolean('fullWidth', false)
        }
    },
    template: `<<%= name.template %> :locale="locale" />`
});

<%= name.component %>Component.storyName = 'f-<%= name.default %>';
