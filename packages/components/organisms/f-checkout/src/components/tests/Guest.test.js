import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Guest from '../Guest.vue';
import { i18n } from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Guest', () => {
    allure.feature('Checkout-Guest');

    const propsData = {};

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Guest, {
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });
});
