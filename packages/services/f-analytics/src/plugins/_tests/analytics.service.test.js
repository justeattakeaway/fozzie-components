import AnalyticService from '@/plugins/lib/analytics.service';
import {
    createStore,
    newEvent,
    options
} from '../../tests/helpers/setup';
import {
    PUSH_PLATFORM_DATA,
    PUSH_EVENT
} from '../../store/mutation-types';

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

    describe('When pushing an event', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const expectedEvent = { ...newEvent };

            // Act
            service.pushEvent(newEvent);

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_EVENT}`, expectedEvent);
        });
    });

    describe('When pushing platformData', () => {
        it('should dispatch the `platformData` to the store', () => {
            // Arrange
            const expectedPlatformData = {
                environment: 'localhost',
                name: 'test-route-name',
                appType: 'web',
                applicationId: 7,
                userAgent: 'test-agent-string',
                branding: 'justeat',
                country: 'uk',
                language: 'en',
                jeUserPercentage: undefined,
                currency: 'gbp',
                version: '0.0.0.0',
                instancePosition: 'N/A'
            };

            // Act
            service.pushPlatformData();

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expectedPlatformData);
        });
    });
});
