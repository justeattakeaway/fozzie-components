import * as tenant from '../es-ES';
import Service from '../../services/core';

describe('Tenant: `es-ES`', () => {
    describe('service', () => {
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

        it('should have location services enabled', () => {
            // Arrange
            const service = Service(tenant.default.service);

            // Act
            service.clientInit();

            // Assert
            expect(service.isAutocompleteEnabled).toEqual(true);
        });

        describe('`preSearchValidation`', () => {
            it('should exist', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                service.clientInit();

                // Assert
                expect(service.options.preSearchValidation).toBeDefined();
            });

            it('should have an object defined with `ADD_STREET` property', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                service.clientInit();

                // Assert
                expect(service.options.preSearchValidation).toHaveProperty('ADD_STREET');
            });

            it('should have `ES` as its autocomplete country code', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                service.clientInit();

                // Assert
                expect(service.options.autocomplete).toEqual('ES');
            });
        });
    });
});
