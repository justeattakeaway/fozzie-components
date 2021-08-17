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
    let windowCopy;
    let windowSpy;
    let windowsPushSpy;

    const mockWindow = ({ winWidth = 667, winHeight = 375 } = {}) => {
        // const winDimensions = { winWidth: 667, winHeight: 375, ...dimensions };
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
        // Arrange - request
        req = {
            headers: {
                cookie: `je-auser=${userIdFromCookie}`
            }
        };
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
                    name: 'test-page-name',
                    group: 'test-feature-name',
                    httpStatusCode: 0,
                    isCached: false,
                    conversationId: '',
                    requestId: '',
                    orientation: orientationExpected,
                    display: displayExpected
                };
                mockWindow({ winWidth, winHeight });

                // Act
                service.pushPageData({ pageName: expected.name });

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
                expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePageData`, expected);
            }
        );

        it('should set conversationId and requestId values when provided', () => {
            // Arrange
            const expected = {
                name: 'test-page-name',
                group: 'test-feature-name',
                httpStatusCode: 0,
                isCached: false,
                conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
                requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e',
                orientation: 'Landscape',
                display: 'mid'
            };

            // Act
            service.pushPageData({ conversationId: expected.conversationId, requestId: expected.requestId });

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/updatePageData`, expected);
        });
    });
});
