import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorDialog from '../ErrorDialog.vue';
import {
    i18n, defaultCheckoutState, createStore
} from './helpers/setup';
import { ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const propsData = {};
const restaurant = {
    seoName: 'checkout-kofte-farringdon',
    id: '22222'
};
const defaultMessage = {
    shouldRedirectToMenu: true,
    shouldShowInDialog: true,
    code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
};
const duplicateOrderMessage = {
    code: 'DuplicateOrder'
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('ErrorDialog', () => {
    let windowLocationSpy;

    beforeEach(() => {
        windowLocationSpy = jest.spyOn(window.location, 'assign').mockImplementation();
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
                        message: defaultMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.errorCode).toEqual(defaultMessage.code);
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
                expect(wrapper.vm.errorCode).toEqual(null);
            });
        });

        describe('restaurantMenuPageUrl ::', () => {
            it('should return the URL to redirect back to the restaurant menu', () => {
                // Arrange && Act
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.restaurantMenuPageUrl).toEqual(`restaurant-${restaurant.seoName}/menu`);
            });
        });
    });

    describe('methods ::', () => {
        describe('closeErrorDialog ::', () => {
            let updateMessageSpy;

            beforeEach(() => {
                updateMessageSpy = jest.spyOn(ErrorDialog.methods, 'updateMessage');
            });

            it('should call `updateMessage`', () => {
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
                expect(updateMessageSpy).toHaveBeenCalled();
            });

            it('should redirect to the restaurant menu if `shouldRedirectToMenu` is true', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        message: defaultMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.closeErrorDialog();

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith(`restaurant-${restaurant.seoName}/menu`);
            });

            it('should not redirect to the restaurant menu if `shouldRedirectToMenu` is false', () => {
                // Arrange
                defaultMessage.shouldRedirectToMenu = false;

                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        message: defaultMessage
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
        });

        describe('showOrderHistory ::', () => {
            let updateMessageSpy;

            beforeEach(() => {
                updateMessageSpy = jest.spyOn(ErrorDialog.methods, 'updateMessage');
            });

            it('should call `updateMessage`', () => {
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
                expect(updateMessageSpy).toHaveBeenCalled();
            });

            it('should redirect to the order history', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        message: duplicateOrderMessage
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

        describe('isDuplicateOrderError ::', () => {
            it('should return `True` when `ErrorCode` refers to a duplicate order', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: duplicateOrderMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const actual = wrapper.vm.isDuplicateOrderError();

                // Assert
                expect(actual).toBeTruthy();
            });

            it('should return `False` when `ErrorCode` does not refer to a duplicate order', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: defaultMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const actual = wrapper.vm.isDuplicateOrderError();

                // Assert
                expect(actual).toBeFalsy();
            });
        });

        describe('dataLayerPushDupOrderWarnTrackingEvent ::', () => {
            it('should push to the dataLayer', () => {
                // Arrange
                const expected = {
                    event: 'trackEvent',
                    eventCategory: 'engagement',
                    eventAction: 'dialog_duplicate_order_warning',
                    eventLabel: 'view_dialog'
                };

                Object.defineProperty(global, 'window', {
                    value: {
                        dataLayer: []
                    }
                });
                window.dataLayer = [];

                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: duplicateOrderMessage
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.dataLayerPushDupOrderWarnTrackingEvent();

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });
        });
    });
});

describe('ErrorDialog :: mounted ::', () => {
    let dataLayerPushDupOrderWarnTrackingEventSpy;

    beforeEach(() => {
        dataLayerPushDupOrderWarnTrackingEventSpy = jest.spyOn(ErrorDialog.methods, 'dataLayerPushDupOrderWarnTrackingEvent');
    });

    it('should make a call to `dataLayerPushDupOrderWarnTrackingEvent` when `ErrorCode` refers to a duplicate order ', () => {
        // Arrange & Act
        shallowMount(ErrorDialog, {
            store: createStore({
                ...defaultCheckoutState,
                message: duplicateOrderMessage
            }),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(dataLayerPushDupOrderWarnTrackingEventSpy).toHaveBeenCalled();
    });

    it('should not make a call to `dataLayerPushDupOrderWarnTrackingEvent` when `ErrorCode` does not refer to a duplicate order ', () => {
        // Arrange & Act
        shallowMount(ErrorDialog, {
            store: createStore({
                ...defaultCheckoutState,
                message: defaultMessage
            }),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(dataLayerPushDupOrderWarnTrackingEventSpy).not.toHaveBeenCalled();
    });
});
