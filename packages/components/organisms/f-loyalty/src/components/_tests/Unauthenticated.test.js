import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import Unauthenticated from '../Unauthenticated.vue';
import tenantConfigs from '../../tenants';
import i18nMocker from './helper';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

const LOGIN_URL = '/account/login?returnurl=%2Foffers%2Fstamp-cards';

const mockLocale = 'en-GB';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

let store,
    wrapper;

beforeEach(() => {
    jest.resetAllMocks();
    window.trak = {
        event: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            isAppsUserAgent: false
        }
    });

    // Arrange
    wrapper = shallowMount(Unauthenticated, {
        store,
        localVue,
        i18n,
        mocks: {
            $t: t => i18nMocker(t, mockLocale)
        }
    });
});

describe('UnauthenticatedLayout.vue', () => {
    it('should display a card with title "Login to get started"', () => {
        // Act
        const title = wrapper.find('[data-test-id="unauthenticated-title"]');

        // Assert
        expect(title.text()).toBe(tenantConfigs[mockLocale].messages.unauthenticated.loginTitle);
    });

    it('should contain a href attribute for linking to the login page', () => {
        // Act
        const logInButton = wrapper.find('[data-test-id="unauthenticated-button"]');

        // Assert
        expect(logInButton.attributes('href')).toBe(LOGIN_URL);
    });

    it('should contain display the correct text for login button', () => {
        // Act
        const logInButton = wrapper.find('[data-test-id="unauthenticated-button"]');

        // Assert
        expect(logInButton.text()).toBe(tenantConfigs[mockLocale].messages.unauthenticated.loginButtonText);
    });

    it('should contain a href attribute for linking to the terms and conditions page', () => {
        // Act
        const termsLink = wrapper.find('[data-test-id="unauthenticated-terms-and-conditions"]');

        // Assert
        expect(termsLink.attributes('href')).toBe(tenantConfigs[mockLocale].messages.termsUrl);
    });

    it('should contain display the correct text for terms button', () => {
        // Act
        const termsLink = wrapper.find('[data-test-id="unauthenticated-terms-and-conditions"]');

        // Assert
        expect(termsLink.text()).toBe(tenantConfigs[mockLocale].messages.termsText);
    });

    it('should publish an engagement event on mount', () => {
        // Assert
        expect(window.trak.event).toHaveBeenCalledWith({
            category: 'engagement',
            action: 'view_stampcards',
            label: 'logged_out'
        });
    });
});
