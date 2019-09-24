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
            const tenantString = null;
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
            const tenantString = null;
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
});
