const mapCheckoutRequest = ({
    address,
    customer = {},
    isCheckoutMethodDelivery,
    time,
    userNote
}) => ({
    customer: {
        firstName: customer.firstName || null,
        lastName: customer.lastName || null,
        phoneNumber: customer.mobileNumber || null,
        dateOfBirth: null
    },
    fulfilment: {
        time,
        location: {
            ...(isCheckoutMethodDelivery ? {
                address: {
                    lines: [
                        address.line1 || '',
                        address.line2 || '',
                        '',
                        address.city || '',
                        ''
                    ],
                    postalCode: address.postcode || null
                }
            } : {}),
            geolocation: null
        }
    },
    notes: [
        {
            type: 'delivery',
            note: userNote
        }
    ]
});

export default mapCheckoutRequest;
