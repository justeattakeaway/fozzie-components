import availableFulfilmentTimes from './payloads/getAvailableTimes';
import placeOrder from './payloads/placeOrder';
import getAddress from './payloads/getAddress';
import getBasket from './payloads/getBasket';
import getCheckout from './payloads/getCheckout';
import getCustomer from './payloads/getCustomer';
import getGeoLocation from './payloads/getGeoLocation';
import getNotes from './payloads/getNotes';
import createGuest from './payloads/createGuest';
import updateCheckout from './payloads/updateCheckout';

export default [
    ...availableFulfilmentTimes,
    ...createGuest,
    ...getAddress,
    ...getBasket,
    ...getCheckout,
    ...getCustomer,
    ...getGeoLocation,
    ...getNotes,
    ...placeOrder,
    ...updateCheckout
];

