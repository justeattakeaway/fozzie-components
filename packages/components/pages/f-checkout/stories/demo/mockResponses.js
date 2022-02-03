import getNotes from './payloads/getNotes';
import placeOrder from './payloads/placeOrder';
import createGuest from './payloads/createGuest';
import availableFulfilmentTimes from './payloads/getAvailableTimes';
import updateCheckout from './payloads/updateCheckout';
import getCheckout from './payloads/getCheckout';
import getBasket from './payloads/getBasket';
import getAddress from './payloads/getAddress';
import getGeoLocation from './payloads/getGeoLocation';
import getCustomer from './payloads/getCustomer';

function buildRequestDefinition (endpoint) {
    const [url, value] = endpoint;

    const response = {
        url: `/${url}`,
        method: value.method,
        responseStatus: value.status,
        payload: value.payload
    };

    return response;
}

export default function () {
    const requests = [];
    Object.entries(placeOrder).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getNotes).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(createGuest).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(availableFulfilmentTimes).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(updateCheckout).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getCheckout).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getBasket).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getAddress).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getGeoLocation).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    Object.entries(getCustomer).forEach(endpoint => requests.push(buildRequestDefinition(endpoint)));
    return requests
}
