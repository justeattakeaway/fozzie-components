function isFullPostCode (postcode) {
    return postcode?.length === 4;
}

function getEmptyAddress (postcode) {
    return {
        line1: '',
        line2: '',
        locality: '',
        postcode: postcode || ''
    };
}

function formatAddress (address) {
    return {
        line1: address.line1 || '',
        line2: address.line2 || '',
        locality: address.City || address.locality || '',
        postcode: address.PostalCode || address.ZipCode || address.postalCode || ''
    };
}

export default {
    isFullPostCode,
    getEmptyAddress,
    formatAddress
};
