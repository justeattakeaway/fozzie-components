import * as tenant from '../it-IT';
import Service from '../../services/core';

describe('Tenant: `it-IT`', () => {
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

        it('should have location services enabled', () => {
            // Arrange
            const service = Service(tenant.default.service);

            // Act
            service.clientInit();

            // Assert
            expect(service.isAutocompleteEnabled).toEqual(true);
        });

        it('should have `IT` as its autocomplete country code', () => {
            // Arrange
            const service = Service(tenant.default.service);

            // Act
            service.clientInit();

            // Assert
            expect(service.options.autocomplete).toEqual('IT');
        });
    });
});
