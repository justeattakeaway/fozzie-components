import AnalyticService from '@/plugins/lib/analytics.service';
import {
    UPDATE_PLATFORM_DATA,
    UPDATE_EVENTS
} from '@/store/mutation-types';
import {
    createStore,
    newEvent,
    options
} from '@/tests/helpers/setup';

describe('Analytic Service ::', () => {
    let store;
    let storeDispatchSpy;
    let service;
    let req;

    beforeEach(() => {
        // Arrange
        store = createStore();
        storeDispatchSpy = jest.fn();
        store.dispatch = storeDispatchSpy;
        req = {
            headers: jest.fn(() => ['user-agent'])
        };
        service = new AnalyticService(store, req, options);
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('test-agent-string');
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

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${UPDATE_EVENTS}`, expectedEvent);
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
                expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${UPDATE_PLATFORM_DATA}`, expectedPlatformData);
            }
        );
    });
});
