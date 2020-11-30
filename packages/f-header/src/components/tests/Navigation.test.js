import { shallowMount } from '@vue/test-utils';

import asyncUserDetails from './__mocks__/api.account.details.json';
import {
    defaultData,
    defaultPropsData,
    mockGet,
    setDesktopViewport,
    setMobileViewport
} from './helpers/navigation';

import Navigation from '../Navigation.vue';

let wrapper;

jest.mock('@justeat/f-services', () => ({
    axiosServices: {
        createClient: () => ({
            get: mockGet
        })
    },
    windowServices: {
        addEvent: jest.fn(),
        getWindowWidth: jest.fn()
    }
}));

describe('Navigation', () => {
    allure.feature('Navigation');
    beforeEach(setDesktopViewport);

    it('should be defined', () => {
        // Arrange & Act
        wrapper = shallowMount(Navigation, { propsData: defaultPropsData });
        wrapper.setData(defaultData);

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the delivery enquiry link in the navigation if `showDeliveryEnquiry: true` and the content is there', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, {
            propsData: {
                ...defaultPropsData,
                showDeliveryEnquiry: true
            }
        });

        // Act
        await wrapper.setData(defaultData); // need to await this for the state to fully update the DOM

        // Assert
        expect(wrapper.find('[data-test-id="delivery-enquiry"]').exists()).toBe(true);
    });

    it('should NOT show the delivery enquiry link in the navigation if `showDeliveryEnquiry: false` and the content is there', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, {
            propsData: {
                ...defaultPropsData,
                showDeliveryEnquiry: false
            }
        });

        // Act
        await wrapper.setData(defaultData);

        // Assert
        expect(wrapper.find('[data-test-id="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in and has nav link data', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

        // Act
        await wrapper.setData({
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="logout"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

        // Act
        await wrapper.setData({
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" if the user is logged in but does NOT have nav link data', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, {
            propsData: {
                ...defaultPropsData,
                navLinks: {}
            }
        });

        // Act
        await wrapper.setData(defaultData);

        // Assert
        expect(wrapper.find('[data-test-id="nav-links"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in but does NOT have nav link data', () => {
        // Arrange & Act
        wrapper = shallowMount(Navigation, {
            propsData: defaultPropsData,
            data () {
                return {
                    ...defaultData,
                    userInfo: {
                        isAuthenticated: true
                    }
                };
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="logout"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, {
            propsData: {
                ...defaultPropsData,
                navLinks: {}
            },
            data () {
                return {
                    ...defaultData
                };
            }
        });

        // Act
        await wrapper.setData({
            userInfo: false
        });

        // Assert
        expect(wrapper.find('[data-test-id="login"]').exists()).toBe(true);
    });

    it('should show the navbar if there are navigation links', () => {
        // Arrange & Act
        wrapper = shallowMount(Navigation, {
            propsData: defaultPropsData,
            computed: {
                hasNavigationLinks () {
                    return true;
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="nav-container"]').exists()).toBe(true);
    });

    it('should NOT show the navbar if there are no navigation links', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData
        };

        // Act
        wrapper = shallowMount(Navigation, {
            propsData,
            computed: {
                hasNavigationLinks () {
                    return false;
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="nav-container"]').exists()).toBe(false);
    });

    describe('nav links', () => {
        describe('on mobile', () => {
            beforeEach(setMobileViewport);

            it('should be shown when is "navIsOpen" is true', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        navLinks: {}
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    userInfo: {
                        isAuthenticated: true
                    },
                    navIsOpen: true
                });
                wrapper.vm.openNav();

                // Assert
                expect(wrapper.find('[data-test-id="nav-toggle"]').classes()).toContain('is-open');
            });

            it('should not be shown when "navIsOpen" is false', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

                await wrapper.setData({
                    ...defaultData,
                    userInfo: {
                        isAuthenticated: true
                    },
                    navIsOpen: true
                });

                // Act
                await wrapper.vm.closeNav();

                // Assert
                expect(wrapper.find('[data-test-id="nav-toggle"]').classes()).not.toContain('is-open');
            });
        });


        it('should be white when "headerBackgroundTheme" is set to "highlight"', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    headerBackgroundTheme: 'highlight'
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="nav-toggle"]').classes()).toContain('c-nav-toggle--altColour');
        });
    });


    describe('offers link', () => {
        it('prop flag should be passed through', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showOffersLink: true
                }
            });

            // Assert
            expect(wrapper.vm.showOffersLink).toBe(true);
        });

        it('should be shown on desktop when "showOffersLink" is true', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showOffersLink: true
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="offers-link"].u-showAboveMid').exists()).toBe(true);
        });

        it('should not be shown on desktop when "showOffersLink" is false', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showOffersLink: false
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="offers-link"].u-showAboveMid').exists()).toBe(false);
        });

        describe('on mobile', () => {
            beforeEach(setMobileViewport);

            it('should be shown when "showOffersLink" is true', () => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: true
                    }
                });

                // Assert
                expect(wrapper.find('[data-test-id="offers-link"].u-showBelowMid').exists()).toBe(true);
            });

            it('should not be shown when "showOffersLink" is false', () => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: false
                    }
                });

                // Assert
                expect(wrapper.find('[data-test-id="offers-link"].u-showBelowMid').exists()).toBe(false);
            });

            it('should be shown with open nav when "showOffersLink" is true', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: true
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    navIsOpen: true
                });

                // Assert
                expect(wrapper.find('[data-test-id="offers-link"].u-showBelowMid').exists()).toBe(true);
            });

            it('should not be shown with open nav when "showOffersLink" is false', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: false
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    navIsOpen: true
                });

                // Assert
                expect(wrapper.find('[data-test-id="offers-link"].u-showBelowMid').exists()).toBe(false);
            });
        });
    });


    describe('help link', () => {
        it('should be shown when "showHelpLink" is true', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showHelpLink: true
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="help-link"]').exists()).toBe(true);
        });

        it('should not be shown when "showHelpLink" is false', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showHelpLink: false
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="help-link"]').exists()).toBe(false);
        });

        it('should be shown when "showHelpLink" is not explicitly set', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showHelpLink: undefined
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="help-link"]').exists()).toBe(true);
        });
    });

    describe('isOrderCountOutOfDate', () => {
        it('should return true if the order count IS OUT of date', async () => {
            // Arrange
            const pastExpiryDate = new Date('Thu Oct 10 2019 15:37:14 GMT+0100').getTime();
            wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

            // Act
            await wrapper.setData({
                ...defaultData,
                localOrderCountExpires: pastExpiryDate
            });

            // Assert
            expect(wrapper.vm.isOrderCountOutOfDate).toBe(true);
        });

        it('should return false if the order count IS IN date', async () => {
            // Arrange
            const futureExpiryDate = new Date('Tue Aug 14 2063 16:30:34 GMT+0100').getTime();
            wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

            // Act
            await wrapper.setData({
                ...defaultData,
                localOrderCountExpires: futureExpiryDate
            });

            // Assert
            expect(wrapper.vm.isOrderCountOutOfDate).toBe(false);
        });
    });

    describe('isOrderCountValid', () => {
        it('should return true if the order count IS valid', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                isOrderCountSupported: true
            };
            wrapper = shallowMount(Navigation, { propsData });

            // Act
            wrapper.vm.setAnalyticsBlob();

            // Assert
            expect(Navigation.computed.isOrderCountValid.call(propsData)).toBe(true);
        });

        it('should return false if the order count IS NOT valid', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                isOrderCountSupported: false
            };
            wrapper = shallowMount(Navigation, { propsData });

            // Act
            wrapper.vm.setAnalyticsBlob();

            // Assert
            expect(Navigation.computed.isOrderCountValid.call(propsData)).toBe(false);
        });
    });

    describe('fetchUserInfo', () => {
        it('should return a response and populate "userInfo"', async () => {
            // Arrange
            wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

            // Clear any user data so we can test the fetchUserInfo call
            await wrapper.setData({
                ...defaultData,
                userInfo: false
            });

            // Act
            await wrapper.vm.fetchUserInfo();

            // Assert
            expect(mockGet).toHaveBeenCalled();
            expect(wrapper.vm.$data.userInfo).toBeDefined();
            expect(wrapper.vm.$data.userInfo).toEqual(asyncUserDetails);
        });

        describe('(with spy)', () => {
            let spy;

            beforeEach(() => {
                spy = jest.spyOn(Navigation.methods, 'fetchUserInfo');
            });

            afterEach(() => {
                spy.mockReset();
            });

            it('should be called if "showLoginInfo" is true and user info is truthy', async () => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showLoginInfo: true,
                        userInfoProp: false
                    }
                });

                // Assert
                expect(spy).toHaveBeenCalled();
            });

            it.each([
                [true, 'truthy', defaultData.userInfo],
                [false, 'truthy', defaultData.userInfo],
                [false, 'falsy', false]
            ])('should not be called if "showLoginInfo" is %s and user info is %s', (showLoginInfo, _, userInfoProp) => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showLoginInfo,
                        userInfoProp
                    }
                });

                // Assert
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe('fetchOrderCountAndSave', () => {
        beforeEach(() => {
            wrapper = shallowMount(Navigation, { propsData: defaultPropsData });
        });

        it('should call "setAnalyticsBlob" when data is returned', async () => {
            // Arrange
            const analyticsSpy = jest.spyOn(wrapper.vm, 'setAnalyticsBlob');

            // Act
            await wrapper.setData(defaultData);
            await wrapper.vm.fetchOrderCountAndSave();

            // Assert
            expect(mockGet).toHaveBeenCalled();
            expect(analyticsSpy).toHaveBeenCalled();
        });

        it('should set "localOrderCountExpires" when data expiry is returned', async () => {
            // Arrange
            wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();

            // Assert
            expect(wrapper.vm.$data.localOrderCountExpires).not.toEqual(false);
        });

        it('should call "enrichUserDataWithCount" when data is returned', async () => {
            // Arrange
            const userDataSpy = jest.spyOn(wrapper.vm, 'enrichUserDataWithCount');
            await wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();

            // Assert
            expect(userDataSpy).toHaveBeenCalled();
        });

        it('should call "pushToDataLayer" when data is returned', async () => {
            // Arrange
            const dataLayerSpy = jest.spyOn(wrapper.vm, 'pushToDataLayer');
            await wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();

            // Assert
            expect(dataLayerSpy).toHaveBeenCalled();
        });
    });

    describe('setAnalyticsBlob', () => {
        it('should call "setItem" when called', () => {
            // Arrange
            const spy = jest.spyOn(Storage.prototype, 'setItem');
            wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

            // Assert
            wrapper.vm.setAnalyticsBlob();

            // Act
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('getAnalyticsBlob', () => {
        it('should call "getItem" when called', () => {
            // Arrange
            const spy = jest.spyOn(Storage.prototype, 'getItem');

            // Assert
            Navigation.computed.getAnalyticsBlob.call();

            // Act
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('showLoginInfo', () => {
        it('should NOT show "login" if `showLoginInfo: false`"', async () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showLoginInfo: false
                },
                data () {
                    return defaultData;
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="login"]').exists()).toBe(false);
        });

        it('should NOT show "navLinks" if `showLoginInfo: false` and the user is logged in and has nav link data', async () => {
            // Arrange
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showLoginInfo: false
                },
                computed: {
                    hasNavigationLinks () {
                        return true;
                    }
                }
            });

            // Act
            await wrapper.setData({
                ...defaultData,
                userInfo: {
                    isAuthenticated: true
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="user-info-icon"]').classes()).toContain('is-hidden');
        });
    });

    describe('hasNavigationLinks', () => {
        it.each([
            'showOffersLink',
            'showHelpLink',
            'showDeliveryEnquiry',
            'showLoginLink'
        ])('should return true if `%s` is true', navLink => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    [navLink]: true
                }
            });

            // Assert
            expect(wrapper.vm.hasNavigationLinks).toBe(true);
        });

        it('should return false if there are no underlying links to show', () => {
            // Arrange & Act
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showLoginInfo: false,
                    showOffersLink: false,
                    showHelpLink: false,
                    showDeliveryEnquiry: false
                }
            });

            // Assert
            expect(wrapper.vm.hasNavigationLinks).toBe(false);
        });
    });
});
