import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '../Header.vue';
import { i18n, defaultState, createStore } from './helpers/setup';
import EventNames from '../../event-names';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Header', () => {
    allure.feature('Checkout-Header');

    const propsData = {
        loginUrl: 'http://dummy-login.example.com'
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Header, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper).toBeDefined();
    });

    describe('computed ::', () => {
        describe('isLoggedIn ::', () => {
            describe('when set to true', () => {
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultState, isLoggedIn: true }),
                    i18n,
                    localVue,
                    propsData
                });

                it('should render the user header', () => {
                    // Arrange
                    const userHeader = wrapper.find('[data-test-id="user-header"]');

                    // Assert
                    expect(userHeader).toBeDefined();
                });

                it('should show the login link', () => {
                    // Arrange
                    const loginLink = wrapper.find("[data-test-id='switch-user-link']");

                    // Assert
                    expect(loginLink).toBeDefined();
                    expect(loginLink.text()).toBe(`Not ${defaultState.customer.firstName}? Click here.`);
                });
            });

            describe('when set to false', () => {
                const wrapper = shallowMount(Header, {
                    i18n,
                    localVue,
                    store: createStore({ ...defaultState, isLoggedIn: false }),
                    propsData
                });

                it('should render the guest header', () => {
                    // Arrange
                    const guestHeader = wrapper.find('[data-test-id="guest-header"]');

                    // Assert
                    expect(guestHeader).toBeDefined();
                });

                it('should show the login link', () => {
                    // Arrange
                    const loginbutton = wrapper.find("[data-test-id='guest-login-button']");

                    // Assert
                    expect(loginbutton).toBeDefined();
                });
            });
        });

        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Act
                const wrapper = shallowMount(Header, {
                    store: createStore({
                        ...defaultState,
                        customer: {
                            ...defaultState.customer,
                            firstName: 'joe'
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const { name } = wrapper.vm;

                // Assert
                expect(name).toEqual('Joe');
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Act
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultState, isLoggedIn: true }),
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

    describe('methods ::', () => {
        describe('onVisitLoginPage ::', () => {
            it('should emit the `VisitLoginPage` event when login link is clicked.', () => {
                // Arrange
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultState, isLoggedIn: true }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const loginLink = wrapper.find("[data-test-id='switch-user-link']");
                loginLink.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutVisitLoginPage).length).toBe(1);
            });

            it('should emit the `VisitLoginPage` event when login button is clicked.', () => {
                // Arrange
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultState, isLoggedIn: false }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const loginLink = wrapper.find("[data-test-id='guest-login-button']");
                loginLink.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutVisitLoginPage).length).toBe(1);
            });
        });
    });
});
