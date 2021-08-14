import AnalyticService from '@/services/analytics.service';
import {
    UPDATE_PLATFORM_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from '@/store/mutation-types';
import {
    defaultState,
    newEvent,
    options
} from '@/tests/helpers/setup';

describe('Analytic Service ::', () => {
    let store;
    let storeDispatchSpy;
    let service;
    let req;
    let windowsPushSpy;
    let state;

    beforeEach(() => {
        // Arrange - store
        storeDispatchSpy = jest.fn();
        state = [`${options.namespace}`];
        state[`${options.namespace}`] = { ...defaultState };
        store = {
            state,
            dispatch: storeDispatchSpy
        };
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
        expect(instance).not.toBeNull();
    });

    describe('When calling the pushEvent', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const expectedEvent = { ...newEvent };
            store.state[`${options.namespace}`].events.push(expectedEvent);

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...expectedEvent });
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(1, `${options.namespace}/${UPDATE_EVENTS}`, expectedEvent);
            expect(storeDispatchSpy).toHaveBeenNthCalledWith(2, `${options.namespace}/${CLEAR_EVENTS}`);
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
                store.state[`${options.namespace}`].platformData = expectedPlatformData;
                options.locale = localeArg;
                service = new AnalyticService(store, req, options);

                // Act
                service.pushPlatformData();

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ platformData: { ...expectedPlatformData } });
                expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${UPDATE_PLATFORM_DATA}`, expectedPlatformData);
            }
        );
    });
});
