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

let windowLocationSpy;

beforeEach(() => {
    windowLocationSpy = jest.spyOn(window.location, 'assign').mockImplementation();
});

describe('ErrorDialog', () => {
    const propsData = {};
    const restaurant = {
        seoName: 'checkout-kofte-farringdon',
        id: '22222'
    };
    const message = {
        shouldRedirectToMenu: true,
        shouldShowInDialog: true,
        code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
    };

    it('should be defined', () => {
        // Arrange
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
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.errorCode).toEqual(message.code);
            });

            it('should return `null` if  no `message` is provided', () => {
                // Arrange
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
                // Arrange
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

            afterEach(() => {
                jest.clearAllMocks();
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
                        message
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
                message.shouldRedirectToMenu = false;

                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({
                        ...defaultCheckoutState,
                        restaurant,
                        message
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
    });
});
