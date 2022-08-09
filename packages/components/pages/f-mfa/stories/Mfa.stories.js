import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import VMfa from '../src/components/Mfa.vue';
import {
    apiStateControlDataSource,
    setupApiMockState
} from './story.helper';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const VMfaComponent = (args, { argTypes }) => ({
    components: { VMfa },

    props: Object.keys(argTypes),

    watch: {
        apiState: {
            immediate: true,
            async handler (value) {
                setupApiMockState(value);
            }
        }
    },

    template: '<v-mfa v-bind="$props" />'
});

VMfaComponent.storyName = 'f-mfa';

VMfaComponent.args = {
    locale: locales.gb,
    smartGatewayBaseUrl: 'https://some-smart-gateway-url.com',
    code: 'ABC123',
    email: 'harry.potter@home.com',
    returnUrl: '/where/i/came/from',
    apiState: apiStateControlDataSource.default
};

VMfaComponent.argTypes = {
    locale: {
        control: {
            type: 'select'
        },
        options: [locales.gb, locales.ie, locales.au, locales.nz, locales.es, locales.it],
        description: 'Choose a locale'
    },
    apiState: {
        control: {
            type: 'select'
        },
        options: apiStateControlDataSource.states,
        description: apiStateControlDataSource.title
    }
};
