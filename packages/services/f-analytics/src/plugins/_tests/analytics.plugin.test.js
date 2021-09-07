import { when } from 'jest-when';
import Cookies from 'universal-cookie';
import AnalyticsPlugin from '../analytics.plugin';
import AnalyticService from '../../services/analytics.service';
import defaultOptions from '../../defaultOptions';
import {
    defaultState,
    newEvent,
    options
} from '../../tests/helpers/setup';
import {
    UPDATE_PLATFORM_DATA,
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

    describe('When registering the store module', () => {
        let registerStoreModuleSpy;
        let context;
        let state;

        beforeEach(() => {
            // Arrange - store
            state = [`${options.namespace}`];
            state[`${options.namespace}`] = { ...defaultState };
            // Arrange - window state
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {
                    push: jest.fn()
                }
            }));
        });

        it('should register the module if not already registered', () => {
            // Arrange - store
            registerStoreModuleSpy = jest.fn(() => true);
            context = {
                store: {
                    state,
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => false),
                    registerModule: registerStoreModuleSpy
                },
                req: jest.fn(),
                res: jest.fn()
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalledWith(options.namespace, expect.anything());
        });

        it('should not register the module if already registered', () => {
            // Arrange - store
            registerStoreModuleSpy = jest.fn(() => true);
            context = {
                store: {
                    state,
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => true),
                    registerModule: registerStoreModuleSpy
                },
                req: jest.fn(),
                res: jest.fn()
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(registerStoreModuleSpy).not.toHaveBeenCalled();
        });
    });

    describe('When preparing the page with GTM Tags', () => {
        let context;
        let state;

        beforeEach(() => {
            // Arrange - store
            state = [`${options.namespace}`];
            state[`${options.namespace}`] = { ...defaultState };
            context = {
                store: {
                    state,
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => true)
                },
                req: jest.fn(),
                res: jest.fn()
            };
            // Arrange - window state
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: undefined
            }));
        });

        it('should append the tags if not already present', () => {
            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${options.id}`);
            expect(document.head.innerHTML).toContain('function (w, d, s, l, i)');
            expect(document.head.innerHTML).toContain(`(window, document, 'script', 'dataLayer', '${options.id}');`);
        });

        it('should append the querystring within tags if options supplied', () => {
            // Arrange - options
            const currentRegisteredGtmIdOptions = {
                ...options,
                auth: 'someAuthKey',
                preview: 'somePreviewFlag',
                cookiesWin: 'someCookieName'
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), currentRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${currentRegisteredGtmIdOptions.id}` +
            `&amp;gtm_auth=${currentRegisteredGtmIdOptions.auth}` +
            `&amp;gtm_preview=${currentRegisteredGtmIdOptions.preview}` +
            `&amp;gtm_cookies_win=${currentRegisteredGtmIdOptions.cookiesWin}`);
        });

        it('should not attempt to re-append the tags if already present', () => {
            // Arrange - window state
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {
                    push: jest.fn()
                }
            }));
            // Arrange - options
            const newRegisteredGtmIdOptions = { ...options, id: 'GTM-9999999' };

            // Act
            AnalyticsPlugin(context, jest.fn(), newRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).not.toContain(`https://www.googletagmanager.com/gtm.js?id=${newRegisteredGtmIdOptions.id}`);
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${options.id}`);
        });
    });

    describe('When mapping the serverside analytics', () => {
        let context;
        let storeDispatchSpy;
        let state;
        let store;
        let req;
        let get;

        beforeEach(() => {
            // Arrange - store
            state = [`${options.namespace}`];
            state[`${options.namespace}`] = { ...defaultState };
            storeDispatchSpy = jest.fn();
            store = {
                state,
                dispatch: storeDispatchSpy,
                hasModule: jest.fn(() => true)
            };
            // Arrange - cookies
            get = jest.fn();
            when(get).calledWith('je-user_percentage').mockReturnValue('35');
            Cookies.mockImplementation(() => ({ get }));
            // Arrange - context
            context = {
                store,
                req
            };
            // Arrange - window state
            jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
        });

        it('should not attempt set the serverside only platformData properties if clientside', () => {
            // Arrange - window state
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow
            }));

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).not.toHaveBeenCalledWith(`${options.namespace}/${UPDATE_PLATFORM_DATA}`, expect.anything());
        });

        it('should leave the platformData properties with defaults if data not available and serverside', () => {
            // Arrange
            get = jest.fn();
            const expected = { ...defaultState.platformData };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/${UPDATE_PLATFORM_DATA}`, expected);
        });

        it('should set the platformData properties with data if available and serverside', () => {
            // Arrange
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            const expected = {
                ...defaultState.platformData,
                environment: process.env.justEatEnvironment,
                version: process.env.FEATURE_VERSION,
                instancePosition: process.env.INSTANCE_POSITION,
                jeUserPercentage: '35'
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/${UPDATE_PLATFORM_DATA}`, expected);
        });
    });
});
