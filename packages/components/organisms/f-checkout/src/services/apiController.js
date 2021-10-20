export default {
    createGuestUser: {
        config: ['tenant', 'otacToAuthExchanger'],
        data: ['emailAddress', 'firstName', 'lastName', 'registrationSource']
    },
    getCheckout: {
    },
    getBasket: {
        config: ['tenant', 'language']
    },
    getAvailableFulfilment: {
    },
    getAddress: {
        config: ['tenant', 'language', 'currentPostcode']
    },
    getCustomer: {
    }
};
