import { mapUpdateCheckoutRequest, mapAnalyticsName, mapAnalyticsNames } from '../mapper';

const defaultParams = {
    address: {},
    customer: {},
    isCheckoutMethodDelivery: true,
    time: {},
    userNote: '',
    geolocation: null
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

        const customerRequest = requestBody[0].value;

        // Assert
        expect(customerRequest.firstName).toBe(customer.firstName);
        expect(customerRequest.lastName).toBe(customer.lastName);
        expect(customerRequest.phoneNumber).toBe(customer.mobileNumber);
        expect(customerRequest.dateOfBirth).toBe(null);
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

        const locationRequest = requestBody[1].value.location;

        // Assert
        expect(locationRequest.address.postalCode).toBe(address.postcode);
        expect(locationRequest.address.lines).toStrictEqual([
            address.line1,
            address.line2,
            '',
            address.city,
            ''
        ]);
    });

    it('should map time correctly', () => {
        // Arrange
        const time = {
            from: '2021-01-01T01:00:00+0000',
            to: '2021-01-01T01:00:00+0000'
        };

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            time
        });

        const timeRequest = requestBody[1].value.time;

        // Assert
        expect(timeRequest).toBe(time);
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

            const locationRequest = requestBody[1].value.location;

            // Assert
            expect(locationRequest.address).toBeUndefined();
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

        const notesRequest = requestBody[2].value;

        // Assert
        expect(notesRequest.length).toBe(1);
        expect(notesRequest[0].note).toBe(userNote);
    });

    it('should map geo location correctly', () => {
        // Arrange
        const geolocation = {
            latitude: 1.234,
            longitude: 50.234
        };

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            geolocation
        });

        const geolocationRequest = requestBody[1].value.location.geolocation;

        // Assert
        expect(geolocationRequest).toBe(geolocation);
    });
});

describe('mapAnalyticsName :: ', () => {
    describe('mapAnalyticsName :: ', () => {
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
            expect(mapAnalyticsName(provided)).toEqual(expected);
        });
    });
});

describe('mapAnalyticsNames :: ', () => {
    it('should correctly map an array of field names and sort alphabetically', () => {
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
        expect(mapAnalyticsNames(provided)).toEqual(expected);
    });
});
