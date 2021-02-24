import { mapUpdateCheckoutRequest, mapAnalyticsFieldNames } from '../mapper';

const defaultParams = {
    address: {},
    customer: {},
    isCheckoutMethodDelivery: true,
    time: {},
    userNote: ''
};

describe('checkout mapper', () => {
    it('should map customer details correctly', () => {
        // Arrange
        const customer = {
            firstName: 'Test',
            lastName: 'Tester',
            mobileNumber: '07890123456'
        };

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            customer
        });

        // Assert
        expect(requestBody.customer.firstName).toBe(customer.firstName);
        expect(requestBody.customer.lastName).toBe(customer.lastName);
        expect(requestBody.customer.phoneNumber).toBe(customer.mobileNumber);
        expect(requestBody.customer.dateOfBirth).toBe(null);
    });

    it('should map address correctly', () => {
        // Arrange
        const address = {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        };

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            address
        });

        // Assert
        expect(requestBody.fulfilment.location.address.postalCode).toBe(address.postcode);
        expect(requestBody.fulfilment.location.address.lines).toStrictEqual([
            address.line1,
            address.line2,
            '',
            address.city,
            ''
        ]);
    });

    describe('when checkout method is not delivery', () => {
        const isCheckoutMethodDelivery = false;

        it('should not map the address', () => {
            // Arrange
            const address = {
                line1: '1 Bristol Road',
                line2: 'Flat 1',
                city: 'Bristol',
                postcode: 'BS1 1AA'
            };

            // Act
            const requestBody = mapUpdateCheckoutRequest({
                ...defaultParams,
                address,
                isCheckoutMethodDelivery
            });

            // Assert
            expect(requestBody.fulfilment.location.address).toBeUndefined();
        });
    });

    it('should map user note correctly', () => {
        // Arrange
        const userNote = 'Beware of the dachshund';

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            userNote
        });

        // Assert
        expect(requestBody.notes.length).toBe(1);
        expect(requestBody.notes[0].note).toBe(userNote);
    });
});

describe('mapAnalyticsFieldNames :: ', () => {
    it.each([
        ['address.line1', 'addressLine1'],
        ['line1', 'addressLine1'],
        ['address.line2', 'addressLine2'],
        ['line2', 'addressLine2'],
        ['address.city', 'addressCity'],
        ['city', 'addressCity'],
        ['address.postcode', 'addressPostcode'],
        ['postcode', 'addressPostcode'],
        ['customer.firstName', 'firstName'],
        ['customer.lastName', 'lastName'],
        ['customer.mobileNumber', 'phone'],
        ['mobileNumber', 'phone'],
        ['customer.email', 'email']
    ])('should map the fieldname %s to the analytics value %s', (provided, expected) => {
        // Act & Assert
        expect(mapAnalyticsFieldNames(provided)).toEqual(expected);
    });

    it('should correctly map an array of field names and sort alphabetically', () => {
        // Arrange
        const provided = [
            'city',
            'address.line1',
            'customer.email',
            'customer.firstName',
            'lastName',
            'mobilePhone'
        ];

        const expected = [
            'addressCity',
            'addressLine1',
            'email',
            'firstName',
            'lastName',
            'mobilePhone'
        ];

        // Act & Assert
        expect(mapAnalyticsFieldNames(provided)).toEqual(expected);
    });

    it('should sort corrected field names alphabetically', () => {
        // Arrange
        const provided = [
            'mobilePhone',
            'address.line1',
            'customer.firstName',
            'lastName',
            'customer.email',
            'city'
        ];

        const expected = [
            'addressCity',
            'addressLine1',
            'email',
            'firstName',
            'lastName',
            'mobilePhone'
        ];

        // Act & Assert
        expect(mapAnalyticsFieldNames(provided)).toEqual(expected);
    });
});
