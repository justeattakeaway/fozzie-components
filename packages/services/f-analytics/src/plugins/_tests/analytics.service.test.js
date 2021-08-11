import AnalyticService from '@/plugins/lib/analytics.service';
import {
    createStore,
    newEvent,
    options
} from '../../tests/helpers/setup';
import {
    PUSH_PLATFORM_DATA,
    PUSH_USER_DATA,
    PUSH_EVENT
} from '../../store/mutation-types';

describe('Analytic Service ::', () => {
    let store;
    let storeDispatchSpy;

    beforeEach(() => {
        // Arrange
        store = createStore();
        storeDispatchSpy = jest.fn();
        store.dispatch = storeDispatchSpy;
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('test-agent-string');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate a new instance', () => {
        // Act
        const instance = () => new AnalyticService(store, jest.fn(), options);

        // Assert
        expect(instance).not.toThrowError();
        expect(instance).not.toBeNull();
    });

    describe('When pushing an event', () => {
        it('should dispatch the `event` to the store', () => {
            // Arrange
            const req = {
                headers: {
                    cookie: 'je-auser=abc123'
                }
            };
            req.headers = jest.fn(() => ['user-agent']);
            const service = new AnalyticService(store, req, options);
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
            const req = {
                headers: jest.fn(() => ['user-agent'])
            };
            const service = new AnalyticService(store, req, options);

            // Act
            service.pushPlatformData();

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expectedPlatformData);
        });
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

        let service;

        beforeEach(() => {
            // Arrange
            const req = {
                headers: {
                    cookie: `je-auser=${userIdFromCookie}`
                }
            };
            service = new AnalyticService(store, req, options);
        });

        it('should call `updateUserData` action only with userId if authToken has not been passed', () => {
            // Act
            service.pushUserData();

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_USER_DATA}`, userDataWithoutMockAuthToken);
        });

        describe('if authToken has been passed', () => {
            describe('and user is logged in', () => {
                it('should call `updateUserData` action with `userDataWithMockAuthTokenRegistered`', () => {
                    // Act
                    service.pushUserData(mockAuthTokenRegistered);

                    // Assert
                    expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_USER_DATA}`, userDataWithMockAuthTokenRegistered);
                });
            });

            describe('and user is a guest', () => {
                it('should call `updateUserData` action with `userDataWithMockAuthTokenGuest`', () => {
                    // Act
                    service.pushUserData((mockAuthTokenGuest));

                    // Assert
                    expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_USER_DATA}`, userDataWithMockAuthTokenGuest);
                });
            });
        });
    });
});
