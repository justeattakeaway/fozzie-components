
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
 * Maps the raw api response to the view model.
 * @param {object} address - The consumer details (i.e. response.data).
 * @returns {object} A view model that can be used to presents the component.
 */
export const mapToConsumerAddress = address => {
    const model = {
        line1: address?.Line1,
        line2: address?.Line2,
        line3: address?.Line3,
        city: address?.City,
        postcode: address?.ZipCode
    };

    return model;
};

/**
 * Maps the view model to the Body payload for the api update request.
 * @param {object} consumerViewModel - The consumer view model (i.e. state.consumer).
 * @returns {object} A model that can be 'Posted' to the Api endpoint.
 */
export const mapToConsumerDetailsUpdateModel = consumerViewModel => { // eslint-disable-line
    const model = {
        details: {

        },

        address: {

        }
    };

    return model;
};
