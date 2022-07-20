import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import VMfa from '../src/components/Mfa.vue';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const VMfaComponent = (args, { argTypes }) => ({
    components: { VMfa },

    props: Object.keys(argTypes),

    template: '<v-mfa v-bind="$props" />'
});

VMfaComponent.storyName = 'f-mfa';

VMfaComponent.args = {
    locale: locales.gb
};

VMfaComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }
};
