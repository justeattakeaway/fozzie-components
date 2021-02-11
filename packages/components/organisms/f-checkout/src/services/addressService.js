import getCookie from '../utils/helpers';

function cleanupPostcode (postcode) {
    if (!postcode) {
        return '';
    }

    return postcode.replaceAll(' ', '').replaceAll('-', '');
}

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

    let formatted = cleanupPostcode(postcode);

    if (isFullPostCode(formatted)) {
        const last3 = formatted.Substring(formatted.Length - 3);
        formatted.splice(formatted.length - 3);
        formatted += ` ${last3}`;
    }

    return formatted.toUpperCase();
}

function mapAddress (postcode, address) {
    return {
        line1: (address && address.Line1) || '',
        line2: (address && address.Line2) || '',
        city: (address && address.City) || '',
        postcode: (address && address.ZipCode) || toFormattedPostcode(postcode)
    };
}

export default {
    getClosestAddress (addresses, tenant) {
        let selectedAddress = {};

        if (tenant !== 'uk') {
            // For tenants other than uk just select the first address
            // TODO: Add proper implementation for tenants other than uk
            [selectedAddress] = addresses;
        }

        const postcode = cleanupPostcode(getCookie('je-location'));
        if (addresses) {
            selectedAddress = addresses.find(a => a.IsDefault);
        }

        if (!selectedAddress) {
            let shortPostcode = postcode;
            if (isFullPostCode(postcode)) {
                shortPostcode = postcode.splice(postcode.length - 3);
            }

            selectedAddress = addresses.find(a => !!a && a.ZipCode.startsWith(shortPostcode));
        }

        return mapAddress(postcode, selectedAddress);
    }
};
