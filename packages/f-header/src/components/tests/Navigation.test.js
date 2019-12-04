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
    isOrderCountSupported: true,
    offersCopy: {},
    showOffersLink: false
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

    describe('nav links', () => {
        it('should be shown on mobile when is "navIsOpen" is true', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                navLinks: {}
            };

            // Act
            resizeWindow(mobileWidth, mobileHeight);
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

        it('should not be shown on mobile when "navIsOpen" is false', () => {
            // Arrange
            const propsData = defaultPropsData;

            // Act
            resizeWindow(mobileWidth, mobileHeight);
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

        it('should be shown on mobile with open nav when "showOffersLink" is true', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: true
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });
            wrapper.vm.data = {
                ...defaultData,
                navIsOpen: true
            };

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(true);
        });

        it('should not be shown on mobile with open nav when "showOffersLink" is false', () => {
            // Arrange
            const propsData = {
                ...defaultPropsData,
                showOffersLink: false
            };
            resizeWindow(mobileWidth, mobileHeight);

            // Act
            const wrapper = shallowMount(Navigation, { propsData });
            wrapper.vm.data = {
                ...defaultData,
                navIsOpen: true
            };

            // Assert
            expect(wrapper.find('[data-js-test="offers-link-mobile"]').exists()).toBe(false);
        });
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
