import { shallowMount, createLocalVue } from '@vue/test-utils';
import CookieHelper from 'js-cookie';
import CookieBanner from '../CookieBanner.vue';
import { LEGACY_CONSENT_COOKIE_NAME, CONSENT_COOKIE_NAME } from '../../constants';

const localVue = createLocalVue();
const i18n = {
    locale: 'en-IE'
};

jest.mock('js-cookie');

describe('CookieBanner', () => {
    beforeEach(() => {
        const resizeObserverMock = jest.fn(function ResizeObserver (callback) {
            this.observe = jest.fn();
            this.disconnect = jest.fn();
            this.trigger = entry => callback(entry, this);
        });
        global.ResizeObserver = resizeObserverMock;
    });

    afterEach(() => {
        global.ResizeObserver = undefined;
    });

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

        describe('mounted:: ', () => {
            it('should not call createResizeObserver() when shouldAbsolutePositionReopenLink prop is false', () => {
                // Arrange
                const propsData = { shouldAbsolutePositionReopenLink: false };
                const spyMethod = jest.spyOn(CookieBanner.methods, 'updateIsBodyHeightLessThanWindowHeight');

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Assert
                expect(wrapper.vm.bodyObserver).toBe(undefined);
                expect(spyMethod).toBeCalledTimes(0);
            });

            it('should not call createResizeObserver() for legacy cookie banner', () => {
                // Arrange
                const propsData = { shouldShowLegacyBanner: true };
                const spyMethod = jest.spyOn(CookieBanner.methods, 'updateIsBodyHeightLessThanWindowHeight');

                // Act
                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Assert
                expect(wrapper.vm.bodyObserver).toBe(undefined);
                expect(spyMethod).toBeCalledTimes(0);
            });
        });
    });

    describe('methods', () => {
        describe('ResizeObserver:: ', () => {
            let offsetHeightSpy;

            beforeEach(() => {
                offsetHeightSpy = jest.spyOn(document.body, 'offsetHeight', 'get');
                jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
            });

            afterEach(() => {
                jest.clearAllMocks();
                delete window.innerHeight;
                window.requestAnimationFrame.mockRestore();
            });

            describe('createResizeObserver:: ', () => {
                it('should create ResizeObserver and observe <body>', () => {
                    // Arrange
                    const propsData = {};

                    // Act
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n,
                        propsData
                    });

                    const mockBodyHTMLHtmlElement = document.createElement('html');
                    mockBodyHTMLHtmlElement.innerHTML = '<head /><body/>';

                    // Assert
                    expect(wrapper.vm.bodyObserver.observe).toHaveBeenCalledTimes(1);
                    expect(wrapper.vm.bodyObserver.observe).toHaveBeenCalledWith(expect.any(HTMLHtmlElement));
                    expect(wrapper.vm.bodyObserver.observe).toHaveBeenCalledWith(mockBodyHTMLHtmlElement);
                });

                it('should update data.bodyHeight with the contentRect.height when observe is triggered', async () => {
                    // Arrange
                    const propsData = {};
                    const height = 1000;

                    // Act
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n,
                        propsData
                    });
                    await wrapper.setData({ shouldHideBanner: true });
                    wrapper.vm.bodyObserver.trigger([{ contentRect: { height } }]);

                    // Assert
                    expect(wrapper.vm.bodyHeight).toEqual(height);
                });
            });

            describe('updateIsBodyHeightLessThanWindowHeight:: ', () => {
                it('should return false when the body height is greater than window.innerHeight', async () => {
                    // Arrange
                    const propsData = {};
                    window.innerHeight = 900;
                    offsetHeightSpy.mockImplementation(() => 1000);

                    // Act
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n,
                        propsData
                    });
                    await wrapper.setData({ shouldHideBanner: true });
                    wrapper.vm.updateIsBodyHeightLessThanWindowHeight();

                    // Assert
                    expect(wrapper.vm.isBodyHeightLessThanWindowHeight).toBeFalsy();
                });

                it('should return true when the body height is less than window.innerHeight', async () => {
                    // Arrange
                    const propsData = { isHidden: true };

                    offsetHeightSpy.mockImplementation(() => 350);
                    window.innerHeight = 9999;

                    // Act
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n,
                        propsData
                    });
                    await wrapper.setData({ shouldHideBanner: true });
                    wrapper.vm.updateIsBodyHeightLessThanWindowHeight();

                    // Assert
                    expect(wrapper.vm.isBodyHeightLessThanWindowHeight).toBeTruthy();
                });
            });
        });


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

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData,
                    computed: {
                        legacyBanner: () => false,
                        consentCookieName: () => CONSENT_COOKIE_NAME
                    }
                });

                CookieHelper.get.mockReturnValue(cookieValue);

                // Act
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
                CookieHelper.get.mockReturnValue(null);

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Act
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
                CookieHelper.get.mockReturnValue('full');

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Act
                wrapper.vm.checkCookieBannerCookie();

                // Assert
                expect(window.dataLayer).not.toContainEqual(expected);
            });
        });

        describe('setCookieBannerCookie', () => {
            it('should set the cookie consent banner cookie', () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData,
                    computed: {
                        cookieName () {
                            return CONSENT_COOKIE_NAME;
                        }
                    }
                });

                const payloadName = CONSENT_COOKIE_NAME;
                const payloadValue = 'foo';
                const payloadObj = {
                    path: '/',
                    expires: 90
                };

                // Act
                wrapper.vm.setCookieBannerCookie('foo');

                // Assert
                expect(CookieHelper.set).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
            });
        });

        describe('setLegacyCookieBannerCookie', () => {
            it('should set the legacy cookie banner cookie', () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const mockCookieHelper = jest.spyOn(CookieHelper, 'set').mockImplementation(() => {});
                const payloadName = LEGACY_CONSENT_COOKIE_NAME;
                const payloadValue = '130315';
                const payloadObj = {
                    path: '/',
                    expires: 90
                };

                // Act
                wrapper.vm.setLegacyCookieBannerCookie();

                // Assert
                expect(mockCookieHelper).toHaveBeenCalledWith(payloadName, payloadValue, payloadObj);
            });
        });

        describe('acceptAllCookiesActions', () => {
            it('should set the banner consent cookie to `full`', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');

                // Act
                await wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('full');
            });

            it('should push `full` to dataLayer', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');

                // Act
                await wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('full');
            });

            it('should hide the banner', () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Act
                wrapper.vm.acceptAllCookiesActions();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(true);
            });
        });

        describe('acceptOnlyNecessaryCookiesActions', () => {
            it('should set the banner consent cookie to `necessary`', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const cookieSpy = jest.spyOn(wrapper.vm, 'setCookieBannerCookie');

                // Act
                await wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(cookieSpy).toHaveBeenCalledWith('necessary');
            });

            it('should push `necessary` to dataLayer', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const dataLayerSpy = jest.spyOn(wrapper.vm, 'dataLayerPush');

                // Act
                await wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(dataLayerSpy).toHaveBeenCalledWith('necessary');
            });

            it('should remove unnecessary cookies', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const removeCookiesSpy = jest.spyOn(wrapper.vm, 'removeUnnecessaryCookies');

                // Act
                await wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(removeCookiesSpy).toHaveBeenCalled();
            });

            it('should resend GTM events', async () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });
                const resendSpy = jest.spyOn(wrapper.vm, 'resendEvents');

                // Act
                await wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(resendSpy).toHaveBeenCalled();
            });

            it('should hide the banner', () => {
                // Arrange
                const propsData = {};

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n,
                    propsData
                });

                // Act
                wrapper.vm.acceptOnlyNecessaryCookiesActions();

                // Assert
                expect(wrapper.vm.shouldHideBanner).toBe(true);
            });
        });

        describe('cookieName', () => {
            describe('`nameSuffix` is provided', () => {
                it('should return the default consent cookie name with the suffix', () => {
                    // Arrange
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n,
                        propsData: {
                            nameSuffix: 'suffixed'
                        }
                    });

                    // Act
                    const { consentCookieName } = wrapper.vm;

                    // Assert
                    expect(consentCookieName).toMatchSnapshot();
                });
            });

            describe('`nameSuffix` is not provided', () => {
                it('should return the default consent cookie name', () => {
                    // Arrange
                    const wrapper = shallowMount(CookieBanner, {
                        localVue,
                        i18n
                    });

                    // Act
                    const { consentCookieName } = wrapper.vm;

                    // Assert
                    expect(consentCookieName).toMatchSnapshot();
                });
            });
        });
    });

    describe('watch:: ', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('bodyHeight:: ', () => {
            it('should call updateIsBodyHeightLessThanWindowHeight when data.bodyHeight changes', async () => {
                // Arrange
                const spyMethod = jest.spyOn(CookieBanner.methods, 'updateIsBodyHeightLessThanWindowHeight');

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n
                });

                await wrapper.setData({ bodyHeight: 500 });

                expect(spyMethod).toBeCalled();
            });

            it('should not call updateIsBodyHeightLessThanWindowHeight when data.bodyHeigth newVal === oldVal', async () => {
                // Arrange
                const spyMethod = jest.spyOn(CookieBanner.methods, 'updateIsBodyHeightLessThanWindowHeight');

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n
                });

                await wrapper.setData({ bodyHeight: 500 });
                await wrapper.setData({ bodyHeight: 500 });

                expect(spyMethod).toBeCalledTimes(1);
            });

            it('should call updateIsBodyHeightLessThanWindowHeight everytime data.bodyHeight changes', async () => {
                // Arrange
                const spyMethod = jest.spyOn(CookieBanner.methods, 'updateIsBodyHeightLessThanWindowHeight');

                const wrapper = shallowMount(CookieBanner, {
                    localVue,
                    i18n
                });

                await wrapper.setData({ bodyHeight: 500 });
                await wrapper.setData({ bodyHeight: 700 });
                await wrapper.setData({ bodyHeight: 500 });

                expect(spyMethod).toBeCalledTimes(3);
            });
        });
    });
});
