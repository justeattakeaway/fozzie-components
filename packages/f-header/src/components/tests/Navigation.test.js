import { shallowMount } from '@vue/test-utils';
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
            url: '/member/savedcards',
            gtm: 'click_account_saved_cards'
        }
    },
    openMenuText: 'Open menu',
    deliveryEnquiry: {},
    showDeliveryEnquiry: false,
    isOrderCountSupported: true
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
const width = 767;
const height = 768;

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

describe('Navigation', () => {
    it('should be defined', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = defaultData;
        expect(wrapper.exists()).toBe(true);
    });

    it('should show "Deliver for Just Eat" in nav if prop true and the content is there', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: true
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = defaultData;

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(true);
    });

    it('should NOT show "Deliver for Just Eat" in nav if prop false and the content is there', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: false
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = defaultData;

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        };

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        };

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = defaultData;

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            }
        };

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: false
        };

        // Assert
        expect(wrapper.find('[data-js-test="login"]').exists()).toBe(true);
    });

    it('should show nav links on mobile when is "navIsOpen" is true', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            },
            navIsOpen: true
        };
        wrapper.vm.openNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).toContain('is-open');
    });

    it('should NOT show nav links on mobile when "navIsOpen" is false', () => {
        // Arrange
        const propsData = defaultPropsData;

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.vm.data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            },
            navIsOpen: true
        };
        wrapper.vm.closeNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).not.toContain('is-open');
    });

    describe('isOrderCountOutOfDate', () => {
        it('should return true if the order count IS OUT of date', () => {
            // Arrange
            const propsData = defaultPropsData;
            const wrapper = shallowMount(Navigation, { propsData });

            // Act
            wrapper.vm.data = {
                ...defaultData,
                localOrderCountExpires: 1570718234911,
                currentTime: 1570780396163
            };

            // Assert
            expect(Navigation.computed.isOrderCountOutOfDate.call(wrapper.vm.data)).toBe(true);
        });

        it('should return false if the order count IS IN date', () => {
            // Arrange
            const propsData = defaultPropsData;
            const wrapper = shallowMount(Navigation, { propsData });

            // Act
            wrapper.vm.data = {
                ...defaultData,
                localOrderCountExpires: 2070718234911,
                currentTime: 1570780396163
            };

            // Assert
            expect(Navigation.computed.isOrderCountOutOfDate.call(wrapper.vm.data)).toBe(false);
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
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });
        it('should return a response and populate "userInfo"', async () => {
            // Arrange
            const userInfoUrl = 'https://www.just-eat.co.uk/api/account/details';

            // Assert
            wrapper.vm.data = {
                ...defaultData,
                userInfo: false
            };

            // Act
            wrapper.vm.fetchUserInfo(userInfoUrl, { headers: { credentials: 'same-origin' } }).then(response => {
                expect(response).toBeTruthy();
                expect(wrapper.vm.data.userInfo).not.toEqual(false);
            }).catch(err => {
                console.log(err);
            });
        });
    });

    describe('fetchOrderCountAndSave', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });
        const orderCountUrl = 'https://www.just-eat.es/analytics/ordercount';
        it('should call "setAnalyticsBlob" when data is returned', async () => {
            // Arrange
            const spy = jest.spyOn(wrapper.vm, 'setAnalyticsBlob');

            // Assert
            wrapper.vm.data = defaultData;

            // Act
            wrapper.vm.fetchOrderCountAndSave(orderCountUrl, { headers: { credentials: 'same-origin' } }).then(response => {
                expect(response).toBeTruthy();
                expect(spy).toHaveBeenCalled();
            }).catch(err => {
                console.log(err);
            });
        });

        it('should set "localOrderCountExpires" when data expiry is returned', async () => {
            // Assert
            wrapper.vm.data = defaultData;

            // Act
            wrapper.vm.fetchOrderCountAndSave(orderCountUrl, { headers: { credentials: 'same-origin' } }).then(response => {
                expect(response).toBeTruthy();
                expect(wrapper.vm.data.localOrderCountExpires).not.toEqual(false);
            }).catch(err => {
                console.log(err);
            });
        });

        it('should call "enrichUserDataWithCount" when data is returned', async () => {
            // Arrange
            const spy = jest.spyOn(wrapper.vm, 'enrichUserDataWithCount');

            // Assert
            wrapper.vm.data = defaultData;

            // Act
            wrapper.vm.fetchOrderCountAndSave(orderCountUrl, { headers: { credentials: 'same-origin' } }).then(response => {
                expect(response).toBeTruthy();
                expect(spy).toHaveBeenCalled();
            }).catch(err => {
                console.log(err);
            });
        });

        it('should call "pushToDataLayer" when data is returned', async () => {
            // Arrange
            const spy = jest.spyOn(wrapper.vm, 'pushToDataLayer');

            // Assert
            wrapper.vm.data = defaultData;

            // Act
            wrapper.vm.fetchOrderCountAndSave(orderCountUrl, { headers: { credentials: 'same-origin' } }).then(response => {
                expect(response).toBeTruthy();
                expect(spy).toHaveBeenCalled();
            }).catch(err => {
                console.log(err);
            });
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
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });

        it('should call "getItem" when called', () => {
            // Arrange
            const spy = jest.spyOn(Storage.prototype, 'getItem');

            // Assert
            Navigation.computed.getAnalyticsBlob.call();

            // Act
            expect(spy).toHaveBeenCalled();
        });

        it('should return truthy when called', () => {
            // Assert
            Navigation.computed.getAnalyticsBlob.call();

            // Act
            expect(wrapper.vm.getAnalyticsBlob).toBeTruthy();
        });
    });
});
