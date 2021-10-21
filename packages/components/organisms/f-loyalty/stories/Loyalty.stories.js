import { withA11y } from '@storybook/addon-a11y';
import Vue from 'vue';
import Vuex from 'vuex';
import VLoyalty from '../src/components/Loyalty.vue';
import loyaltyModule from '../src/store/loyalty.module';

Vue.use(Vuex);

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const VLoyaltyComponent = (args, { argTypes }) => ({
    components: { VLoyalty },

    props: Object.keys(argTypes),

    store: new Vuex.Store({
        modules: {
            loyaltyModule
        }
    }),

    template: '<v-loyalty v-bind="$props" />'
});

VLoyaltyComponent.storyName = 'f-loyalty';

VLoyaltyComponent.args = {
    brazeApiKey: '__TEST_API_KEY__'
};
