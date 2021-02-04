import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Error from '../Error.vue';
import {
    i18n, createStore
} from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Error', () => {
    allure.feature('Checkout-Error');
    const propsData = {};

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(Error, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the header', () => {
        // Arrange & Act
        const wrapper = shallowMount(Error, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        const header = wrapper.find('[data-test-id="checkout-error-page-header"]');

        // Assert
        expect(header.text()).toMatchSnapshot();
    });

    it('should show the description', () => {
        // Arrange & Act
        const wrapper = shallowMount(Error, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        const description = wrapper.find('[data-test-id="checkout-error-page-description"]');

        // Assert
        expect(description.text()).toMatchSnapshot();
    });
});
