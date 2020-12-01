/* eslint-disable */
import { generatePostForm } from '../utils/helpers';
/**
 * Submits a manual form submission with a given callback `getLastLocation`
 *
 * @param onSubmit
 * @param formUrl
 * @param form
 * @param callback
 * @param event
 * @param location
 * @returns {boolean}
 */
const search = ({
    onSubmit,
    formUrl,
    form,
    callback,
    event
}, location = {}) => {
    const payload = {
        query: '',
        cuisine: '',
        ...location
    };
    
    if (onSubmit) {
        return false;
    } else if (formUrl) {
        event.preventDefault();
        form.submit(callback());
    } else {
        generatePostForm('/HomeCW/SearchResultByGeoLocation', payload);
    }
};

/**
 * Responsible for allowing the user to select search results from google places.
 * This method also does a few other things:
 *
 * 1. If the user is required to enter a more specific search i.e a street number
 * then we alert the component responsible and display it.
 *
 * 2. We use the `requiredFields` (passed in via the tenant config) to determine if we
 * need specific properties e.g. ['streetNumber', 'street', 'locality', 'postcode'].
 *
 * 3. If there are no missing fields we let the user search using their selection.
 *
 * 4. If there are missing fields like the street number, we display an error specific to the type of
 * error returned i.e Please enter a street number (translated) the component then would display the street number
 * field (ES & IT as examples).
 *
 *
 * @param service
 * @param suggestions
 * @param requiredFields
 * @param streetNumber
 * @param index
 * @returns {Promise.<TResult>}
 */
const selectedSuggestion = (
    service,
    suggestions,
    requiredFields,
    streetNumber,
    index
) => {
    // TODO pass through suggestion index for keyboard behaviour..
    const suggestion = suggestions[index || 0];
    
    // find current suggestion's location information
    const placeId = suggestion.place_id || suggestion.placeId;
    const streetNumberFormatted = streetNumber.trim();
    
    return service.getLocationDetails(placeId)
        .then(location => service.getLocationPostcode(location, streetNumberFormatted))
        .then(location => {
            location.streetNumber = location.streetNumber || streetNumberFormatted;
            location.suggestion = suggestion.description;
            
            const missingFields = requiredFields.reduce((allFields, field) => (
                location[field]
                    ? allFields
                    : allFields.concat(field)
            ), []);
        
        const streetNumberRequired = requiredFields.includes('streetNumber') && !location.streetNumber;
        
        if (!missingFields.length) {
            const payload = {
                ...location,
                city: location.locality,
                houseNo: location.streetNumber,
                where: location.postcode
            };

            search({}, payload);
            return payload;
        } else if (
            // if street required but no street number available
            // display street number field
            location.street
            && requiredFields.includes('street')
            && missingFields.includes('streetNumber')
        ) {
            
            return streetNumberRequired
                ?
                {
                    errors: ['STREET_NUMBER_MISSING'],
                    requiresStreetNumber: streetNumberRequired
                }
                : '';
            
        } else {
            // suggestion doesn't have desired fields
            // therefore search must be more specific
            return {
                errors: ['MORE_SPECIFIC_SEARCH'],
                requiresStreetNumber: streetNumberRequired
            }
        }
    });
};

export {
    search,
    selectedSuggestion
};
