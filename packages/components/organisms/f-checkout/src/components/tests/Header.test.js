import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Header from '../Header.vue';
import { i18n, createStore, defaultState } from './helpers/setup';
import EventNames from '../../event-names';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Header', () => {
    allure.feature('Checkout-Header');

    const propsData = {
        isGuest: false,
        name: defaultState.customer.firstName,
        loginUrl: 'http://dummy-login.example.com'
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Header, {
            i18n,
            store: createStore(),
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Act
                const wrapper = shallowMount(Header, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const title = wrapper.find("[data-test-id='user-title']");

                // Assert
                expect(title.text()).toEqual(`${defaultState.customer.firstName}, confirm your details`);
            });
        });
    });

    describe('computed ::', () => {
        describe('onVisitLoginPage ::', () => {
            it('should emit the `VisitLoginPage` event when login link is clicked.', () => {
                // Arrange
                const wrapper = mount(Header, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData
                });

                // Act
                const loginLink = wrapper.find("[data-test-id='switch-user-link']");
                loginLink.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutVisitLoginPage).length).toBe(1);
            });
        });
    });
});
