import * as tenant from '../en-IE';
import Service from '../../services/core';

describe('Tenant: `en-IE`', () => {
    describe('service', () => {
        describe('when address is invalid', () => {
            it('should return errors for empty address', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid();

                // Assert
                expect(result).toContain('ADDRESS_EMPTY');
            });

            it('should return errors for empty string address', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid('     ');

                // Assert
                expect(result).toContain('ADDRESS_EMPTY');
            });
        });

        describe('when address is valid', () => {
            it('should return `true` for populated addresses', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid('Some Address');

                // Assert
                expect(result).toEqual(true);
            });
        });

        it('should have autocomplete enabled', () => {
            // Arrange
            const service = Service(tenant.default.service);

            // Act
            service.clientInit();

            // Assert
            expect(service.isAutocompleteEnabled).toEqual(true);
        });

        it('should use Google Places autocomplete with country code', () => {
            // Arrange
            const service = Service(tenant.default.service);

            // Assert
            expect(service.options.autocomplete).toEqual('IE');
        });
    });
});
