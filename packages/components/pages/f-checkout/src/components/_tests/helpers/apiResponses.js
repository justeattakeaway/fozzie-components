import getCheckoutResponse from '../../../../stories/api/responses/getCheckout/getCheckout';
import getBasketResponse from '../../../../stories/api/responses/getBasket/getBasket';
import { getAvailableTimes } from '../../../../stories/api/responses/getAvailableTimes';
import geoLocationDetailsResponse from '../../../../stories/api/responses/getGeoLocation';
import { getNotesConfig } from '../../../../stories/api/responses/getNotes';
import { CHECKOUT_METHOD_DELIVERY } from '../../../constants';

// getGeoLocation
export const geoLocationDetails = geoLocationDetailsResponse[0].payload;

// getCheckout
export const checkoutDelivery = getCheckoutResponse();

// getBasket
export const basketDelivery = getBasketResponse();
export const basketInvalidProducts = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'invalidProduct');
export const basketOfflineProducts = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'offlineProduct');
export const basketDeliveryAgeRestricted = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'ageRestriction');

// getAvailableTimes
export const checkoutAvailableFulfilment = getAvailableTimes();

// getSplitNotes
export const splitNotesConfig = getNotesConfig(true);
