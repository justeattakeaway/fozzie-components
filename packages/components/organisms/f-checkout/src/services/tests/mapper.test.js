import mapUpdateCheckoutRequest from '../mapper';

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
});
