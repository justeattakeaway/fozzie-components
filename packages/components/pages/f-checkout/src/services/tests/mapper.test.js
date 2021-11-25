import {
    getAnalyticsErrorCodeByApiErrorCode,
    mapAnalyticsName,
    mapAnalyticsNames,
    mapUpdateCheckoutRequest
} from '../mapper';

const defaultParams = {
    address: {},
    customer: {},
    isCheckoutMethodDelivery: true,
    time: {},
    userNote: '',
    geolocation: null,
    asap: false
};

const address = {
    line1: '1 Bristol Road',
    line2: 'Flat 1',
    locality: 'Bristol',
    postcode: 'BS1 1AA'
};

describe('checkout mapper', () => {
    it('should map customer details correctly', () => {
        // Arrange
        const customer = {
            firstName: 'Test',
            lastName: 'Tester',
            mobileNumber: '07890123456',
            dateOfBirth: new Date(2020, 7, 5)
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
        expect(customerRequest.dateOfBirth).toBe(customer.dateOfBirth);
    });

    it('should map address correctly', () => {
        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            address
        });

        const locationRequest = requestBody[1].value.location;

        // Assert
        expect(locationRequest.address.postalCode).toBe(address.postcode);
        expect(locationRequest.address.locality).toBe(address.locality);
        expect(locationRequest.address.lines).toStrictEqual([
            address.line1,
            address.line2
        ]);
    });

    it('should not map the second line of the address when it\'s not provided', () => {
        // Act
        const oneLineAddress = {
            line1: '1 Bristol Road',
            locality: 'Bristol',
            postcode: 'BS1 1AA'
        };

        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            address: oneLineAddress
        });

        const locationRequest = requestBody[1].value.location;

        // Assert
        expect(locationRequest.address.postalCode).toBe(address.postcode);
        expect(locationRequest.address.locality).toBe(address.locality);
        expect(locationRequest.address.lines).toStrictEqual([
            address.line1
        ]);
    });

    it('should map the address correctly and remove any unnecessary whitespace from postcode', () => {
        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            address: {
                ...address,
                postcode: ' BS1 1AA '
            }
        });

        const locationRequest = requestBody[1].value.location;

        // Assert
        expect(locationRequest.address.postalCode).toBe(address.postcode);
        expect(locationRequest.address.locality).toBe(address.locality);
        expect(locationRequest.address.lines).toStrictEqual([
            address.line1,
            address.line2
        ]);
    });

    it('should map time correctly', () => {
        // Arrange
        const time = {
            from: '2021-01-01T01:00:00+0000',
            to: '2021-01-01T01:00:00+0000'
        };

        const expectOutput = {
            asap: false,
            scheduled: {
                ...time
            }
        };

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            time,
            asap: false
        });

        const timeRequest = requestBody[1].value.time;

        // Assert
        expect(timeRequest).toStrictEqual(expectOutput);
    });

    describe('when checkout method is not delivery', () => {
        const isCheckoutMethodDelivery = false;

        it('should not map the address', () => {
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

    describe('when checkout method is dine in', () => {
        const isCheckoutMethodDelivery = false;
        const isCheckoutMethodDineIn = true;

        it('should map the table identifier', () => {
            // Act
            const requestBody = mapUpdateCheckoutRequest({
                ...defaultParams,
                address,
                isCheckoutMethodDelivery,
                isCheckoutMethodDineIn,
                tableIdentifier: '10'
            });

            const tableRequest = requestBody[1].value.table;

            // Assert
            expect(tableRequest.identifier).toBe('10');
        });
    });
});

describe('mapAnalyticsName :: ', () => {
    describe('mapAnalyticsName :: ', () => {
        it.each([
            ['address.line1', 'addressLine1'],
            ['line1', 'addressLine1'],
            ['address.line2', 'addressLine2'],
            ['line2', 'addressLine2'],
            ['address.locality', 'addressLocality'],
            ['locality', 'addressLocality'],
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
            'locality'
        ];

        const expected = 'addressLine1,addressLocality,email,firstName,lastName,mobilePhone';

        // Act & Assert
        expect(mapAnalyticsNames(provided)).toEqual(expected);
    });
});

describe('getAnalyticsErrorCodeByApiErrorCode :: ', () => {
    it.each([
        ['ITEMS_UNORDERABLE', 'basketNotOrderable'],
        ['LAST_NAME_REQUIRED', 'invalidModelState'],
        ['FULFILMENT_TIME_REQUIRED', 'setOrderTime']
    ])('should correctly map %s to %s', (code, expected) => {
        // Arrange
        const error = {
            code
        };

        // Act & Assert
        expect(getAnalyticsErrorCodeByApiErrorCode(error)).toEqual(expected);
    });
});
