import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Error from '../Error.vue';
import {
    i18n,
    $cookies,
    $logger,
    createStore,
    defaultCheckoutState
} from './helpers/setup';
import { CHEKOUT_ERROR_FORM_TYPE } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Error', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange & Act

        wrapper = shallowMount(Error, {
            i18n,
            localVue,
            store: createStore({
                ...defaultCheckoutState,
                basket: {
                    id: 'MGFkMzgwZjgtYjY3Yi00Nz-v1',
                    total: 0
                }
            }),
            propsData: {
                errorFormType: CHEKOUT_ERROR_FORM_TYPE.default,
                redirectUrl: 'menu-jason-1'
            },
            mocks: {
                $cookies,
                $logger
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the heading', () => {
        // Act
        const heading = wrapper.find('[data-test-id="checkout-error-page-heading"]');

        // Assert
        expect(heading.text()).toMatchSnapshot();
    });

    it('should show the description', () => {
        // Act
        const description = wrapper.find('[data-test-id="checkout-error-page-description"]');

        // Assert
        expect(description.text()).toMatchSnapshot();
    });

    describe('methods', () => {
        describe('`redirectToMenu` ::', () => {
            const oldWindowLocation = window.location;

            beforeAll(() => {
                delete window.location;

                window.location = Object.defineProperties(
                    {},
                    {
                        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
                        assign: {
                            configurable: true,
                            value: jest.fn()
                        }
                    }
                );
            });

            afterAll(() => {
                window.location = oldWindowLocation;
            });

            describe('when invoked', () => {
                it('should redirect the customer back to the menu page so the user can navigate back from the error', () => {
                    // Act
                    wrapper.vm.redirectToMenu();

                    // Assert
                    expect(window.location.assign).toHaveBeenCalledWith('menu-jason-1');
                });

                describe('AND errorFormType is accessForbiddenError', () => {
                    beforeEach(async () => {
                        await wrapper.setProps({ errorFormType: CHEKOUT_ERROR_FORM_TYPE.accessForbidden });
                    });
                    describe('AND a menu basket cookie does not exist', () => {
                        it('should not delete the cookie', () => {
                            // Arrange
                            const cookieRemoveSpy = jest.spyOn(wrapper.vm.$cookies, 'remove');

                            // Act
                            wrapper.vm.redirectToMenu();

                            // Assert
                            expect(cookieRemoveSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('AND a menu basket cookie already exists', () => {
                        it('should delete the cookie', () => {
                            // Arrange
                            jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue(() => 'je-mw-basket');
                            const cookieRemoveSpy = jest.spyOn(wrapper.vm.$cookies, 'remove');

                            // Act
                            wrapper.vm.redirectToMenu();

                            // Assert
                            expect(cookieRemoveSpy).toHaveBeenCalledWith('je-mw-basket-MGFkMzgwZjgtYjY3Yi00Nz-v1');
                        });
                    });
                });
            });
        });
    });
});
