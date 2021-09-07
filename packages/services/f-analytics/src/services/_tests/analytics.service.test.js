import { when } from 'jest-when';
import Cookies from 'universal-cookie';
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

    const mockWindow = ({ winWidth = 667, winHeight = 375 } = {}) => {
        windowsPushSpy = jest.fn();
        windowCopy = { ...window };
        jest.spyOn(windowCopy.navigator, 'userAgent', 'get').mockReturnValue('test-agent-string');
        const innerWidthSpy = jest.fn().mockReturnValue(winWidth);
        const innerHeightSpy = jest.fn().mockReturnValue(winHeight);
        windowSpy = jest.spyOn(global, 'window', 'get');
        windowSpy.mockImplementation(() => ({
            ...windowCopy,
            dataLayer: {
                push: windowsPushSpy
            },
            innerWidth: innerWidthSpy(),
            innerHeight: innerHeightSpy()
        }));
    };

    beforeEach(() => {
        // Arrange - store
        store = createStore({
            actions: analyticModule.actions,
            mutations: analyticModule.mutations
        });
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        // Arrange - cookies
        get = jest.fn();
        when(get).calledWith('je-auser').mockReturnValue(auserId);
        Cookies.mockImplementation(() => ({ get }));
        // Arrange - window state
        mockWindow();
        // Arrange - sut
        service = new AnalyticService(store, req, options);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate a new instance', () => {
        // Act
        const instance = () => new AnalyticService(store, req, options);

        // Assert
        expect(instance).not.toThrowError();
        expect(instance).toBeDefined();
    });

    describe('When calling pushEvent', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const expectedEvent = { ...newEvent };

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...expectedEvent });
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(1, `${options.namespace}/updateEvents`, expectedEvent);
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(2, `${options.namespace}/clearEvents`);
        });
    });

    describe('When calling pushPlatformData', () => {
        // 1 == locale, 2 == branding, 3 == country, 4 == currency, 5 == language
        const cases = [
            ['en-GB', 'justeat', 'uk', 'gbp', 'en'],
            ['en-IE', 'justeat', 'ie', 'eur', 'en'],
            ['it-IT', 'justeat', 'it', 'eur', 'it'],
            ['es-ES', 'justeat', 'es', 'eur', 'es'],
            ['en-AU', 'menulog', 'au', 'aud', 'en'],
            ['en-NZ', 'menulog', 'nz', 'nzd', 'en']
        ];
        test.each(cases)(
            'should dispatch the correct `plaformData` to the store given %p as the locale',
            (localeArg, brandingExpected, countryExpected, currencyExpected, languageExpected) => {
                // Arrange
                const expectedPlatformData = {
                    ...defaultState.platformData,
                    appType: 'web',
                    applicationId: 7,
                    branding: brandingExpected,
                    country: countryExpected,
                    currency: currencyExpected,
                    language: languageExpected,
                    name: options.featureName,
                    userAgent: navigator.userAgent
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
                branding: 'justeat',
                country: 'uk',
                currency: 'gbp',
                environment: 'localhost',
                language: 'en',
                name: 'new-feature-name',
                userAgent: navigator.userAgent
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
                branding: 'menulog',
                country: 'au',
                currency: 'aud',
                environment: 'localhost',
                language: 'en',
                name: options.featureName,
                userAgent: navigator.userAgent
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
                branding: 'justeat',
                country: 'uk',
                currency: 'gbp',
                environment: 'localhost',
                language: 'en',
                name: 'new-feature-name',
                userAgent: navigator.userAgent
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
            // Arrange - window state
            windowSpy.mockImplementation(() => (
                {
                    ...windowCopy,
                    dataLayer: undefined
                }));

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
            // Arrange - window state
            windowSpy.mockImplementation(() => (
                {
                    ...windowCopy,
                    dataLayer: undefined
                }));

            // Act
            service.pushPageData();

            // Assert
            expect(windowsPushSpy).not.toHaveBeenCalled();
        });

        // 1 == window width, 2 == window height, 3 == expected display value, 4 == expected orientation value
        const cases = [
            [1281, 1282, 'full-size', 'Portrait'],
            [1281, 1280, 'full-size', 'Landscape'],
            [1280, 1025, 'huge', 'Landscape'],
            [1026, 1025, 'huge', 'Landscape'],
            [1025, 768, 'wide', 'Landscape'],
            [769, 768, 'wide', 'Landscape'],
            [768, 414, 'mid', 'Landscape'],
            [415, 414, 'mid', 'Landscape'],
            [414, 413, 'narrow', 'Landscape'],
            [414, 415, 'narrow', 'Portrait']
        ];
        test.each(cases)(
            'should set the correct pageData given window width is %p and window height is %p',
            (winWidth, winHeight, displayExpected, orientationExpected) => {
                // Arrange
                const expected = {
                    ...defaultState.pageData,
                    name: 'test-page-name',
                    group: 'test-feature-name',
                    orientation: orientationExpected,
                    display: displayExpected
                };
                mockWindow({ winWidth, winHeight });

                // Act
                service.pushPageData({ pageName: expected.name });

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            }
        );

        it('should set requestId value when provided', () => {
            // Arrange
            const expected = {
                ...defaultState.pageData,
                group: 'test-feature-name',
                name: 'test-page-name',
                conversationId: undefined,
                requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e',
                orientation: 'Landscape',
                display: 'mid'
            };

            // Act
            service.pushPageData({ pageName: expected.name, requestId: expected.requestId });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
        });

        it('should override the httpStatusCode when provided', () => {
            // Arrange
            const expected = {
                ...defaultState.pageData,
                name: 'test-page-name',
                group: 'test-feature-name',
                httpStatusCode: 404,
                orientation: 'Landscape',
                display: 'mid'
            };

            // Act
            service.pushPageData({ pageName: expected.name, httpStatusCode: expected.httpStatusCode });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
        });

        it('should append custom fields when supplied', () => {
            // Arrange
            const expected = {
                ...defaultState.pageData,
                name: 'test-page-name',
                group: 'test-feature-name',
                orientation: 'Landscape',
                display: 'mid',
                custom1: 'one',
                custom2: 'two'
            };

            // Act
            service.pushPageData({ pageName: expected.name, customFields: { custom1: 'one', custom2: 'two' } });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
        });

        it('should set the conversationId value when x-je-conversation cookie exists', () => {
            // Arrange
            const expected = {
                ...defaultState.pageData,
                group: 'test-feature-name',
                name: 'test-page-name',
                conversationId: 'f0740341-4369-437d-bcce-735a71ee5b78',
                requestId: undefined,
                orientation: 'Landscape',
                display: 'mid'
            };

            get = jest.fn();
            when(get).calledWith('x-je-conversation').mockReturnValue(expected.conversationId);
            Cookies.mockImplementation(() => ({ get }));

            // Act
            service.pushPageData({ pageName: expected.name });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
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
});
