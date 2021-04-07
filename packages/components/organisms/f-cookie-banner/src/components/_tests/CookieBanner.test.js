import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import CookieHelper from 'js-cookie';
import CookieBanner from '../CookieBanner.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);
const i18n = {
    locale: 'en-IE'
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
                Object.defineProperty(global, 'window', {
                    value: {
                        dataLayer: []
                    }
                });
                window.dataLayer = [];

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
            ])('shouldHideBanner should be "%s" when `je-cookieConsent` value is "%s"', (
                expected,
                cookieValue
            ) => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData,
                    computed: {
                        legacyBanner: () => false
                    }
                });
                CookieHelper.set('je-cookieConsent', cookieValue);
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(expected);
            });

            it('if no consent cookie is present, should push the value `shown` to the dataLayer ', () => {
                // Arrange
                const propsData = {};
                const expected = { event: 'trackConsent', userData: { consent: 'shown' } };
                Object.defineProperty(global, 'window', {
                    value: {
                        dataLayer: []
                    }
                });
                window.dataLayer = [];
                CookieHelper.remove('je-cookieConsent');

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });

            it('if consent cookie is present and set to `full`, should not push the value `shown` to the dataLayer ', () => {
                // Arrange
                const propsData = {};
                const expected = { event: 'trackConsent', userData: { consent: 'shown' } };
                Object.defineProperty(global, 'window', {
                    value: {
                        dataLayer: []
                    }
                });
                window.dataLayer = [];
                CookieHelper.set('je-cookieConsent', 'full');

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(window.dataLayer).not.toContainEqual(expected);
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
                const mockCookieHelper = jest.spyOn(CookieHelper, 'set').mockImplementation(() => {});
                const payloadName = 'je-cookieConsent';
                const payloadValue = 'foo';
                const payloadObj = {
                    path: '/',
                    expires: 7776000
                };

                wrapper.vm.setCookieBannerCookie('foo');

                // Assert
                expect(mockCookieHelper).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
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
                const mockCookieHelper = jest.spyOn(CookieHelper, 'set').mockImplementation(() => {});
                const payloadName = 'je-banner_cookie';
                const payloadValue = '130315';
                const payloadObj = {
                    path: '/',
                    expires: 7776000
                };

                wrapper.vm.setLegacyCookieBannerCookie();

                // Assert
                expect(mockCookieHelper).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
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
