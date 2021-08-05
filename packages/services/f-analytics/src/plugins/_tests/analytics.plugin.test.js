import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import AnalyticsPlugin from '@/plugins/analytics.plugin';
import AnalyticService from '@/plugins/lib/analytics.service';
import {
    createStore
} from '../../tests/helpers/setup';

createLocalVue().use(Vuex);
const options = { namespace: 'f-analytics', id: 'GTM-0000000' };
const defaults = require('../defaults');

describe('When registering the store module', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('When creating the plugin', () => {
        let storeModuleSpy;
        let context;
        let inject;
        let defaultStore;

        beforeEach(() => {
            // Arrange
            defaultStore = createStore();
            context = { store: defaultStore };

            // Mocks
            inject = jest.fn(() => {});
            window.dataLayer = undefined;
            storeModuleSpy = jest.spyOn(defaultStore, 'hasModule').mockReturnValue(true);
        });

        it('should use default options if no options supplied', () => {
            // Act
            AnalyticsPlugin(context, inject, null);

            // Assert that all the default options where used
            expect(storeModuleSpy).toHaveBeenCalledWith(defaults.namespace);
            expect(document.head.innerHTML).toContain(`${defaults.id}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.auth}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.preview}`);
            expect(document.head.innerHTML).not.toContain(`${defaults.cookiesWin}`);
            expect(inject).toHaveBeenCalledWith(defaults.globalVarName, expect.anything());
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
            AnalyticsPlugin(context, inject, partialOptions);

            // Assert
            expect(storeModuleSpy).toHaveBeenCalledWith(partialOptions.namespace);
            expect(document.head.innerHTML).toContain(`${partialOptions.id}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.auth}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.preview}`);
            expect(document.head.innerHTML).toContain(`${partialOptions.cookiesWin}`);
            expect(inject).toHaveBeenCalledWith(defaults.globalVarName, expect.anything()); // Default used because no option supplied
        });

        it('should inject the global object', () => {
            // Arrange
            const incGlobalVarNameOptions = { ...options, globalVarName: 'jazz' };
            const expected = new AnalyticService(defaultStore, incGlobalVarNameOptions);

            // Act
            AnalyticsPlugin(context, inject, incGlobalVarNameOptions);

            // Assert
            expect(inject).toHaveBeenCalledWith(incGlobalVarNameOptions.globalVarName, expected);
        });
    });

    describe('When registering the store module', () => {
        let registerStoreModuleSpy;
        let context;
        let inject;
        let defaultStore;

        beforeEach(() => {
            // Arrange
            defaultStore = createStore();
            context = { store: defaultStore };

            // Mocks
            inject = jest.fn(() => {});
            window.dataLayer = jest.fn(() => {});
            registerStoreModuleSpy = jest.spyOn(defaultStore, 'registerModule').mockReturnValue(true);
        });

        it('should register the module if not already registered', () => {
            // Arrange
            jest.spyOn(defaultStore, 'hasModule').mockReturnValue(false);

            // Act
            AnalyticsPlugin(context, inject, options);

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalledWith(options.namespace, expect.anything());
        });

        it('should not register the module if already registered', () => {
            // Arrange
            jest.spyOn(defaultStore, 'hasModule').mockReturnValue(true);

            // Act
            AnalyticsPlugin(context, inject, options);

            // Assert
            expect(registerStoreModuleSpy).not.toHaveBeenCalled();
        });
    });

    describe('When preparing the page with GTM Tags', () => {
        let context;
        let inject;
        let defaultStore;

        beforeEach(() => {
            // Arrange
            defaultStore = createStore();
            context = { store: defaultStore };
            window.dataLayer = undefined;

            // Mockss
            inject = jest.fn(() => {});
            jest.spyOn(defaultStore, 'hasModule').mockReturnValue(true);
        });

        it('should append the tags if not already present', () => {
            // Act
            AnalyticsPlugin(context, inject, options);

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
            AnalyticsPlugin(context, inject, currentRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${currentRegisteredGtmIdOptions.id}` +
            `&amp;gtm_auth=${currentRegisteredGtmIdOptions.auth}` +
            `&amp;gtm_preview=${currentRegisteredGtmIdOptions.preview}` +
            `&amp;gtm_cookies_win=${currentRegisteredGtmIdOptions.cookiesWin}`);
        });

        it('should not attempt to re-append the tags if already present', () => {
            // Arrange
            window.dataLayer = {}; // Simulates already present
            const newRegisteredGtmIdOptions = { ...options, id: 'GTM-9999999' };


            // Act
            AnalyticsPlugin(context, inject, newRegisteredGtmIdOptions);

            // Assert
            expect(document.head.innerHTML).not.toContain(`https://www.googletagmanager.com/gtm.js?id=${newRegisteredGtmIdOptions.id}`);
            expect(document.head.innerHTML).toContain(`https://www.googletagmanager.com/gtm.js?id=${options.id}`);
        });
    });
});
