import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import loggedInUserMock from './__mocks__/api.account.details.json';
import Navigation from '../Navigation.vue';

const defaultPropsData = {
    accountLogin: {},
    accountLogout: {},
    navLinks: {
        orderHistory: {
            text: 'Your orders',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        savedCards: {
            text: 'Your saved cards',
            url: '/account/saved-cards',
            gtm: 'click_account_saved_cards'
        }
    },
    openMenuText: 'Open menu',
    deliveryEnquiry: {},
    showDeliveryEnquiry: false,
    isOrderCountSupported: true,
    offersCopy: {},
    showOffersLink: false,
    headerBackgroundTheme: 'white'
};

const defaultData = {
    userInfo: {
        isAuthenticated: false,
        friendlyName: 'James Fisher',
        email: 'j.fisher@fakemail.com'
    },
    navIsOpen: false,
    localOrderCountExpires: false
};
const asyncUserDetails = loggedInUserMock;


const desktopWidth = 1200;
const desktopHeight = 1024;
const mobileWidth = 375;
const mobileHeight = 667;

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

describe('Navigation', () => {
    beforeEach(() => {
        resizeWindow(desktopWidth, desktopHeight);
    });

    it('should be defined', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(defaultData);
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the delivery enquiry link in the navigation if `showDeliveryEnquiry: true` and the content is there', async () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: true
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        await wrapper.setData(defaultData); // need to await this for the state to fully update the DOM

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(true);
    });

    it('should NOT show the delivery enquiry link in the navigation if `showDeliveryEnquiry: false` and the content is there', async () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: false
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        await wrapper.setData(defaultData);

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in and has nav link data', async () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        await wrapper.setData({
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        });

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', async () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        await wrapper.setData({
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        });

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" if the user is logged in but does NOT have nav link data', async () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        await wrapper.setData(defaultData);

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, {
            propsData,
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
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', async () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };

        // Act
        const wrapper = shallowMount(Navigation, {
            propsData,
            data () {
                return {
                    ...defaultData
                };
            }
        });

        // reset the user data to empty
        await wrapper.setData({
            userInfo: false
        });

        // Assert
        expect(wrapper.find('[data-js-test="login"]').exists()).toBe(true);
    });


    describe('nav links', () => {
        it('should be shown on mobile when is "navIsOpen" is true', async () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                navLinks: {}
            };

            // Act
            resizeWindow(mobileWidth, mobileHeight);
            const wrapper = shallowMount(Navigation, { propsData });
            await wrapper.setData({
                ...defaultData,
                userInfo: {
                    isAuthenticated: true
                },
                navIsOpen: true
            });
            wrapper.vm.openNav();

            // Assert
            expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).toContain('is-open');
        });

        it('should not be shown on mobile when "navIsOpen" is false', async () => {
            // Arrange
            const propsData = defaultPropsData;

            // Act
            resizeWindow(mobileWidth, mobileHeight);
            const wrapper = shallowMount(Navigation, { propsData });
            await wrapper.setData({
                ...defaultData,
                userInfo: {
                    isAuthenticated: true
                },
                navIsOpen: true
            });
            await wrapper.vm.closeNav();

            // Assert
            expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).not.toContain('is-open');
        });

        it('should be white when "headerBackgroundTheme" is set to "highlight"', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                headerBackgroundTheme: 'highlight'
            };

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).toContain('c-nav-toggle--altColour');
        });
    });


    describe('offers link', () => {
        it('prop flag should be passed through', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: true
            };

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.vm.showOffersLink).toBe(true);
        });

        it('should be shown on desktop when "showOffersLink" is true', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: true
            };

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-desktop"]').exists()).toBe(true);
        });

        it('should not be shown on desktop when "showOffersLink" is false', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: false
            };

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-desktop"]').exists()).toBe(false);
        });

        it('should be shown on mobile when "showOffersLink" is true', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: true
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(true);
        });

        it('should not be shown on mobile when "showOffersLink" is false', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: false
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(false);
        });

        it('should be shown on mobile with open nav when "showOffersLink" is true', async () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: true
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });
            await wrapper.setData({
                ...defaultData,
                navIsOpen: true
            });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(true);
        });

        it('should not be shown on mobile with open nav when "showOffersLink" is false', async () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: false
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });
            await wrapper.setData({
                ...defaultData,
                navIsOpen: true
            });

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(false);
        });
    });

    describe('isOrderCountOutOfDate', () => {
        it('should return true if the order count IS OUT of date', async () => {
            // Arrange
            const propsData = defaultPropsData;
            const wrapper = shallowMount(Navigation, { propsData });
            const pastExpiryDate = new Date('Thu Oct 10 2019 15:37:14 GMT+0100').getTime();

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
            const propsData = defaultPropsData;
            const wrapper = shallowMount(Navigation, { propsData });
            const futureExpiryDate = new Date('Tue Aug 14 2035 16:30:34 GMT+0100').getTime();

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
            const wrapper = shallowMount(Navigation, { propsData });

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
            const wrapper = shallowMount(Navigation, { propsData });

            // Act
            wrapper.vm.setAnalyticsBlob();

            // Assert
            expect(Navigation.computed.isOrderCountValid.call(propsData)).toBe(false);
        });
    });

    describe('fetchUserInfo', () => {
        it('should return a response and populate "userInfo"', async () => {
            // Arrange
            const propsData = {
                ...defaultPropsData
            };
            const wrapper = shallowMount(Navigation, { propsData });

            // Assert
            // Clear any user data so we can test the fetchUserInfo call
            await wrapper.setData({
                ...defaultData,
                userInfo: false
            });

            // Act
            await wrapper.vm.fetchUserInfo();

            expect(axios.get).toHaveBeenCalled();
            expect(wrapper.vm.$data.userInfo).toBeDefined();
            expect(wrapper.vm.$data.userInfo).toEqual(asyncUserDetails);
        });
    });

    describe('fetchOrderCountAndSave', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });

        it('should call "setAnalyticsBlob" when data is returned', async () => {
            // Arrange
            const analyticsSpy = jest.spyOn(wrapper.vm, 'setAnalyticsBlob');

            // Assert
            await wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();
            expect(axios.get).toHaveBeenCalled();
            expect(analyticsSpy).toHaveBeenCalled();
        });

        it('should set "localOrderCountExpires" when data expiry is returned', async () => {
            // Assert
            wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();
            expect(wrapper.vm.$data.localOrderCountExpires).not.toEqual(false);
        });

        it('should call "enrichUserDataWithCount" when data is returned', async () => {
            // Arrange
            const userDataSpy = jest.spyOn(wrapper.vm, 'enrichUserDataWithCount');

            // Assert
            await wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();
            expect(userDataSpy).toHaveBeenCalled();
        });

        it('should call "pushToDataLayer" when data is returned', async () => {
            // Arrange
            const dataLayerSpy = jest.spyOn(wrapper.vm, 'pushToDataLayer');

            // Assert
            await wrapper.setData(defaultData);

            // Act
            await wrapper.vm.fetchOrderCountAndSave();
            expect(dataLayerSpy).toHaveBeenCalled();
        });
    });

    describe('setAnalyticsBlob', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });

        it('should call "setItem" when called', () => {
            // Arrange
            const spy = jest.spyOn(Storage.prototype, 'setItem');

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
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showLoginInfo: false
            };

            // Act
            const wrapper = shallowMount(Navigation, {
                propsData,
                data () {
                    return defaultData;
                }
            });

            // Assert
            expect(wrapper.find('[data-js-test="login"]').exists()).toBe(false);
        });

        it('should NOT show "navLinks" if `showLoginInfo: false` and the user is logged in and has nav link data', async () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showLoginInfo: false
            };

            // Act
            const wrapper = shallowMount(Navigation, { propsData });
            await wrapper.setData({
                ...defaultData,
                userInfo: {
                    isAuthenticated: true
                }
            });

            // Assert
            expect(wrapper.find('[data-js-test="user-info-icon"]').classes()).toContain('is-hidden');
        });
    });
});
