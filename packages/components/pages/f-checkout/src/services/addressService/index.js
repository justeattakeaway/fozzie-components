import uk from './tenants/uk';
import au from './tenants/au';
import nz from './tenants/nz';
import ie from './tenants/ie';
import it from './tenants/it';
import es from './tenants/es';

const tenants = {
    uk,
    au,
    nz,
    es,
    it,
    ie
};

const localStorageStoredLocationKey = 'je-full-address-details';

function toFormattedPostcode (postcode, tenant) {
    const shouldFormatPostCode = tenant === 'uk';

    if (!postcode) {
        return '';
    }

    if (!shouldFormatPostCode) {
        return postcode;
    }

    return tenants[tenant].toFormattedPostcode(postcode);
}

function formatAddressLines (address) {
    let addressLines;

    if (address.lines) {
        addressLines = {
            line1: address.lines[0],
            ...(address.lines[1] && { line2: address.lines[1] }),
            ...(address.lines[2] && { line3: address.lines[2] }),
            ...(address.lines[3] && { line4: address.lines[3] })
        };
    } else {
        addressLines = {
            line1: address.Line1,
            ...(address.Line2 && { line2: address.Line2 }),
            ...(address.Line3 && { line3: address.Line3 }),
            ...(address.Line4 && { line4: address.Line4 })
        };
    }

    return {
        ...address,
        ...addressLines
    };
}

function getDefaultAddress (addressData, tenant) {
    const addresses = addressData.Addresses;

    return !addresses ? null : addresses.find(address => {
        if (tenant === 'uk') {
            return address && address.IsDefault;
        }

        const defaultAddressId = addressData.DefaultAddress;

        return address.AddressId === defaultAddressId;
    });
}

function getAddressClosestToPostcode (currentPostcode, addressData, tenant) {
    const addresses = addressData.Addresses;

    let postcode = toFormattedPostcode(currentPostcode, tenant);
    let address;

    if (addresses) {
        address = addresses.find(a => {
            const addressPostcode = toFormattedPostcode(a.ZipCode, tenant);

            return addressPostcode === postcode;
        });
    }

    if (tenants[tenant].isFullPostCode(postcode)) {
        postcode = postcode.slice(0, postcode.length - 3);
    }

    return address || addresses?.find(a => a && a.ZipCode.startsWith(postcode));
}

/**
 * Checks whether the user has an address in local storage available to us
 * @returns {boolean} - whether the address is in local storage or now
 */
const isAddressInLocalStorage = () => {
    if (window.localStorage) {
        const item = window.localStorage?.getItem(localStorageStoredLocationKey);
        const address = item ? JSON.parse(item) : null;
        return !!(address && (address.PostalCode || address.ZipCode));
    }

    return false;
};

function getStoredAddress () {
    const storedLocation = window.localStorage.getItem(localStorageStoredLocationKey);

    return storedLocation ? JSON.parse(storedLocation) : null;
}

function formatAddress (tenant, address) {
    return tenants[tenant].formatAddress(formatAddressLines(address));
}

/**
 * Retrieves the address from local storage
 * @param mapped - boolean deciding whether to return the address in a mapped state
 * @returns address - The address from local storage
 */
function getAddressFromLocalStorage (tenant, mapped = true) {
    if (window.localStorage) {
        const storedAddress = getStoredAddress();

        if (storedAddress) {
            return mapped ? formatAddress(tenant, storedAddress) : storedAddress;
        }
    }

    return null;
}

/**
 * Retrieves the coordinates from address
 * @param address - address object to retrieve coordinates
 * @param shouldReverse - boolean deciding the ordering: [latitude, longitude] by default
 * @returns coordinates - The coordinates in address
 */
function getAddressCoords (address, shouldReverse = false) {
    if (address?.Field1 && address?.Field2) {
        return shouldReverse ? [address.Field2, address.Field1] : [address.Field1, address.Field2];
    }

    return null;
}

/**
 * Checks whether the address values in local storage match what is in the form.
 * @param storedAddress - The address stored in local storage
 * @param formAddress - The address in form state
 * @returns {boolean} - Whether the form values match
 */
function doesAddressInStorageAndFormMatch (storedAddress, formAddress) {
    return storedAddress.Line1 === formAddress.line1 && storedAddress.PostalCode === formAddress.postcode
        && storedAddress.Line2 === formAddress.line2 && storedAddress.City === formAddress.locality;
}

