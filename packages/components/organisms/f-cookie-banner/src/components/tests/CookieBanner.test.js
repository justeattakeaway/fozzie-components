import { shallowMount, createLocalVue } from '@vue/test-utils';
import CookieBanner from '../CookieBanner.vue';
import Cookie from 'cookie-universal';

const localVue = createLocalVue();
localVue.prototype.$cookies = Cookie();

describe('CookieBanner', () => {
    describe('components', () => {
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

    describe('methods', () => {
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

        describe('setCookieBannerCookie()', () => {
            it('should set the cookie consent banner cookie', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm.$cookies, 'set');
                const payloadName = 'je-cookieConsent';
                const payloadValue = 'foo';
                const payloadObj = {
                    path: '/',
                    maxAge: 7776000
                };

                wrapper.vm.setCookieBannerCookie('foo');

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
            });
        });

        describe('setLegacyCookieBannerCookie()', () => {
            it('should set the legacy cookie banner cookie', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm.$cookies, 'set');
                const payloadName = 'je-banner_cookie';
                const payloadValue = '2';
                const payloadObj = {
                    path: '/',
                    maxAge: 7776000
                };

                wrapper.vm.setLegacyCookieBannerCookie();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
            });
        });

        describe('acceptActions()', () => {
            it('should set the banner consent cookie to `full`, push `full` to dataLayer and hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                
                wrapper.vm.acceptActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('full');
                expect(dataLayerSpy).toHaveBeenCalledWith('full');
                expect(wrapper.vm.hideBanner).toBe(true);
            });
        });

        describe('nonAcceptActions()', () => {
            it('should set the banner consent cookie to `necessary`, push `necessary` to dataLayer, remove unnecessary cookies, resend GTM events and hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                const resendSpy = jest.spyOn(wrapper.vm, 'resendEvents');
                const removeCookiesSpy = jest.spyOn(wrapper.vm, 'removeUnnecessaryCookies');
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('necessary');
                expect(dataLayerSpy).toHaveBeenCalledWith('necessary');
                expect(resendSpy).toHaveBeenCalled();
                expect(removeCookiesSpy).toHaveBeenCalled();
                expect(wrapper.vm.hideBanner).toBe(true);
            });
        });
    });
});
