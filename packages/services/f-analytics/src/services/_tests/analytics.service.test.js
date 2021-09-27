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
    let windowCopy;
    let windowSpy;
    let windowsPushSpy;
    let get;

    const mockWindow = ({ winWidth = 667, winHeight = 375 } = {}) => {
        windowsPushSpy = jest.fn();
        windowCopy = { ...window };
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
        service = new AnalyticService(store, options);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate a new instance', () => {
        // Act
        const instance = () => new AnalyticService(store, options);

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
        // 1 == locale, 2 == country, 3 == currency, 4 == language
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
                service = new AnalyticService(store, options);

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

        // 1 == window width, 2 == window height, 3 == expected orientation value
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
});
