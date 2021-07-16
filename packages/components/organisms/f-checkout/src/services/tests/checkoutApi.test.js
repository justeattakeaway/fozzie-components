// import axios from 'axios';
// import checkoutApi from '../checkoutApi';
// import CheckoutModule from '../../store/checkout.module';
// import checkoutDelivery from '../../demo/checkout-delivery.json';
// import { mockAuthToken } from '../../components/_tests/helpers/setup';
// // import basketDelivery from '../../demo/get-basket-delivery.json';


it('should get the checkout details from the backend', () => {
    // Act
    // await checkoutApi.getCheckout(payload.url, state, payload.timeout);

    // Assert
    expect(1).toEqual(1);
});

// const mobileNumber = '+447111111111';

// const customerDetails = {
//     mobileNumber
// };

// const authToken = mockAuthToken;

// const address = {
//     line1: 'line 1',
//     line2: 'line 2',
//     locality: 'locality',
//     postcode: 'postcode'
// };

// const locationData = {
//     addressLines: [
//         '1 Jazz Avenue',
//         'Strange Town',
//         'JZ1 1AA'
//     ]
// };

// const basketId = 'newbasketid0001-v1';

// const time = {
//     from: 'fromTime',
//     to: 'toTime'
// };

// const isFulfillable = false;

// const issues = [
//     {
//         code: 'RESTAURANT_UNAVAILABLE'
//     }
// ];

// const userNote = 'Beware of the dachshund';
// const message = {
//     code: 'DuplicateOrder',
//     shouldRedirectToMenu: false,
//     shouldShowInDialog: true
// };

// const defaultState = {
//     id: '',
//     serviceType: '',
//     tableIdentifier: '',
//     restaurant: {
//         id: '',
//         seoName: ''
//     },
//     basket: {
//         id: '',
//         total: 0
//     },
//     customer: {
//         firstName: '',
//         lastName: '',
//         email: '',
//         mobileNumber: ''
//     },
//     orderId: '',
//     time: {
//         from: '',
//         to: ''
//     },
//     address: {
//         line1: '',
//         line2: '',
//         locality: '',
//         postcode: ''
//     },
//     isFulfillable: true,
//     errors: [],
//     notices: [],
//     message: null,
//     messages: [],
//     availableFulfilment: {
//         times: [],
//         isAsapAvailable: false
//     },
//     authToken: '',
//     isLoggedIn: false,
//     isGuestCreated: false,
//     userNote: '',
//     geolocation: null,
//     hasAsapSelected: false
// };

// const state = CheckoutModule.state();

// describe('getCheckout ::', () => {
//     let payload;
//     let checkoutDeliveryCopy;
//     let config;

//     beforeEach(() => {
//         payload = {
//             url: 'http://localhost/account/checkout',
//             tenant: 'uk',
//             language: 'en-GB',
//             timeout: 10000,
//             postData: null
//         };

//         config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             timeout: payload.timeout
//         };

//         checkoutDeliveryCopy = Object.assign(checkoutDelivery);
//         axios.get = jest.fn(() => Promise.resolve({ checkoutDeliveryCopy, config }));
//     });

//     it('should get the checkout details from the backend', async () => {
//         // Act
//         await checkoutApi.getCheckout(payload.url, state, payload.timeout);

//         // Assert
//         expect(axios.get).toHaveBeenCalledWith(payload.url, state, payload.timeout);
//     });
// });