/**
 * Attempts to find the closest address; from the addresses
 * supplied, to the current postcode provided.
 * @param addresses - The consumers address book
 * @param tenant - The current tenant
 * @returns {Object} - The closest formatted address
 */
function getClosestAddress (addressData, tenant, currentPostcode) {
    const postcode = currentPostcode || '';
    let address;

    if (!postcode) {
        address = getDefaultAddress(addressData, tenant);
    } else {
        address = getAddressClosestToPostcode(postcode, addressData, tenant);
    }

    if (!address) {
        return tenants[tenant].getEmptyAddress(postcode);
    }

    return formatAddress(tenant, address);
}

/**
 * Retrieves the address from cookie
 * @param tenant - The current tenant
 * @param cookies - Cookies object
 * @param mapped - boolean deciding whether to return the address in a mapped state
 * @returns address - The address from cookie
 */
function getAddressFromCookie (tenant, cookies, mapped = true) {
    if (!cookies || typeof cookies.get !== 'function') return null;
    let storedAddress = null;

    const houseNumber = cookies.get('je-last_houseNo_used');
    const street = cookies.get('je-last_street_used');
    const unitNumber = cookies.get('je-last_unitNumber_used');
    const latitude = cookies.get('je-last_latitude_used');
    const longitude = cookies.get('je-last_longitude_used');
    const sublocality = cookies.get('je-last_sublocality_used');
    const state = cookies.get('je-last_state_used');
    const postalCode = cookies.get('je-location');
    const city = cookies.get('je-last_city_used');
    const searchBoxAddress = cookies.get('je-last_suggestion_used');

    const hasAddress = houseNumber && street;

    if (hasAddress) {
        storedAddress = {
            Line1: `${houseNumber} ${street}`,
            Line2: unitNumber,
            Line3: sublocality,
            PostalCode: postalCode.toString(),
            administrativeArea: state,
            City: city,
            Field1: latitude,
            Field2: longitude,
            searchBoxAddress
        };
    }

    if (storedAddress) {
        return mapped ? formatAddress(tenant, storedAddress) : storedAddress;
    }

    return null;
}

/**
 * Retrieves the coordinates from address
 * @param storedAddress - Address from storage
 * @param stateAddress - Address from state
 * @returns coordinates - Address coordinates in reverse order
 */
function getAddressCoordsFromAddress (storedAddress, stateAddress) {
    if (doesAddressInStorageAndFormMatch(storedAddress, stateAddress)) {
        return getAddressCoords(storedAddress, true);
    }

    return null;
}

/**
 * Retrieves the coordinates from storage(local storage/cookies)
 * @param tenant - Address from storage
 * @param cookies - Cookies
 * @param stateAddress - Address from state
 * @returns coordinates - Address coordinates in reverse order
 */
function getAddressCoordsFromStorage (tenant, cookies, stateAddress, shouldLoadAddressFromLocalStorage) {
    let addressCoords;
    const isAddressExistInLocalStorage = isAddressInLocalStorage();

    if (shouldLoadAddressFromLocalStorage && isAddressExistInLocalStorage) {
        const storedAddress = getAddressFromLocalStorage(tenant, false);
        addressCoords = getAddressCoordsFromAddress(storedAddress, stateAddress);
    } else if (!shouldLoadAddressFromLocalStorage) {
        const storedAddress = getAddressFromCookie(tenant, cookies, false);
        addressCoords = getAddressCoordsFromAddress(storedAddress, stateAddress);
    }

    return addressCoords;
}

function setAddressInLocalStorage (addressDetails) {
    if (window.localStorage) {
        window.localStorage.setItem(localStorageStoredLocationKey, JSON.stringify({
            PostalCode: addressDetails.postcode,
            Line1: addressDetails.line1,
            Line2: addressDetails.line2,
            Line3: addressDetails.line3,
            Line4: addressDetails.line4,
            administrativeArea: addressDetails.administrativeArea,
            City: addressDetails.locality
        }));
    }
}

function getAddressFromStorage (tenant, cookies, shouldLoadAddressFromLocalStorage) {
    const address = shouldLoadAddressFromLocalStorage ?
        getAddressFromLocalStorage(tenant) :
        getAddressFromCookie(tenant, cookies);

    return address;
}

export default {
    doesAddressInStorageAndFormMatch,
    getClosestAddress,
    getAddressCoords,
    getAddressFromStorage,
    getAddressFromLocalStorage,
    getAddressFromCookie,
    isAddressInLocalStorage,
    setAddressInLocalStorage,
    getAddressCoordsFromStorage
};
