import availableFulfilmentTimes from './getAvailableTimes';
import placeOrder from './placeOrder';
import getAddress from './getAddress';
import getBasket from './getBasket';
import getCheckout from './getCheckout';
import getCustomer from './getCustomer';
import getGeoLocation from './getGeoLocation';
import getNotes from './getNotes';
import createGuest from './createGuest';
import updateCheckout from './updateCheckout';

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
