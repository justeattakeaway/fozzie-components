import { shallowMount, createLocalVue } from '@vue/test-utils';
import CookieBanner from '../CookieBanner.vue';
import Cookie from 'cookie-universal';

const localVue = createLocalVue();
localVue.prototype.$cookies = Cookie();

describe('CookieBanner', () => {
    describe('component', () => {
        it('should be defined', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(CookieBanner, {
                localVue,
                propsData
            });

            // Assert
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('method', () => {
        describe('isNotExcluded() should be false for cookies that will not be deleted', () => {
            it.each([
                [false, 'je-location'],
                [false, '_ga'],
                [true, 'location'],
                [true, 'random-cookie-name']
            ])('should return "%s" when `cookie name` is "%s"', (
                expected,
                cookieName
            ) => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isNotExcluded(cookieName)).toBe(expected);
            });
        });
    });

    describe('method', () => {
        describe('dataLayerPush()', () => {
            it('should push `consentLevel` to the dataLayer', () => {
                // Arrange
                const propsData = {};
                const expected = { event: 'trackConsent', userData: { consent: 'full' } };
                Object.defineProperty(global, "window", {
                    value: {
                        dataLayer: []
                    }
                });
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                wrapper.vm.dataLayerPush('full');

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });
        });
    });

    describe('method', () => {
        describe('checkCookieBannerCookie()', () => {
            it.each([
                [false, ''],
                [false, 'random value'],
                [true, 'full'],
                [true, 'necessary']
            ])('should show/hide banner according to `je-cookieConsent` value', (
                expected,
                cookieValue
            ) => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                wrapper.vm.$cookies.set('je-cookieConsent', cookieValue);
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(wrapper.vm.hideBanner).toBe(expected);
            });
        });
    });
});


// acceptActions
// nonAcceptActions
// focusOnTitle
// setCookieBannerCookie
// setLegacyCookieBannerCookie
// resendEvents
