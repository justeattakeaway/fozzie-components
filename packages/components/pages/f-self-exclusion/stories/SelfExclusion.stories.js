import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import Vuex from 'vuex';
import SelfExclusion from '../src/components/SelfExclusion.vue';
import fSelfExclusionModule from '../src/store/selfExclusion.module';


export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const SelfExclusionComponent = (args, { argTypes }) => ({
    components: { SelfExclusion },

    props: Object.keys(argTypes),

    store: new Vuex.Store({
        modules: {
            fSelfExclusionModule
        }
    }),

    template:
        `<self-exclusion
        authToken="some-auth-token"
        :isAuthFinished="true"
        :locale="locale"
        smart-gateway-base-url=""
    />`
});

SelfExclusionComponent.storyName = 'f-self-exclusion';

SelfExclusionComponent.args = {
    locale: locales.gb
};

SelfExclusionComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }
};
