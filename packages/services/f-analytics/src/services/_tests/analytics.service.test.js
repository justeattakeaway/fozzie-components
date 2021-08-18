import AnalyticService from '@/services/analytics.service';
import {
    createStore,
    newEvent,
    options,
    userIdFromCookie,
    authTokenRegistered,
    authTokenGuest,
    userDataWithAuthTokenRegistered,
    userDataWithAuthTokenGuest,
    userDataWithoutAuthToken
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
            expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithoutAuthToken } });
        });

        describe('if authToken has been passed', () => {
            describe('and user is logged in', () => {
                it('should push userData to datalayer with registered auth token details', () => {
                    // Act
                    service.pushUserData(authTokenRegistered);

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithAuthTokenRegistered } });
                });
            });

            describe('and user is a guest', () => {
                it('should push userData to datalayer with guest auth token details', () => {
                    // Act
                    service.pushUserData(authTokenGuest);

                    // Assert
                    expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithAuthTokenGuest } });
                });
            });
        });
    });
});
