function isFullPostCode (postcode) {
    return postcode?.length === 5;
}

function getEmptyAddress (postcode) {
    return {
        line1: '',
        line2: '',
        line3: '',
        locality: '',
        postcode: postcode || ''
    };
}

function formatAddress (address) {
    return {
        line1: address.line1 || '',
        line2: address.line2 || '',
        line3: address.line3 || '',
        locality: address.City || address.locality || '',
        postcode: address.postcode || address.PostalCode || address.ZipCode || address.postalCode || '',
        ...(address.geolocation && { geolocation: address.geolocation }),
        ...((address.Field1 || address.Field2) && {
            geolocation: {
                latitude: address.Field1,
                longitude: address.Field2
            }
        })
    };
}

export default {
    isFullPostCode,
    getEmptyAddress,
    formatAddress
};
