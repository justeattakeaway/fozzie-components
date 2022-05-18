function isFullPostCode (postcode) {
    return postcode?.length >= 5;
}

function toFormattedPostcode (postcode) {
    let formattedPostcode = postcode.toString().replace(/\s/g, '').replace(/-/g, '');

    if (isFullPostCode(formattedPostcode)) {
        const last3 = formattedPostcode.slice(formattedPostcode.length - 3);
        const prefix = formattedPostcode.slice(0, formattedPostcode.length - 3);
        formattedPostcode = `${prefix} ${last3}`;
    }

    return formattedPostcode.toUpperCase();
}

function getEmptyAddress (postcode) {
    return {
        line1: '',
        line2: '',
        line3: '',
        locality: '',
        postcode: toFormattedPostcode(postcode) || ''
    };
}

function formatAddress (address) {
    return {
        line1: address.line1 || '',
        line2: address.line2 || '',
        line3: address.line3 || '',
        locality: address.City || address.locality || '',
        postcode: address.PostalCode || address.ZipCode || address.postalCode || ''
    };
}

export default {
    toFormattedPostcode,
    isFullPostCode,
    getEmptyAddress,
    formatAddress
};
