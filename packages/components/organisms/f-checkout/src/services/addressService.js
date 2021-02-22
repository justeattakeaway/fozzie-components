import { getCookie } from '../utils/helpers';

function isFullPostCode (postcode) {
    if (!postcode) {
        return false;
    }

    return postcode.length > 4;
}

function toFormattedPostcode (postcode) {
    if (!postcode) {
        return '';
    }

    let formatted = postcode.replace(/ /g, '').replace(/-/g, '');

    if (isFullPostCode(formatted)) {
        const last3 = formatted.slice(formatted.length - 3);
        const prefix = formatted.slice(0, formatted.length - 3);
        formatted = `${prefix} ${last3}`;
    }

    return formatted.toUpperCase();
}

function getAddress (postcode, address) {
    if (!address) {
        return {
            line1: '',
            line2: '',
            city: '',
            postcode: toFormattedPostcode(postcode)
        };
    }

    const lines = [address.Line2, address.Line3];

    return {
        line1: address.Line1,
        line2: lines.filter(l => l).join(', '),
        city: address.City,
        postcode: address.ZipCode
    };
}

function getDefaultAddress (addresses) {
    if (!addresses) {
        return null;
    }

    return addresses.find(a => a && a.IsDefault);
}

function getAddressClosestToPostcode (postcode, addresses) {
    if (!postcode) {
        return getDefaultAddress(addresses);
    }

    let formattedPostcode = postcode.replace(/ /g, '').replace(/-/g, '');

    let address = addresses.find(a => a.ZipCode === formattedPostcode);

    if (isFullPostCode(formattedPostcode)) {
        formattedPostcode = formattedPostcode.slice(0, formattedPostcode.length - 3);
    }

    address = address || addresses.find(a => a && a.ZipCode.startsWith(formattedPostcode));

    return address;
}

export default {
    getClosestAddress (addresses, tenant) {
        if (tenant !== 'uk') {
            // TODO: Add implementation for other tenants
            return getAddress('', {});
        }

        const postcode = getCookie('je-location') || '';
        const address = getAddressClosestToPostcode(postcode, addresses);

        return getAddress(postcode, address);
    }
};
