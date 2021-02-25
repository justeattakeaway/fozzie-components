const mapUpdateCheckoutRequest = ({
    address,
    customer = {},
    isCheckoutMethodDelivery,
    time,
    userNote
}) => ([
    {
        op: 'add',
        path: '/customer',
        value: {
            firstName: customer.firstName || null,
            lastName: customer.lastName || null,
            phoneNumber: customer.mobileNumber || null,
            dateOfBirth: null
        }
    },
    {
        op: 'add',
        path: '/fulfilment',
        value: {
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
        }
    },
    {
        op: 'add',
        path: '/notes',
        value: [
            {
                type: 'delivery',
                note: userNote
            }
        ]
    }
]);

export default mapUpdateCheckoutRequest;
