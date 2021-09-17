import AnalyticsPlugin from '../analytics.plugin';
import AnalyticService from '../../services/analytics.service';
import defaultOptions from '../../defaultOptions';
import {
    defaultState,
    newEvent,
    options
} from '../../tests/helpers/setup';
import {
    CLEAR_EVENTS
} from '../../store/mutation-types';

jest.mock('universal-cookie', () => jest.fn());

describe('Analytics Plugin ::', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When creating the plugin', () => {
        let storeDispatchSpy;
        let storeModuleSpy;
        let context;
        let injectSpy;
        let defaultStore;
        let state;

        beforeEach(() => {
            // Arrange - store
            storeDispatchSpy = jest.fn();
            storeModuleSpy = jest.fn(() => true);
            state = [`${options.namespace}`];
            state[`${options.namespace}`] = { ...defaultState };
            defaultStore = {
                state,
                dispatch: storeDispatchSpy,
                hasModule: storeModuleSpy
            };
            // Arrange - context
            context = { store: defaultStore, req: jest.fn() };
            injectSpy = jest.fn(() => {});
            // Arrange - window state
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: undefined
            }));
        });

        it('should use default options if no options supplied', () => {
            // Act
            AnalyticsPlugin(context, injectSpy, null);

            // Assert that all the default options where used
            expect(storeModuleSpy).toHaveBeenCalledWith(defaultOptions.namespace);
            expect(document.head.innerHTML).toContain(`${defaultOptions.id}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.auth}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.preview}`);
            expect(document.head.innerHTML).not.toContain(`${defaultOptions.cookiesWin}`);
            expect(injectSpy).toHaveBeenCalledWith(defaultOptions.globalVarName, expect.anything());
        });

        it('should substitute missing options with defaults', () => {
            // Arrange - Supply all options except one
            const partialOptions = {
                ...options,
                auth: 'some_auth_key',
                preview: 'true',
                cookiesWin: 'cookie_name'
            };

            // Act
            AnalyticsPlugin(context, injectSpy, partialOptions);

            // Assert
            expect(storeModuleSpy).toHaveBeenCalledWith(partialOptions.namespace);
            expect(document.head.innerHTML).toContain(`${partialOptions.id}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.auth}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.preview}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.cookiesWin}`);
            expect(injectSpy).toHaveBeenCalledWith(defaultOptions.globalVarName, expect.anything()); // Default used because no option supplied
        });

        it('should inject the global object', () => {
            // Arrange
            const modifiedOptions = { ...options, globalVarName: 'jazz' };
            const expected = new AnalyticService(defaultStore, context.req, modifiedOptions);

            // Act
            AnalyticsPlugin(context, injectSpy, modifiedOptions);

            // Assert
            expect(injectSpy).toHaveBeenCalledWith(modifiedOptions.globalVarName, expected);
        });

        it('should flush any stored events', () => {
            // Arrange - context
            context.store.state[`${options.namespace}`].events.push(newEvent);
            // Arrange - window state
            const windowsPushSpy = jest.fn();
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {
                    push: windowsPushSpy
                }
            }));

            // Act
            AnalyticsPlugin(context, injectSpy, options);

            // Assert
            expect(windowsPushSpy).toHaveBeenCalledWith({ ...newEvent });
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${CLEAR_EVENTS}`);
        });
    });
});
