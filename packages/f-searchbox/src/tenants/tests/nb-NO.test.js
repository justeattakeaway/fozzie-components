import * as tenant from '../nb-NO';
import Service from '../../services/core';

describe('Tenant: `nb-NO`', () => {
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
