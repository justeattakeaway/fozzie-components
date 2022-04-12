import uk from './tenants/uk';
import au from './tenants/au';
import nz from './tenants/nz';
import it from './tenants/it';

const tenants = {
    uk,
    au,
    nz,
    it
};

const storedLocationKey = 'je-full-address-details';

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
        const address = window.localStorage.getItem(storedLocationKey) ? JSON.parse(window.localStorage.getItem(storedLocationKey)) : null;
        return !!(address && (address.PostalCode || address.ZipCode));
    }

    return false;
};

function getStoredAddress () {
    const storedLocation = window.localStorage.getItem(storedLocationKey);

    return storedLocation ? JSON.parse(storedLocation) : null;
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
            return mapped ? tenants[tenant].formatAddress(formatAddressLines(storedAddress)) : storedAddress;
        }
    }

    return null;
}

function getAddressCoordsFromLocalStorage () {
    if (window.localStorage) {
        const storedAddress = getStoredAddress();

        return storedAddress?.Field1 && storedAddress?.Field2 ? [storedAddress.Field1, storedAddress.Field2] : null;
    }

    return null;
}

/**
 * Checks whether the address values in local storage match what's is in the form.
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

    return tenants[tenant].formatAddress(formatAddressLines(address));
}

export default {
    doesAddressInStorageAndFormMatch,
    getClosestAddress,
    getAddressFromLocalStorage,
    getAddressCoordsFromLocalStorage,
    isAddressInLocalStorage
};
