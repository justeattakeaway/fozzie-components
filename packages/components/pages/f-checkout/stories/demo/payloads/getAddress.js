import { httpMethods, httpStatusCodes } from '../../helpers';

function getAddress () {
    return {
        Addresses: [
            {
                City: 'London',
                ZipCode: 'EC4M 7RF',
                AddressName: 'EC4M 7RF',
                IsDefault: true,
                Line1: 'Fleet Place House',
                Line2: 'Farringdon',
                Line3: null
            },
            {
                City: 'Area 51',
                ZipCode: 'AR51 7AR',
                AddressName: 'AR51 7AR',
                IsDefault: false,
                Line1: 'Test St 1',
                Line2: 'Test House',
                Line3: null
            }
        ]
    };
}

export default [
    {
        url: '/get-address',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getAddress()
    }
];
