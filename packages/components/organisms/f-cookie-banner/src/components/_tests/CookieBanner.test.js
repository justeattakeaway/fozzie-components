import { shallowMount, createLocalVue } from '@vue/test-utils';
import CookieBanner from '../CookieBanner.vue';
import Cookie from 'cookie-universal';
import { VueI18n } from '@justeat/f-globalisation';

const localVue = createLocalVue();
localVue.prototype.$cookies = Cookie();
localVue.use(VueI18n);
const i18n = {
    locale: 'en-GB'
};

describe('CookieBanner', () => {
    describe('components', () => {
        it('should be defined', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(CookieBanner, {
                localVue,
                i18n,
                propsData
            });

            // Assert
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('methods', () => {
        describe('isNotExcluded', () => {
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
                    i18n,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isNotExcluded(cookieName)).toBe(expected);
            });
        });

        describe('dataLayerPush', () => {
            it('should push the consent level to the dataLayer', () => {
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
                    i18n,
                    propsData
                });
                wrapper.vm.dataLayerPush('full');

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });
        });

        describe('checkCookieBannerCookie', () => {
            it.each([
                [false, ''],
                [false, 'random value'],
                [true, 'full'],
                [true, 'necessary']
            ])('shouldHideBanner should "%s" when `je-cookieConsent` value is "%s"', (
                expected,
                cookieValue
            ) => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                wrapper.vm.$cookies.set('je-cookieConsent', cookieValue);
                wrapper.vm.legacyBanner = false;
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(expected);
            });
        });

        describe('setCookieBannerCookie', () => {
            it('should set the cookie consent banner cookie', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
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

        describe('setLegacyCookieBannerCookie', () => {
            it('should set the legacy cookie banner cookie', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
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

        describe('acceptAllCookiesActions', () => {
            it('should set the banner consent cookie to `full`', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                
                wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('full');
            });
            it('should push `full` to dataLayer', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                
                wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('full');
            });
            it('should hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(true);
            });
        });

        describe('acceptOnlyNecessaryCookiesActions', () => {
            it('should set the banner consent cookie to `necessary`', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('necessary');
            });
            it('should push `necessary` to dataLayer', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('necessary');
            });
            it('should remove unnecessary cookies', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const removeCookiesSpy = jest.spyOn(wrapper.vm, 'removeUnnecessaryCookies');
                
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(removeCookiesSpy).toHaveBeenCalled();
            });
            it('should resend GTM events', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const resendSpy = jest.spyOn(wrapper.vm, 'resendEvents');
                
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(resendSpy).toHaveBeenCalled();
            });
            it('should hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(true);
            });
        });
    });
});
