import * as tenant from '../en-GB';
import Service from '../../services/core';

describe('Tenant: `en-GB`', () => {
    describe('service', () => {
        let service;

        beforeEach(() => {
            service = Service(tenant.default.service);
        });

        it('should return errors for empty postcodes', () => {
            // Act
            const result = service.isValid();

            // Assert
            expect(result).toContain('POSTCODE_EMPTY');
        });

        it('should not return POSTCODE_INVALID when postcode is empty', () => {
            // Act
            const result = service.isValid();

            // Assert
            expect(result).not.toContain('POSTCODE_INVALID');
        });

        it('should return errors for empty string postcodes', () => {
            // Act
            const result = service.isValid('     ');

            // Assert
            expect(result).toContain('POSTCODE_EMPTY');
        });

        it('should return errors for invalid postcodes', () => {
            // Act
            const result = service.isValid('xyzabc');

            // Assert
            expect(result).toContain('POSTCODE_INVALID');
        });

        it('should return errors for postcodes longer than 7 characters, without spaces', () => {
            // Act
            const result = service.isValid('SW1A1AABSW1A1AAB');

            // Assert
            expect(result).toContain('POSTCODE_INVALID');
        });

        it('should return errors for postcodes longer than 8 characters, with spaces', () => {
            // Act
            const result = service.isValid('SW13 43HH');

            // Assert
            expect(result).toContain('POSTCODE_INVALID');
        });

        it('should return `true` for valid postcodes', () => {
            // Act
            const result = service.isValid('EC1A 1BB');

            // Assert
            expect(result).toEqual(true);
        });

        it('should return `true` for valid postcodes with no spaces', () => {
            // Act
            const result = service.isValid('BS14DJ');

            // Assert
            expect(result).toEqual(true);
        });

        it('should return `true` for postcodes with spaces in between characters', () => {
            // Act
            const result = service.isValid('WD6   1JN');

            // Assert
            expect(result).toEqual(true);
        });
    });
});
