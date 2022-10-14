import { action } from '@storybook/addon-actions';
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

    props: Object.keys(argTypes, args),

    methods: {
        mfaSuccess: action('mfa-success')
    },

    watch: {
        apiState: {
            immediate: true,
            async handler (value) {
                setupApiMockState(value);
            }
        }
    },

    template: `<v-mfa
        v-bind="$props"
        @mfa-success-return-url="mfaSuccess" />`
});

VMfaComponent.storyName = 'f-mfa';

VMfaComponent.args = {
    locale: locales.gb,
    validateUrl: 'http://localhost:8080/mfa/validate',
    code: '0AbCdEfG1_2HiJkLmNoP3-4QrStUvWxYz5',
    email: 'harry.potter@home.com',
    returnUrl: '/where/i/came/from',
    apiState: apiStateControlDataSource.default
};

VMfaComponent.argTypes = {
    locale: {
        control: {
            type: 'select'
        },
        options: [locales.gb, locales.au, locales.nz],
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
