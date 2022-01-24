import { shallowMount, mount } from '@vue/test-utils';
import asyncUserDetails from './__mocks__/api.account.details.json';
import {
    defaultData,
    defaultPropsData,
    mockGet,
    desktopWidth,
    mobileWidth
} from './helpers/navigation';

import CountrySelector from '../CountrySelector.vue';
import Navigation from '../Navigation.vue';

const $style = {
    'is-open': 'is-open',
    'c-nav-toggle--altColour': 'c-nav-toggle--altColour',
    'is-hidden': 'is-hidden'
};

let wrapper;

let mockWidth = desktopWidth;

function setMobileViewport () { mockWidth = mobileWidth; }
function setDesktopViewport () { mockWidth = desktopWidth; }

jest.mock('@justeat/f-services', () => ({
    axiosServices: {
        createClient: () => ({
            get: mockGet
        })
    },
    windowServices: {
        addEvent: jest.fn(),
        getWindowWidth: jest.fn(() => mockWidth)
    }
}));

describe('Navigation', () => {
    it('should be defined', () => {
        // Arrange & Act
        wrapper = shallowMount(Navigation, { propsData: defaultPropsData });
        wrapper.setData(defaultData);

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        describe('isBelowMid ::', () => {
            afterEach(setDesktopViewport);

            it.each([
                [false, 'desktop', setDesktopViewport],
                [true, 'mobile', setMobileViewport]
            ])('should be %s for %s viewport', (expected, _, setViewportFn) => {
                // Arrange & Act
                setViewportFn();

                wrapper = shallowMount(Navigation, { propsData: defaultPropsData });
                wrapper.setData(defaultData);

                // Assert
                expect(wrapper.vm.isBelowMid).toBe(expected);
            });
        });

        describe('tabIndex', () => {
            afterEach(setDesktopViewport);

            it.each([
                [0, false, false],
                [0, false, true],
                [0, true, false],
                [-1, true, true]
            ])('should be %s when `isBelowMid` is %s and `countrySelectorIsOpen` is %s', async (
                tabIndex, isBelowMid, countrySelectorIsOpen
            ) => {
                if (isBelowMid) {
                    setMobileViewport();
                } else {
                    setDesktopViewport();
                }

                wrapper = shallowMount(Navigation, {
                    propsData: defaultPropsData
                });

                // Act
                wrapper.setData({ countrySelectorIsOpen });
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.tabIndex).toBe(tabIndex);
            });
        });

        describe('isOrderCountOutOfDate', () => {
            it.each([
                [true, 'past', 'Thu Oct 10 2019 15:37:14 GMT+0100'],
                [false, 'future', 'Tue Aug 14 2063 16:30:34 GMT+0100']
            ])('should return %s if order count expiry date is in the %s', async (expected, _, expiryDate) => {
                // Arrange
                wrapper = shallowMount(Navigation, { propsData: defaultPropsData });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    localOrderCountExpires: new Date(expiryDate).getTime()
                });

                // Assert
                expect(wrapper.vm.isOrderCountOutOfDate).toBe(expected);
            });
        });

        describe('isOrderCountValid', () => {
            it.each([
                [true, true],
                [false, false]
            ])('should return %s if isOrderCountSupported is %s', (expected, isOrderCountSupported) => {
                // Arrange
                const propsData = {
                    ...defaultPropsData,
                    isOrderCountSupported
                };
                wrapper = shallowMount(Navigation, { propsData });

                // Act
                wrapper.vm.setAnalyticsBlob();

                // Assert
                expect(Navigation.computed.isOrderCountValid.call(propsData)).toBe(expected);
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
                        copy: {
                            ...defaultPropsData.copy,
                            [navLink]: true
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.hasNavigationLinks).toBe(true);
            });

            it('should return true if customNavLinks are provided', () => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showLoginInfo: false,
                        customNavLinks: [
                            {
                                text: 'Test',
                                url: '/test',
                                gtm: {
                                    label: 'test-label'
                                }
                            }
                        ]
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
                        showDeliveryEnquiry: false,
                        customNavLinks: []
                    }
                });

                // Assert
                expect(wrapper.vm.hasNavigationLinks).toBe(false);
            });
        });
    });

    it('should show "logout" if the user is logged in and has nav link data', async () => {
        // Arrange
        wrapper = mount(Navigation, { propsData: defaultPropsData });

        // Act
        await wrapper.setData({
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="logout-link"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', async () => {
        // Arrange
        wrapper = mount(Navigation, { propsData: defaultPropsData });

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
                copy: {
                    ...defaultPropsData.copy,
                    navLinks: {}
                }
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
        expect(wrapper.find('[data-test-id="logout-link"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', async () => {
        // Arrange
        wrapper = shallowMount(Navigation, {
            propsData: {
                ...defaultPropsData,
                copy: {
                    ...defaultPropsData.copy,
                    navLinks: {}
                }
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
        expect(wrapper.find('[data-test-id="login-link"]').exists()).toBe(true);
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
        // Arrange and Act
        wrapper = shallowMount(Navigation, {
            propsData: defaultPropsData,
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
                        copy: {
                            ...defaultPropsData.copy,
                            navLinks: {}
                        }
                    },
                    mocks: {
                        $style
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

                // Assert
                expect(wrapper.find('[data-test-id="nav-toggle"]').classes()).toContain('is-open');
            });

            it('should not be shown when "navIsOpen" is false', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: defaultPropsData,
                    mocks: {
                        $style
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    userInfo: {
                        isAuthenticated: true
                    },
                    navIsOpen: false
                });

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
                },
                mocks: {
                    $style
                }
            });

            // Assert
            expect(wrapper.find('[data-test-id="nav-toggle"]').classes()).toContain('c-nav-toggle--altColour');
        });
    });

    describe('offers link', () => {
        it('should be shown on desktop when "showOffersLink" is true', async () => {
            // Arrange
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showOffersLink: true
                }
            });

            // Act
            await wrapper.setData(defaultData); // need to await this for the state to fully update the DOM

            // Assert
            expect(wrapper.find('[data-test-id="offers-link"]').exists()).toBe(true);
        });

        it('should not be shown on desktop when "showOffersLink" is false', async () => {
            // Arrange
            wrapper = shallowMount(Navigation, {
                propsData: {
                    ...defaultPropsData,
                    showOffersLink: false
                }
            });

            // Act
            await wrapper.setData(defaultData);

            // Assert
            expect(wrapper.find('[data-test-id="offers-link"]').exists()).toBe(false);
        });

        describe('on mobile', () => {
            beforeEach(setMobileViewport);

            it('should be shown when "showOffersLink" is true', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: true
                    }
                });

                // Act
                await wrapper.setData(defaultData);

                // Assert
                expect(wrapper.find('[data-test-id="offers-iconLink"]').exists()).toBe(true);
            });

            it('should not be shown when "showOffersLink" is false', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showOffersLink: false
                    }
                });

                // Act
                await wrapper.setData(defaultData);

                // Assert
                expect(wrapper.find('[data-test-id="offers-link"]').exists()).toBe(false);
                expect(wrapper.find('[data-test-id="offers-iconLink"]').exists()).toBe(false);
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
                expect(wrapper.find('[data-test-id="offers-link"]').exists()).toBe(true);
                expect(wrapper.find('[data-test-id="offers-iconLink"]').exists()).toBe(false);
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
                expect(wrapper.find('[data-test-id="offers-link"]').exists()).toBe(false);
                expect(wrapper.find('[data-test-id="offers-iconLink"]').exists()).toBe(false);
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

        describe('on mobile', () => {
            beforeEach(setMobileViewport);

            it('should have tabindex attribute of 0 when country selector panel is closed on mobile', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showHelpLink: true
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    navIsOpen: true,
                    countrySelectorIsOpen: false
                });

                // Assert
                expect(wrapper.find('[data-test-id="help-link"]').attributes('tabindex')).toBe('0');
            });

            it('should have tabindex attribute of -1 when country selector panel is open on mobile', async () => {
                // Arrange
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showHelpLink: true
                    }
                });

                // Act
                await wrapper.setData({
                    ...defaultData,
                    navIsOpen: true,
                    countrySelectorIsOpen: true
                });

                // Assert
                expect(wrapper.find('[data-test-id="help-link"]').attributes('tabindex')).toBe('-1');
            });
        });
    });

    describe('methods ::', () => {
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
    });

    describe('props ::', () => {
        describe('showLoginInfo', () => {
            it('should NOT show "login" if `showLoginInfo: false`', async () => {
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
                expect(wrapper.find('[data-test-id="login-link"]').exists()).toBe(false);
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
                    },
                    mocks: {
                        $style
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

        describe('showDeliveryEnquiry', () => {
            it.each([
                ['show', true],
                ['NOT show', false]
            ])('should %s the delivery enquiry link when %s', (_, showDeliveryEnquiry) => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showDeliveryEnquiry
                    }
                });

                // Assert
                expect(wrapper.find('[data-test-id="delivery-enquiry-link"]').exists()).toBe(showDeliveryEnquiry);
            });
        });

        describe('showCountrySelector', () => {
            it.each([
                ['show', true],
                ['NOT show', false]
            ])('should %s the country selector when %s', (_, showCountrySelector) => {
                // Arrange & Act
                wrapper = shallowMount(Navigation, {
                    propsData: {
                        ...defaultPropsData,
                        showCountrySelector
                    }
                });

                // Assert
                expect(wrapper.findComponent(CountrySelector).exists()).toBe(showCountrySelector);
            });
        });
    });
});
