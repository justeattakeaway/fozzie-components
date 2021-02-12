import { getCookie } from '../utils/helpers';

function isFullPostCode (postcode) {
    if (!postcode) {
        return false;
    }

    return postcode.Length > 4;
}

function toFormattedPostcode (postcode) {
    if (!postcode) {
        return '';
    }

    let formatted = postcode.replaceAll(' ', '').replaceAll('-', '');

    if (isFullPostCode(formatted)) {
        const last3 = formatted.Substring(formatted.Length - 3);
        formatted.splice(formatted.length - 3);
        formatted += ` ${last3}`;
    }

    return formatted.toUpperCase();
}

function getAddress (postcode, address) {
    if (!address) {
        return {
            line1: '',
            line2: '',
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

    let formattedPostcode = postcode.replaceAll(' ', '').replaceAll('-', '');

    let address = addresses.find(a => a.ZipCode === formattedPostcode);

    if (isFullPostCode(formattedPostcode)) {
        formattedPostcode = formattedPostcode.splice(postcode.length - 3);
    }

    address = address ?? addresses.find(a => a && a.ZipCode.startsWith(formattedPostcode));

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
