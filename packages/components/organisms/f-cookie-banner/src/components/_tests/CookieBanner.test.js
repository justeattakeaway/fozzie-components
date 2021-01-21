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
        describe('isNotExcluded()', () => {
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
            ])('hideBanner should "%s" when `je-cookieConsent` value is "%s"', (
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
                wrapper.vm.legacyBanner = false;
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
            it('should set the banner consent cookie to `full`', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                
                wrapper.vm.acceptActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('full');
            });
            it('should push `full` to dataLayer', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                
                wrapper.vm.acceptActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('full');
            });
            it('should hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });

                wrapper.vm.acceptActions();

                // Assert
                expect(wrapper.vm.hideBanner).toBe(true);
            });
        });

        describe('nonAcceptActions()', () => {
            it('should set the banner consent cookie to `necessary`', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('necessary');
            });
            it('should push `necessary` to dataLayer', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('necessary');
            });
            it('should remove unnecessary cookies', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const removeCookiesSpy = jest.spyOn(wrapper.vm, 'removeUnnecessaryCookies');
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(removeCookiesSpy).toHaveBeenCalled();
            });
            it('should resend GTM events', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                const resendSpy = jest.spyOn(wrapper.vm, 'resendEvents');
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(resendSpy).toHaveBeenCalled();
            });
            it('should hide the banner', () => {
                // Arrange
                const propsData = {};
                
                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    propsData
                });
                
                wrapper.vm.nonAcceptActions();

                // Assert
                expect(wrapper.vm.hideBanner).toBe(true);
            });
        });
    });
});
