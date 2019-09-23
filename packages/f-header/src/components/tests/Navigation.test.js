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
    showDeliveryEnquiry: false
};
const defaultData = {
    userInfo: {
        isAuthenticated: false,
        friendlyName: 'James Fisher',
        email: 'j.fisher@fakemail.com'

    },
    navIsOpen: false
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
        const data = defaultData;
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);
        expect(wrapper.exists()).toBe(true);
    });

    it('should show "Deliver for Just Eat" in nav if prop true and the content is there', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: true
        };
        const data = defaultData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(true);
    });

    it('should NOT show "Deliver for Just Eat" in nav if prop false and the content is there', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            showDeliveryEnquiry: false
        };
        const data = defaultData;

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;
        const data = {
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "navLinks" if the user is logged in and has nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;
        const data = {
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };
        const data = {
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(false);
    });

    it('should show "logout" if the user is logged in but does NOT have nav link data', () => {
        // Arrange
        const propsData = defaultPropsData;
        const data = {
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
    });

    it('should show "login" if the user DOES NOT have nav link data and is NOT logged in"', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };
        const data = {
            ...defaultData,
            userInfo: false
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);

        // Assert
        expect(wrapper.find('[data-js-test="login"]').exists()).toBe(true);
    });

    it('should show nav links on mobile when is "navIsOpen" is true', () => {
        // Arrange
        const propsData = {
            ...defaultPropsData,
            navLinks: {}
        };
        const data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            },
            navIsOpen: true
        };

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);
        wrapper.vm.openNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).toContain('is-open');
    });

    it('should NOT show nav links on mobile when "navIsOpen" is false', () => {
        // Arrange
        const propsData = defaultPropsData;
        const data = {
            ...defaultData,
            userInfo: {
                isAuthenticated: true
            },
            navIsOpen: true
        };

        // Act
        resizeWindow(width, height);
        const wrapper = shallowMount(Navigation, { propsData });
        wrapper.setData(data);
        wrapper.vm.closeNav();

        // Assert
        expect(wrapper.find('[data-js-test="nav-toggle"]').classes()).not.toContain('is-open');
    });
});
