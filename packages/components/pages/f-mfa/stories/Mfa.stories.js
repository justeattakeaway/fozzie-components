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

    template: '<v-mfa code="ABC999" email="harry.potter@dot.com" v-bind="$props" />'
});

VMfaComponent.storyName = 'f-mfa';

VMfaComponent.args = {
    locale: locales.gb,
    smartGatewayBaseUrl: 'https://smart-gateway.just-eat.co.uk'
};

VMfaComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb, locales.ie, locales.au, locales.nz, locales.es, locales.it],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }
};
