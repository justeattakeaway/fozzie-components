function isFullPostCode (postcode) {
    return !postcode ? false : postcode.length === 5;
}

function getEmptyAddress (postcode) {
    return {
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        locality: '',
        postcode: postcode || ''
    };
}

function formatAddress (address) {
    return {
        line1: address.line1 || '',
        line2: address.line2 || '',
        line3: address.line3 || '',
        line4: address.line4 || '',
        locality: address.City || address.locality || '',
        postcode: address.PostalCode || address.ZipCode || address.postalCode || ''
    };
}

export default {
    isFullPostCode,
    getEmptyAddress,
    formatAddress
};
