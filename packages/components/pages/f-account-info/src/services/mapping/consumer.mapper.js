
/**
 * Maps the raw api response to the view model.
 * @param {object} details - The consumer details (i.e. response.data).
 * @returns {object} A view model that can be used to presents the component.
 */
export const mapToConsumerDetails = details => {
    const model = {
        id: details?.ConsumerId,
        firstName: details?.FirstName,
        lastName: details?.LastName,
        phoneNumber: details?.PhoneNumber,
        emailAddress: details?.EmailAddress
    };

    return model;
};

/**
 * Validates the parameter passed is an Array then finds the default consumers address
 * then maps the raw api response to the view model.
 * @param {object} addresses - The consumers addresses (i.e. response.data).
 * @returns {object} A view model that can be used to presents the component.
 */
export const mapToConsumerAddress = addresses => {
    let address;
    if (Array.isArray(addresses)) {
        address = addresses.find(e => e.IsDefault);
    }
    const model = {
        line1: address?.Line1,
        line2: address?.Line2,
        line3: address?.Line3,
        city: address?.City,
        postcode: address?.ZipCode
    };

    return model;
};
