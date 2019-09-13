import { shallowMount } from '@vue/test-utils';
import Navigation from '../Navigation.vue';

describe('Navigation', () => {
    it('should be defined', () => {
        const propsData = {
            userInfo: {},
            accountLogin: {},
            accountLogout: {},
            navLinks: {},
            openMenuText: 'Open menu',
            deliveryEnquiry: {},
            showDeliveryEnquiry: false
        };
        const wrapper = shallowMount(Navigation, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should show "Deliver for Just Eat" in nav if prop true and content there', () => {
        // Arrange
        const propsData = {
            navLinks: {},
            deliveryEnquiry: {
                text: 'Deliver with Just Eat',
                url: 'https://couriers.just-eat.co.uk/application?utm_medium=referrer&utm_source=just-eat.co.uk&utm_campaign=ex1140-header',
                gtm: 'click_delivery_job'
            },
            showDeliveryEnquiry: true
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(true);
    });

    it('should NOT show "Deliver for Just Eat" in nav if prop true and content there', () => {
        // Arrange
        const propsData = {
            navLinks: {},
            deliveryEnquiry: {},
            showDeliveryEnquiry: false
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="delivery-enquiry"]').exists()).toBe(false);
    });

    it('should show "navLinks" and "logout" if the user is logged in and HAS nav link data', () => {
        // Arrange
        const propsData = {
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
            userInfo: {
                isAuthenticated: true
            }
        };

        // Act
        const wrapper = shallowMount(Navigation, { propsData });

        // Assert
        expect(wrapper.find('[data-js-test="logout"]').exists()).toBe(true);
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(true);
    });

    it('should NOT show "navLinks" but show "logout" if the user is logged in but DOES NOT have nav link data', () => {
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
        expect(wrapper.find('[data-js-test="nav-links"]').exists()).toBe(false);
    });

    it('should show "login if the user has no nav link data and is not authenticated"', () => {
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
});
