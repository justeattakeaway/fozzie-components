import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '../Header.vue';
import {
    i18n, defaultCheckoutState, createStore, $logger
} from './helpers/setup';
import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY } from '../../constants';
import EventNames from '../../event-names';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Header', () => {
    allure.feature('Checkout-Header');

    const propsData = {
        loginUrl: 'http://localhost/login'
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
                let wrapper;

                beforeEach(() => {
                    wrapper = shallowMount(Header, {
                        store: createStore({ ...defaultCheckoutState, isLoggedIn: true }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should render the authenticated user header', () => {
                    // Arrange
                    const userHeader = wrapper.find('[data-test-id="user-header"]');

                    // Assert
                    expect(userHeader).toBeDefined();
                });

                it('should show the link to switch users', () => {
                    // Arrange
                    const loginLink = wrapper.find("[data-test-id='switch-user-link']");

                    // Assert
                    expect(loginLink).toBeDefined();
                    expect(loginLink.text()).toBe(`Not ${defaultCheckoutState.customer.firstName}? Click here`);
                });
            });

            describe('when set to false', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = shallowMount(Header, {
                        store: createStore({ ...defaultCheckoutState, isLoggedIn: false }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should render the guest header', () => {
                    // Arrange
                    const guestHeader = wrapper.find('[data-test-id="guest-header"]');

                    // Assert
                    expect(guestHeader).toBeDefined();
                });

                it('should show the button to register or login', () => {
                    // Arrange
                    const loginButton = wrapper.find("[data-test-id='guest-login-button']");

                    // Assert
                    expect(loginButton).toBeDefined();
                });
            });
        });

        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Act
                const wrapper = shallowMount(Header, {
                    store: createStore({
                        ...defaultCheckoutState,
                        customer: {
                            ...defaultCheckoutState.customer,
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

        describe('serviceType ::', () => {
            it.each([
                [CHECKOUT_METHOD_DELIVERY],
                [CHECKOUT_METHOD_COLLECTION]
            ])('should update serviceType confirmation with the %s service type', serviceType => {
                // Arrange
                const wrapper = shallowMount(Header, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: false,
                        serviceType
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const confirmation = wrapper.find("[data-test-id='service-type-confirmation']");
                const received = `Please confirm your ${serviceType} details`;

                // Assert
                expect(confirmation.text()).toEqual(received);
            });
        });
    });

    describe('methods ::', () => {
        describe('onVisitLoginPage ::', () => {
            it('should emit the `VisitLoginPage` event and call `logInfo` when switch user link is clicked.', () => {
                // Arrange
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultCheckoutState, isLoggedIn: true }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act
                const loginLink = wrapper.find("[data-test-id='switch-user-link']");
                loginLink.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutVisitLoginPage).length).toBe(1);
                expect($logger.logInfo).toHaveBeenCalled();
            });

            it('should emit the `VisitLoginPage` event when guest login button is clicked.', () => {
                // Arrange
                const wrapper = shallowMount(Header, {
                    store: createStore({ ...defaultCheckoutState, isLoggedIn: false }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act
                const loginLink = wrapper.find("[data-test-id='guest-login-button']");
                loginLink.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutVisitLoginPage).length).toBe(1);
                expect($logger.logInfo).toHaveBeenCalled();
            });
        });
    });
});
