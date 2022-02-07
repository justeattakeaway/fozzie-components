const storedLocationKey = 'je-full-address-details';

function isFullPostCode (postcode, tenant) {
    const countryPostcodeLengths = {
        uk: postcode.length >= 5,
        au: postcode.length === 4,
        nz: postcode.length === 4
    };

    return !postcode ? false : countryPostcodeLengths[tenant];
}

const formatPostcode = postcode => postcode.replace(/\s/g, '').replace(/-/g, '');

function toFormattedPostcode (postcode, tenant) {
    if (!postcode) {
        return '';
    }

    let formatted = formatPostcode(postcode);

    if (isFullPostCode(formatted, tenant) && tenant === 'uk') {
        const last3 = formatted.slice(formatted.length - 3);
        const prefix = formatted.slice(0, formatted.length - 3);
        formatted = `${prefix} ${last3}`;
    }

    return formatted.toUpperCase();
}

function getAddress (postcode, tenant, address) {
    const shouldShowAdministrativeArea = tenant === 'au';

    if (!address) {
        return {
            line1: '',
            line2: '',
            locality: '',
            ...(shouldShowAdministrativeArea ? { administrativeArea: '' } : {}),
            postcode: toFormattedPostcode(postcode, tenant)
        };
    }

    const lines = [address.Line2, address.Line3];

    return {
        line1: address.Line1,
        line2: lines.filter(l => l).join(', '),
        locality: address.City,
        ...(shouldShowAdministrativeArea ? { administrativeArea: address.Line4 } : {}),
        postcode: address.ZipCode
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

function getAddressClosestToPostcode (postcode, addressData, tenant) {
    if (!postcode) {
        return getDefaultAddress(addressData, tenant);
    }

    const addresses = addressData.Addresses;

    let formattedPostcode = formatPostcode(postcode);

    let address = addresses.find(a => formatPostcode(a.ZipCode) === formattedPostcode);

    if (isFullPostCode(formattedPostcode, tenant)) {
        formattedPostcode = formattedPostcode.slice(0, formattedPostcode.length - 3);
    }



    address = address || addresses.find(a => a && a.ZipCode.startsWith(formattedPostcode));

    return address;
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

/**
 * Maps the address to how it is returned from the API
 * @param address - The address from local storage
 * @returns The address but mapped to how the API shapes it
 */
function getMappedLocalStorageAddress (address) {
    return {
        lines: [address.Line1, address.Line2, address.Line3],
        locality: address.City,
        postalCode: address.PostalCode || address.ZipCode
    };
}

/**
 * Retrieves the address from local storage
 * @param mapped - boolean deciding whether to return the address in a mapped state
 * @returns address - The address from local storage
 */
function getAddressFromLocalStorage (mapped = true) {
    if (window.localStorage) {
        const storedLocation = window.localStorage.getItem(storedLocationKey);

        if (storedLocation) {
            return mapped ? getMappedLocalStorageAddress(JSON.parse(storedLocation)) : JSON.parse(storedLocation);
        }
    }

    return null;
}

function getAddressCoordsFromLocalStorage () {
    if (window.localStorage) {
        const storedLocation = window.localStorage.getItem(storedLocationKey);
        const parsedLocation = JSON.parse(storedLocation);

        return parsedLocation.Field1 && parsedLocation.Field2 ? [parsedLocation.Field1, parsedLocation.Field2] : null;
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
    const address = getAddressClosestToPostcode(postcode, addressData, tenant);

    return getAddress(postcode, tenant, address);
}

export default {
    doesAddressInStorageAndFormMatch,
    getClosestAddress,
    getAddressFromLocalStorage,
    getAddressCoordsFromLocalStorage,
    isAddressInLocalStorage
};
