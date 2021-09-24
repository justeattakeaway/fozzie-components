import { when } from 'jest-when';
import Cookies from 'universal-cookie';
import defaultOptions from '../../defaultOptions';
import AnalyticService from '../analytics.service';
import analyticModule from '../../store/analytics.module';
import {
    defaultState,
    createStore,
    newEvent,
    options
} from '../../tests/helpers/setup';

jest.mock('universal-cookie', () => jest.fn());

describe('Analytic Service ::', () => {
    const auserId = 'fjdhskgshjgk';
    let store;
    let storeDispatchSpy;
    let service;
    let req;
    let windowCopy;
    let windowSpy;
    let windowsPushSpy;
    let get;
    let registerStoreModuleSpy;

    const mockWindow = ({
        winWidth = 667,
        winHeight = 375,
        dataLayerPresent = true,
        clientside = true
    } = {}) => {
        if (!clientside) {
            jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);

            return;
        }
        windowCopy = { ...global.window };
        const innerWidthSpy = jest.fn().mockReturnValue(winWidth);
        const innerHeightSpy = jest.fn().mockReturnValue(winHeight);
        windowsPushSpy = jest.fn();
        const windowMock = ({
            ...windowCopy,
            dataLayer: dataLayerPresent ? { push: windowsPushSpy } : undefined,
            innerWidth: innerWidthSpy(),
            innerHeight: innerHeightSpy()
        });
        windowSpy = jest.spyOn(global, 'window', 'get');
        windowSpy.mockImplementation(() => windowMock);
    };

    const mockStore = () => {
        store = createStore({
            state: { ...defaultState },
            actions: analyticModule.actions,
            mutations: analyticModule.mutations
        });

        // Hyjack and replicate updating the State thru dispatch calls
        storeDispatchSpy = jest.fn((action, payload) => {
            if (action === `${options.namespace}/updateEvents`) {
                store.state[`${options.namespace}`].events = [...store.state[`${options.namespace}`].events, payload];
            } else if (action === `${options.namespace}/clearEvents`) {
                store.state[`${options.namespace}`].events = [];
            } else if (action === `${options.namespace}/updatePlatformData`) {
                store.state[`${options.namespace}`].platformData = { ...store.state[`${options.namespace}`].platformData, ...payload };
            }
        });
        store.dispatch = storeDispatchSpy;

        registerStoreModuleSpy = jest.fn();
        store.registerModule = registerStoreModuleSpy;
    };

    beforeEach(() => {
        req = jest.fn();

        // Arrange - store
        mockStore();

        // Arrange - cookies
        get = jest.fn();
        when(get).calledWith('je-auser').mockReturnValue(auserId);
        when(get).calledWith('je-user_percentage').mockReturnValue('35');
        Cookies.mockImplementation(() => ({ get }));

        // Arrange - window state
        mockWindow();

        // Arrange - sut
        service = new AnalyticService(store, req, options);
    });

    afterEach(() => {
        store = undefined;
        service = undefined;
        windowSpy.mockRestore();
        storeDispatchSpy.mockRestore();
        jest.clearAllMocks();
    });

    describe('When creating a new instance', () => {
        it('should instantiate a new instance', () => {
            // Act
            const instance = () => new AnalyticService(store, req, options);

            // Assert
            expect(instance).not.toThrowError();
            expect(instance).toBeDefined();
        });

        it('should append the GTM tags if not already present', () => {
            // Arrange - no datalayer
            mockWindow({ dataLayerPresent: false });

            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${options.id}`);
            expect(document.head.innerHTML).toContain('function (w, d, s, l, i)');
            expect(document.head.innerHTML).toContain(`(window, document, 'script', 'dataLayer', '${options.id}');`);
        });

        it('should append the querystring within GTM tags if options supplied', () => {
            // Arrange - options
            const currentRegisteredGtmIdOptions = {
                ...options,
                auth: 'someAuthKey',
                preview: 'somePreviewFlag',
                cookiesWin: 'someCookieName'
            };
            // Arrange - no datalayer
            mockWindow({ dataLayerPresent: false });

            // Act
            service = new AnalyticService(store, req, currentRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${currentRegisteredGtmIdOptions.id}` +
            `&amp;gtm_auth=${currentRegisteredGtmIdOptions.auth}` +
            `&amp;gtm_preview=${currentRegisteredGtmIdOptions.preview}` +
            `&amp;gtm_cookies_win=${currentRegisteredGtmIdOptions.cookiesWin}`);
        });

        it('should not attempt to re-append the GTM tags if already present', () => {
            // Arrange - options
            const newRegisteredGtmIdOptions = { ...options, id: 'GTM-9999999' };
            // Arrange - datalayer
            mockWindow({ dataLayerPresent: true });

            // Act
            service = new AnalyticService(store, req, newRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).not.toContain(`https://www.googletagmanager.com/gtm.js?id=${newRegisteredGtmIdOptions.id}`);
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${options.id}`);
        });

        it('should register the module and preserve the state, if present', () => {
            // Arrange - add some state to store which should be preserved after re-registation
            store.state[`${options.namespace}`].events.push(newEvent); // add some state to preserve

            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...newEvent }); // check state is still present after registration
            expect(registerStoreModuleSpy).toHaveBeenCalledWith(options.namespace, expect.anything(), { preserveState: true });
        });

        it('should not attempt set the `serverside only` platformData properties if clientside', () => {
            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(storeDispatchSpy).not.toHaveBeenCalledWith(`${options.namespace}/updatePlatformData`, expect.anything());
        });

        it('should leave the platformData properties with defaults if data not available and serverside', () => {
            // Arrange
            delete (process.env.justEatEnvironment);
            delete (process.env.FEATURE_VERSION);
            delete (process.env.INSTANCE_POSITION);
            delete (process.env.IS_PILOT);
            when(get).calledWith('je-user_percentage').mockReturnValue(undefined);

            const expected = { ...defaultState.platformData };
            // Arrange - server side
            mockWindow({ clientside: false });

            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/updatePlatformData`, expected);
        });

        it('should set the platformData properties with data if available and serverside', () => {
            // Arrange
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            process.env.IS_PILOT = false;

            const expected = {
                ...defaultState.platformData,
                environment: process.env.justEatEnvironment,
                version: process.env.FEATURE_VERSION,
                instancePosition: process.env.INSTANCE_POSITION,
                isPilot: process.env.IS_PILOT,
                jeUserPercentage: '35'
            };
            // Arrange - server side
            mockWindow({ clientside: false });

            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/updatePlatformData`, expected);
        });

        it('should use default options if no options supplied', () => {
            // Arrange - server side
            mockWindow({ dataLayerPresent: false });

            // Act
            service = new AnalyticService(store, req);

            // Assert that all the default options where used
            expect(document.head.innerHTML).toContain(`${defaultOptions.id}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.auth}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.preview}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.cookiesWin}`);
        });

        it('should substitute missing options with defaults', () => {
            // Arrange - server side
            mockWindow({ dataLayerPresent: false });
            // Arrange - Supply all new options except one
            const partialOptions = {
                ...options,
                auth: 'some_auth_key',
                preview: 'true',
                cookiesWin: 'cookie_name'
            };

            // Act
            service = new AnalyticService(store, req, partialOptions);

            // Assert
            expect(document.head.innerHTML).toContain(`${partialOptions.id}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.auth}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.preview}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.cookiesWin}`);
        });

        it('should flush any stored events', () => {
            // Arrange - Pre-populate Store Events
            store.state[`${options.namespace}`].events.push(newEvent);

            // Act
            service = new AnalyticService(store, req, options);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...newEvent });
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/clearEvents`);
        });
    });

    describe('When calling pushEvent', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const expectedEvent = { ...newEvent };

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(1, `${options.namespace}/clearEvents`);
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(2, `${options.namespace}/updateEvents`, expectedEvent);
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...expectedEvent });
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(3, `${options.namespace}/clearEvents`);
        });
    });

    describe('When calling pushPlatformData', () => {
        // 1 == locale, 2 == branding, 3 == country, 4 == currency, 5 == language
        const cases = [
            ['en-GB', 'uk', 'gbp', 'en'],
            ['en-IE', 'ie', 'eur', 'en'],
            ['it-IT', 'it', 'eur', 'it'],
            ['es-ES', 'es', 'eur', 'es'],
            ['en-AU', 'au', 'aud', 'en'],
            ['en-NZ', 'nz', 'nzd', 'en']
        ];
        test.each(cases)(
            'should dispatch the correct `plaformData` to the store given %p as the locale',
            (localeArg, countryExpected, currencyExpected, languageExpected) => {
                // Arrange
                const expectedPlatformData = {
                    ...defaultState.platformData,
                    appType: 'web',
                    applicationId: 7,
                    country: countryExpected,
                    currency: currencyExpected,
                    language: languageExpected,
                    name: options.featureName
                };
                options.locale = localeArg;
                service = new AnalyticService(store, req, options);

                // Act
                service.pushPlatformData();

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData } });
                expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePlatformData`, expectedPlatformData);

                // Reset options
                options.locale = 'en-GB';
            }
        );

        it('should override the `featureName` when supplied', () => {
            // Arrange
            const expectedPlatformData = {
                ...defaultState.platformData,
                appType: 'web',
                applicationId: 7,
                country: 'uk',
                currency: 'gbp',
                environment: 'localhost',
                language: 'en',
                name: 'new-feature-name'
            };

            // Act
            service.pushPlatformData({ featureName: expectedPlatformData.name });

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePlatformData`, expectedPlatformData);
            expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData } });
        });

        it('should override the `locale` when supplied', () => {
            // Arrange
            const expectedPlatformData = {
                ...defaultState.platformData,
                appType: 'web',
                applicationId: 7,
                country: 'au',
                currency: 'aud',
                environment: 'localhost',
                language: 'en',
                name: options.featureName
            };

            // Act
            service.pushPlatformData({ locale: 'en-AU' });

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePlatformData`, expectedPlatformData);
            expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData } });
        });

        it('should append custom fields when supplied', () => {
            // Arrange
            const expectedPlatformData = {
                ...defaultState.platformData,
                appType: 'web',
                applicationId: 7,
                country: 'uk',
                currency: 'gbp',
                environment: 'localhost',
                language: 'en',
                name: 'new-feature-name'
            };

            // Act
            service.pushPlatformData({ featureName: expectedPlatformData.name, customFields: { custom1: 'one', custom2: 'two' } });

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePlatformData`, expectedPlatformData);
            expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData, custom1: 'one', custom2: 'two' } });
        });
    });

    describe('When calling pushUserData ::', () => {
        it('should not push userData to datalayer if datalayer not present', () => {
            // Arrange - no datalayer
            mockWindow({ dataLayerPresent: false });

            // Act
            service.pushUserData();

            // Assert
            expect(windowsPushSpy).not.toHaveBeenCalled();
        });

        it('should push userData to datalayer only with userId if authToken has not been passed', () => {
            // Arrange
            const expectedUserDataWithoutAuthToken = {
                ...defaultState.userData,
                'a-UserId': auserId
            };

            // Act
            service.pushUserData();

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...expectedUserDataWithoutAuthToken } });
        });

        it('should append custom fields when supplied', () => {
            // Arrange
            const expectedUserDataWithoutAuthToken = {
                ...defaultState.userData,
                'a-UserId': auserId,
                custom1: 'one',
                custom2: 'two'
            };

            // Act
            service.pushUserData({ customFields: { custom1: 'one', custom2: 'two' } });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...expectedUserDataWithoutAuthToken } });
        });

        describe('if authToken has been passed', () => {
            describe('and user is logged in', () => {
                // Arrange
                const authTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
                + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
                + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
                + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
                + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
                + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

                const expectedUserDataWithAuthTokenRegistered = {
                    'a-UserId': auserId,
                    authType: 'Login',
                    email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
                    globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
                    signinType: 'Email',
                    signupDate: '2021-02-08T10:27:49.1930000Z'
                };

                it('should push userData to datalayer with registered auth token details', () => {
                    // Act
                    service.pushUserData({ authToken: authTokenRegistered });

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...expectedUserDataWithAuthTokenRegistered } });
                });
            });

            describe('and user is a guest', () => {
                // Arrange
                const authTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
                + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZ'
                + 'WF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW'
                + '1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXp'
                + 'PZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1p'
                + 'bHlfbmFtZSI6IkJsb2dncyIsInN1YiI6IjEyMzQ1Iiwicm9sZSI6Ikd1ZXN0Ii'
                + 'wiaWF0IjoxNjE1NDY5NTE2fQ.ngfAKpiMH4Gk0Y4gAVC4KeLadWFtVXx4hD1_BSW9SN0';

                const expectedUserDataWithAuthTokenGuest = {
                    'a-UserId': auserId,
                    authType: 'Login',
                    email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
                    globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
                    signinType: 'Guest',
                    signupDate: '2021-02-08T10:27:49.1930000Z'
                };

                it('should push userData to datalayer with guest auth token details', () => {
                    // Act
                    service.pushUserData({ authToken: authTokenGuest });

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...expectedUserDataWithAuthTokenGuest } });
                });
            });
        });
    });

    describe('When calling pushPageData ::', () => {
        it('should not push pageData to datalayer if datalayer not present', () => {
            // Arrange - no datalayer
            mockWindow({ dataLayerPresent: false });

            // Act
            service.pushPageData();

            // Assert
            expect(windowsPushSpy).not.toHaveBeenCalled();
        });

        // 1 == window width, 2 == window height, 3 == expected display value, 4 == expected orientation value
        const cases = [
            [1281, 1282, 'Portrait'],
            [1281, 1280, 'Landscape'],
            [1280, 1025, 'Landscape'],
            [1026, 1025, 'Landscape'],
            [1025, 768, 'Landscape'],
            [769, 768, 'Landscape'],
            [768, 414, 'Landscape'],
            [415, 414, 'Landscape'],
            [414, 413, 'Landscape'],
            [414, 415, 'Portrait']
        ];
        test.each(cases)(
            'should set the correct pageData given window width is %p and window height is %p',
            (winWidth, winHeight, orientationExpected) => {
                // Arrange
                mockWindow({ winWidth, winHeight });

                // Act
                service.pushPageData({ pageName: 'jazz' });

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith(expect.objectContaining({
                    pageData: expect.objectContaining({
                        name: 'jazz',
                        orientation: orientationExpected
                    })
                }));
            }
        );

        it('should override the httpStatusCode when provided', () => {
            // Arrange
            const expected = {
                httpStatusCode: 404
            };

            // Act
            service.pushPageData({ httpStatusCode: expected.httpStatusCode });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith(expect.objectContaining({
                pageData: expect.objectContaining({
                    httpStatusCode: expected.httpStatusCode
                })
            }));
        });

        it('should append custom fields when supplied', () => {
            // Arrange
            const expected = {
                custom1: 'one',
                custom2: 'two'
            };

            // Act
            service.pushPageData({ customFields: { custom1: expected.custom1, custom2: expected.custom2 } });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith(expect.objectContaining({
                pageData: expect.objectContaining({ custom1: expected.custom1, custom2: expected.custom2 })
            }));
        });

        it('should set the conversationId value when x-je-conversation cookie exists', () => {
            // Arrange
            const expected = {
                conversationId: 'f0740341-4369-437d-bcce-735a71ee5b78'
            };

            get = jest.fn();
            when(get).calledWith('x-je-conversation').mockReturnValue(expected.conversationId);
            Cookies.mockImplementation(() => ({ get }));

            // Act
            service.pushPageData();

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith(expect.objectContaining({
                pageData: expect.objectContaining({
                    conversationId: expected.conversationId
                })
            }));
        });
    });

    describe('When calling setOptions ::', () => {
        it('should override `featureName` if supplied', () => {
            // Arrange
            const expectedOptions = {
                ...options,
                featureName: 'test-feature-new-name'
            };

            // Act
            const actualOptions = service.setOptions(expectedOptions);

            // Assert
            expect(actualOptions).toEqual(expectedOptions);
        });

        it('should override `locale` if supplied', () => {
            // Arrange
            const expectedOptions = {
                ...options,
                locale: 'zu-ZU'
            };

            // Act
            const actualOptions = service.setOptions(expectedOptions);

            // Assert
            expect(actualOptions).toEqual(expectedOptions);
        });
    });

    describe('When calling getOptions ::', () => {
        it('should return the current options', () => {
            // Arrange
            const expectedOptions = {
                ...options,
                featureName: 'test-feature-new-name'
            };
            service.setOptions(expectedOptions);

            // Act
            const actualOptions = service.getOptions();

            // Assert
            expect(actualOptions).toEqual(expectedOptions);
        });
    });
});
