import updateCheckout from './update-checkout.json';
import error from './update-checkout-403.json';
import additionalItemsRequired from './update-checkout-additional-items-required.json';
import geolocationRequired from './update-checkout-geolocation-required.json';
import restaurantNotTakingOrders from './update-checkout-restaurant-not-taking-orders.json';
import serviceTypeUnavailable from './update-checkout-service-type-unavailable.json';
import unavailable from './update-checkout-time-unavailable.json';

export default {
    default: updateCheckout,
    additionalItemsRequired,
    geolocationRequired,
    restaurantNotTakingOrders,
    serviceTypeUnavailable,
    unavailable,
    error
};
