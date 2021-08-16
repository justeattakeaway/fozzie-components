import AnalyticService from '@/services/analytics.service';
import {
    createStore,
    newEvent,
    options
} from '@/tests/helpers/setup';
import analyticModule from '@/store/analytics.module';

describe('Analytic Service ::', () => {
    let store;
    let storeDispatchSpy;
    let service;
    let req;
    let windowsPushSpy;

    beforeEach(() => {
        // Arrange - store
        store = createStore({
            actions: analyticModule.actions,
            mutations: analyticModule.mutations
        });
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        // Arrange - request
        req = {
            headers: jest.fn(() => ['user-agent'])
        };
        // Arrange - window state
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('test-agent-string');
        windowsPushSpy = jest.fn();
        const originalWindow = { ...window };
        jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
            ...originalWindow,
            dataLayer: {
                push: windowsPushSpy
            }
        }));
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

    describe('When calling the pushEvent', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const expectedEvent = { ...newEvent };
            // store.state[`${options.namespace}`].events.push(expectedEvent);

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...expectedEvent });
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(1, `${options.namespace}/updateEvents`, expectedEvent);
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(2, `${options.namespace}/clearEvents`);
        });
    });

    describe('When calling the pushPlatformData', () => {
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
                    appType: 'web',
                    applicationId: 7,
                    branding: brandingExpected,
                    country: countryExpected,
                    currency: currencyExpected,
                    environment: 'localhost',
                    instancePosition: 'N/A',
                    jeUserPercentage: undefined,
                    language: languageExpected,
                    name: options.featureName,
                    userAgent: navigator.userAgent,
                    version: '0.0.0.0'
                };
                // store.state[`${options.namespace}`].platformData = expectedPlatformData;
                options.locale = localeArg;
                service = new AnalyticService(store, req, options);

                // Act
                service.pushPlatformData();

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData } });
                expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePlatformData`, expectedPlatformData);
            }
        );
    });

    describe('When pushing userData ::', () => {
        const userIdFromCookie = 'fjdhskgshjgk';

        const mockAuthTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
        + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
        + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
        + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
        + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

        const mockAuthTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZ'
        + 'WF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW'
        + '1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXp'
        + 'PZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1p'
        + 'bHlfbmFtZSI6IkJsb2dncyIsInN1YiI6IjEyMzQ1Iiwicm9sZSI6Ikd1ZXN0Ii'
        + 'wiaWF0IjoxNjE1NDY5NTE2fQ.ngfAKpiMH4Gk0Y4gAVC4KeLadWFtVXx4hD1_BSW9SN0';

        const userDataWithMockAuthTokenRegistered = {
            'a-UserId': userIdFromCookie,
            authType: 'Login',
            email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
            globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
            signinType: 'Email',
            signupDate: '2021-02-08T10:27:49.1930000Z'
        };

        const userDataWithMockAuthTokenGuest = {
            'a-UserId': userIdFromCookie,
            authType: 'Login',
            email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
            globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
            signinType: 'Guest',
            signupDate: '2021-02-08T10:27:49.1930000Z'
        };

        const userDataWithoutMockAuthToken = {
            'a-UserId': userIdFromCookie,
            authType: undefined,
            email: undefined,
            globalUserId: undefined,
            signinType: undefined,
            signupDate: undefined
        };

        beforeEach(() => {
            // Arrange
            req = {
                headers: {
                    cookie: `je-auser=${userIdFromCookie}`
                }
            };
            service = new AnalyticService(store, req, options);
        });

        it('should not push userData to datalayer if datalayer not present', async () => {
            // Arrange
            windowsPushSpy = jest.fn();
            const originalWindow = { ...window };
            const windowSpy = jest.spyOn(global, 'window', 'get');
            windowSpy.mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {
                    push: windowsPushSpy
                }
            }));
            windowSpy.mockImplementation(() => ({
                ...originalWindow,
                dataLayer: undefined
            }));

            // Act
            service.pushUserData();

            // Assert
            expect(windowsPushSpy).not.toHaveBeenCalled();
        });

        it('should push userData to datalayer only with userId if authToken has not been passed', () => {
            // Act
            service.pushUserData();

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithoutMockAuthToken } });
        });

        describe('if authToken has been passed', () => {
            describe('and user is logged in', () => {
                it('should push userData to datalayer with registered auth token details', () => {
                    // Act
                    service.pushUserData(mockAuthTokenRegistered);

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithMockAuthTokenRegistered } });
                });
            });

            describe('and user is a guest', () => {
                it('should push userData to datalayer with guest auth token details', () => {
                    // Act
                    service.pushUserData((mockAuthTokenGuest));

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithMockAuthTokenGuest } });
                });
            });
        });
    });
});
