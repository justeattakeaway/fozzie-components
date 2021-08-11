import AnalyticsPlugin from '@/plugins/analytics.plugin';
import AnalyticService from '@/plugins/lib/analytics.service';
import {
    defaultState,
    options
} from '../../tests/helpers/setup';
import {
    PUSH_PLATFORM_DATA,
    PUSH_EVENT
} from '../../store/mutation-types';

const defaults = require('../defaults');

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

        beforeEach(() => {
            // Arrange
            storeDispatchSpy = jest.fn();
            storeModuleSpy = jest.fn(() => true);
            defaultStore = {
                dispatch: storeDispatchSpy,
                hasModule: storeModuleSpy
            };
            context = { store: defaultStore, req: jest.fn() };
            injectSpy = jest.fn(() => {});
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
            expect(storeModuleSpy).toHaveBeenCalledWith(defaults.namespace);
            expect(document.head.innerHTML).toContain(`${defaults.id}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.auth}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.preview}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.cookiesWin}`);
            expect(injectSpy).toHaveBeenCalledWith(defaults.globalVarName, expect.anything());
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
            expect(injectSpy).toHaveBeenCalledWith(defaults.globalVarName, expect.anything()); // Default used because no option supplied
        });

        it('should inject the global object', () => {
            // Arrange
            const incGlobalVarNameOptions = { ...options, globalVarName: 'jazz' };
            const expected = new AnalyticService(defaultStore, context.req, incGlobalVarNameOptions);

            // Act
            AnalyticsPlugin(context, injectSpy, incGlobalVarNameOptions);

            // Assert
            expect(injectSpy).toHaveBeenCalledWith(incGlobalVarNameOptions.globalVarName, expected);
        });

        it('should flush any stored events', () => {
            // Act
            AnalyticsPlugin(context, injectSpy, options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenLastCalledWith(`${options.namespace}/${PUSH_EVENT}`);
        });
    });

    describe('When registering the store module', () => {
        let registerStoreModuleSpy;
        let context;

        beforeEach(() => {
            // Arrange
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {}
            }));
        });

        it('should register the module if not already registered', () => {
            // Arrange
            registerStoreModuleSpy = jest.fn(() => true);
            context = {
                store: {
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => false),
                    registerModule: registerStoreModuleSpy
                },
                req: jest.fn()
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalledWith(options.namespace, expect.anything());
        });

        it('should not register the module if already registered', () => {
            // Arrange
            registerStoreModuleSpy = jest.fn(() => true);
            context = {
                store: {
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => true),
                    registerModule: registerStoreModuleSpy
                },
                req: jest.fn()
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(registerStoreModuleSpy).not.toHaveBeenCalled();
        });
    });

    describe('When preparing the page with GTM Tags', () => {
        let context;

        beforeEach(() => {
            // Arrange
            context = {
                store: {
                    dispatch: jest.fn(),
                    hasModule: jest.fn(() => true)
                },
                req: jest.fn()
            };
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
            // Arrange
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
            // Arrange
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                dataLayer: {}
            }));
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

        beforeEach(() => {
            // Arrange
            state = [`${options.namespace}`];
            state[`${options.namespace}`] = { platformData: defaultState };
            storeDispatchSpy = jest.fn();
            context = {
                store: {
                    state,
                    dispatch: storeDispatchSpy,
                    hasModule: jest.fn(() => true)
                },
                req: {
                    headers: {
                        cookie: 'je-user_percentage=35'
                    }
                }
            };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
        });

        it('should not attempt set the serverside only platformData properties if clientside', () => {
            // Arrange
            const originalWindow = { ...window };
            jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow
            }));

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).not.toHaveBeenCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expect.anything());
        });

        it('should leave the platformData environment properties with appropriate defaults if values not available and serverside', () => {
            // Arrange
            const expected = { ...defaultState, jeUserPercentage: '35' };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expected);
        });

        it('should leave the platformData jeUserPercentage property with default if not available and serverside', () => {
            // Arrange
            const ctx = {
                ...context,
                req: {
                    headers: {
                        cookie: undefined
                    }
                }
            };
            const expected = defaultState;

            // Act
            AnalyticsPlugin(ctx, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expected);
        });

        it('should set the platformData properties with appropriate values if available and serverside', () => {
            // Arrange
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            const expected = {
                ...defaultState,
                environment: process.env.justEatEnvironment,
                version: process.env.FEATURE_VERSION,
                instancePosition: process.env.INSTANCE_POSITION,
                jeUserPercentage: '35'
            };

            // Act
            AnalyticsPlugin(context, jest.fn(), options);

            // Assert
            expect(storeDispatchSpy).toHaveBeenCalledWith(`${options.namespace}/${PUSH_PLATFORM_DATA}`, expected);
        });
    });
});
