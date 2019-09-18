import { shallowMount } from '@vue/test-utils';
import Navigation from '../Navigation.vue';

const defaultPropsData = {
    userInfo: {},
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
    showDeliveryEnquiry: false
};

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

describe('Navigation', () => {
    it('should be defined', () => {
        const propsData = defaultPropsData;
        const wrapper = shallowMount(Navigation, { propsData });
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

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = {
            navLinks: {},
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = {
            navLinks: {},
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', () => {
        // Arrange
        const propsData = {
            navLinks: {},
            userInfo: {
                isAuthenticated: false
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="login"]').exists()).toBe(true);
    });

    it('should show nav links on mobile when is "navIsOpen" is true', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            userInfo: {
                isAuthenticated: true
            }
        };

        const navData = {
            navIsOpen: true
        };

        const width = 767;
        const height = 768;

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { navData, propsData });
        wrapper.vm.openNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).toContain('is-open');
    });

    it('should NOT show nav links on mobile when "navIsOpen" is false', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            userInfo: {
                isAuthenticated: true
            }
        };

        const navData = {
            navIsOpen: false
        };
        const width = 767;
        const height = 768;

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { navData, propsData });
        wrapper.vm.closeNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).not.toContain('is-open');
    });
});
