import { throttle } from 'lodash-es';
import sharedServices from '../shared.service';

describe('sharedServices', () => {
    describe('getLocale', () => {
        it('returns "en-GB" if tenantConfigs does NOT contain the locale from tenantString', () => {
            // Arrange
            const tenantConfigs = {
                'da-DK': 'dk'
            };
            const tenantString = 'it-IT';
            const globalTenant = {
                locale: 'da-DK'
            };

            // Act
            const result = sharedServices.getLocale(tenantConfigs, tenantString, globalTenant);

            // Assert
            expect(result).toBe('en-GB');
        });

        it('returns "en-GB" if tenantConfigs does NOT contain the locale from tenantString or globalTenant', () => {
            // Arrange
            const tenantConfigs = {
                'da-DK': 'dk'
            };
            const tenantString = '';
            const globalTenant = {
                locale: 'it-IT'
            };

            // Act
            const result = sharedServices.getLocale(tenantConfigs, tenantString, globalTenant);

            // Assert
            expect(result).toBe('en-GB');
        });

        it('returns the correct locale if tenantConfigs does contain the locale from tenantString', () => {
            // Arrange
            const tenantConfigs = {
                'da-DK': 'dk'
            };
            const tenantString = 'da-DK';
            const globalTenant = {
                locale: 'it-IT'
            };

            // Act
            const result = sharedServices.getLocale(tenantConfigs, tenantString, globalTenant);

            // Assert
            expect(result).toBe('da-DK');
        });

        it('returns the correct locale if tenantConfigs does NOT contain the locale from tenantString but DOES from globalTenant', () => {
            // Arrange
            const tenantConfigs = {
                'da-DK': 'dk'
            };
            const tenantString = '';
            const globalTenant = {
                locale: 'da-DK'
            };

            // Act
            const result = sharedServices.getLocale(tenantConfigs, tenantString, globalTenant);

            // Assert
            expect(result).toBe('da-DK');
        });
    });

    describe('getTheme', () => {
        it('returns "ml" if locale is "en-AU"', () => {
            // Arrange
            const locale = 'en-AU';

            // Act
            const result = sharedServices.getTheme(locale);

            // Assert
            expect(result).toBe('ml');
        });

        it('returns "ml" for Menu Log theme if locale is "en-NZ"', () => {
            // Arrange
            const locale = 'en-NZ';

            // Act
            const result = sharedServices.getTheme(locale);

            // Assert
            expect(result).toBe('ml');
        });

        it('returns "je" for Just Eat theme if locale is NOT "en-NZ"', () => {
            // Arrange
            const locale = 'en-GB';

            // Act
            const result = sharedServices.getTheme(locale);

            // Assert
            expect(result).toBe('je');
        });
    });

    const windowWidth = 667;
    const windowHeight = 375;
    const resizeWindow = (x, y) => {
        window.innerWidth = x;
        window.innerHeight = y;
        window.dispatchEvent(new Event('resize'));
    };

    describe('getWindowWidth', () => {
        it('returns a float of the window width', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = window.innerWidth;

            // Assert
            expect(result).toBe(667);
        });
    });

    describe('getWindowHeight', () => {
        it('returns a float of the window height', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = window.innerHeight;

            // Assert
            expect(result).toBe(375);
        });
    });

    describe('addEvent', () => {
        const eventName = 'resize';
        const callBackFunction = jest.fn();

        it('returns the correct event to be listened to WITHOUT being throttled', () => {
            // Arrange
            const throttleTime = 0;

            // Act
            sharedServices.addEvent(eventName, callBackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).toHaveBeenCalled();
        });

        it('returns the correct event to be listened to being throttled', () => {
            // Arrange
            const throttleTime = 10;

            // Act
            sharedServices.addEvent(eventName, callBackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).toHaveBeenCalled();
        });
    });

    describe('removeEvent', () => {
        it('removes given event listener', () => {
            // Arrange
            const eventName = 'resize';
            const callBackFunction = jest.fn();

            // Act
            sharedServices.removeEvent(eventName, callBackFunction);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).not.toHaveBeenCalled();
        });
    });
});
