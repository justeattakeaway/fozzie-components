function isFullPostCode (postcode) {
    return !postcode ? false : postcode.length === 4;
}

function getEmptyAddress (postcode) {
    return {
        line1: '',
        line2: '',
        locality: '',
        administrativeArea: '',
        postcode: postcode || ''
    };
}

function formatAddress (address) {
    return {
        line1: address.line1 || '',
        line2: address.line2 || '',
        locality: address.City || address.locality || '',
        administrativeArea: address.Line4 || address.administrativeArea || '',
        postcode: address.PostalCode || address.ZipCode || address.postalCode || ''
    };
}

export default {
    isFullPostCode,
    getEmptyAddress,
    formatAddress
};
