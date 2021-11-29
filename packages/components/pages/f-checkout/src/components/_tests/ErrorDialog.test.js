import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorDialog from '../ErrorDialog.vue';
import {
    i18n, defaultCheckoutState, createStore
} from './helpers/setup';
import { ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE, ERROR_TYPES } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

jest.mock('../../services/analytics');

const checkoutDialogMessage = {
    code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
    errorType: ERROR_TYPES.dialog
};

describe('ErrorDialog', () => {
    const restaurant = {
        seoName: 'checkout-kofte-farringdon',
        id: '22222'
    };

    const propsData = {
        redirectUrl: `restaurants-${restaurant.seoName}/menu`
    };

    const defaultMessage = {
        shouldRedirectToMenu: true,
        shouldShowInDialog: true,
        code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
    };

    const duplicateOrderCode = 'DuplicateOrder';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange && Act
        const wrapper = shallowMount(ErrorDialog, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper).toBeDefined();
    });

    describe('computed ::', () => {
        describe('errorCode ::', () => {
            it('should return `code` of `message` when `message` is provided', () => {
                // Arrange && Act
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        checkoutErrorMessage: checkoutDialogMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.errorCode).toEqual(checkoutDialogMessage.code);
            });

            it('should return `null` if  no `message` is provided', () => {
                // Arrange && Act
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.errorCode).toBeUndefined();
            });
        });

        describe('isDuplicateOrderError ::', () => {
            it('should return `True` when `ErrorCode` refers to a duplicate order', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        checkoutErrorMessage: {
                            ...checkoutDialogMessage,
                            code: duplicateOrderCode
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const actual = wrapper.vm.isDuplicateOrderError;

                // Assert
                expect(actual).toBeTruthy();
            });

            it('should return `False` when `ErrorCode` does not refer to a duplicate order', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        checkoutErrorMessage: checkoutDialogMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const actual = wrapper.vm.isDuplicateOrderError;

                // Assert
                expect(actual).toBeFalsy();
            });
        });
    });

    describe('methods ::', () => {
        describe('closeErrorDialog ::', () => {
            let updateCheckoutErrorMessageSpy;
            let windowLocationSpy;

            beforeEach(() => {
                updateCheckoutErrorMessageSpy = jest.spyOn(ErrorDialog.methods, 'updateCheckoutErrorMessage');
                windowLocationSpy = jest.spyOn(window.location, 'assign').mockImplementation();
            });
            it('should call `updateCheckoutErrorMessage`', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.closeErrorDialog();

                // Assert
                expect(updateCheckoutErrorMessageSpy).toHaveBeenCalled();
            });

            it('should redirect to the restaurant menu if `shouldRedirectToMenu` is true', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        checkoutErrorMessage: {
                            checkoutDialogMessage,
                            shouldRedirectToMenu: true
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.closeErrorDialog();

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith(wrapper.vm.redirectUrl);
            });

            it('should not redirect to the restaurant menu if `shouldRedirectToMenu` is false', () => {
                // Arrange
                defaultMessage.shouldRedirectToMenu = false;

                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        checkoutErrorMessage: checkoutDialogMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.closeErrorDialog();

                // Assert
                expect(windowLocationSpy).not.toHaveBeenCalled();
            });

            describe('when `modalContext` exists', () => {
                it('should invoke `close` so the error modal can be closed', () => {
                    // Arrange
                    const wrapper = shallowMount(ErrorDialog, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    const closeModalMethod = jest.fn();

                    const spy = jest.spyOn(wrapper.vm, 'getModalContext').mockImplementation(() => ({
                        close: closeModalMethod
                    }));

                    // Act
                    wrapper.vm.closeErrorDialog();

                    // Assert
                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('when `modalContext` does not exist', () => {
                it('should not invoke `close`', () => {
                    // Arrange
                    const wrapper = shallowMount(ErrorDialog, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    const closeModalMethod = jest.fn();

                    jest.spyOn(wrapper.vm, 'getModalContext').mockImplementation(() => undefined);

                    // Act
                    wrapper.vm.closeErrorDialog();

                    // Assert
                    expect(closeModalMethod).not.toHaveBeenCalled();
                });
            });
        });

        describe('`getModalContext ::`', () => {
            it('should exist', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.getModalContext).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return `null` when `megaModal` does not exist', () => {
                    // Arrange
                    const wrapper = shallowMount(ErrorDialog, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act & Assert
                    expect(wrapper.vm.getModalContext()).toBe(null);
                });

                it('should return `errorModal` when `megaModal` does exist', () => {
                    // Arrange
                    const wrapper = shallowMount(ErrorDialog, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    wrapper.vm.$refs = {
                        errorModal: {
                            $refs: {
                                megaModal: '<div>'
                            }
                        }
                    };

                    // Act
                    const result = wrapper.vm.getModalContext();

                    // Assert
                    expect(result).toBe(wrapper.vm.$refs.errorModal);
                });
            });
        });

        describe('showOrderHistory ::', () => {
            let updateCheckoutErrorMessageSpy;
            let windowLocationSpy;

            beforeEach(() => {
                updateCheckoutErrorMessageSpy = jest.spyOn(ErrorDialog.methods, 'updateCheckoutErrorMessage');
                windowLocationSpy = jest.spyOn(window.location, 'assign').mockImplementation();
            });

            it('should call `updateCheckoutErrorMessage`', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.closeErrorDialog();

                // Assert
                expect(updateCheckoutErrorMessageSpy).toHaveBeenCalled();
            });

            it('should redirect to the order history', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        checkoutErrorMessage: {
                            ...checkoutDialogMessage,
                            code: duplicateOrderCode
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.showOrderHistory();

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith('order-history');
            });
        });
    });

    describe('mounted ::', () => {
        it('should make a call to `getModalContext`', () => {
            // Arrange
            const getModalContextSpy = jest.spyOn(ErrorDialog.methods, 'getModalContext');

            shallowMount(ErrorDialog, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(getModalContextSpy).toHaveBeenCalled();
        });

        describe('when `modalContext` does exist', () => {
            it('should open the modal via `modalContext.open`', () => {
                // Arrange
                const openModalMethod = jest.fn();

                jest.spyOn(ErrorDialog.methods, 'getModalContext').mockImplementation(() => ({
                    open: openModalMethod
                }));

                shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(openModalMethod).toHaveBeenCalled();
            });
        });

        describe('when `modalContext` does not exist', () => {
            it('should not call the `open` method on `modalContext.open`', () => {
                // Arrange
                const openModalMethod = jest.fn();

                jest.spyOn(ErrorDialog.methods, 'getModalContext').mockImplementation(() => undefined);

                shallowMount(ErrorDialog, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(openModalMethod).not.toHaveBeenCalled();
            });
        });

        it('should make a emit to `created` event with a error message', () => {
            // Act
            const wrapper = shallowMount(ErrorDialog, {
                store: createStore({
                    ...defaultCheckoutState,
                    checkoutErrorMessage: {
                        ...checkoutDialogMessage,
                        code: duplicateOrderCode
                    }
                }),
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(wrapper.emitted('created').length).toBe(1);
            expect(wrapper.emitted('created')[0][0]).toEqual({
                code: duplicateOrderCode,
                isDuplicateOrderError: true
            });
        });
    });
});
