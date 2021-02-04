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

    it('should not map address if checkout method is not delivery', () => {
        // Arrange
        const address = {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        };

        const isCheckoutMethodDelivery = false;

        // Act
        const requestBody = mapUpdateCheckoutRequest({
            ...defaultParams,
            address,
            isCheckoutMethodDelivery
        });

        // Assert
        expect(requestBody.fulfilment.location.address).toBeUndefined();
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
