import * as tenant from '../da-DK';
import Service from '../../services/core';

describe('Tenant: `da-DK`', () => {
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

            it('should return errors for non-numeric address', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid('abc');

                // Assert
                expect(result).toContain('ADDRESS_INVALID');
            });

            it('should return errors when address longer than 4 characters', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid('123456');

                // Assert
                expect(result).toContain('ADDRESS_LONG');
            });
        });

        describe('when the address is valid', () => {
            it('should return true when address valid', () => {
                // Arrange
                const service = Service(tenant.default.service);

                // Act
                const result = service.isValid(1234);

                // Assert
                expect(result).toEqual(true);
            });
        });
    });
});
