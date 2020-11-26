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
    
    // TODO! this.address = this.params.suggestionFormat(suggestion);
    const suggestionDescription = suggestion.description;
    
    return service.getLocationDetails(placeId)
        .then(location => service.getLocationPostcode(location, streetNumberFormatted))
        .then(location => {
            location.streetNumber = location.streetNumber || streetNumberFormatted;
            location.suggestion = suggestionDescription;
            
            const missingFields = requiredFields.reduce((allFields, field) => (
                location[field]
                    ? allFields
                    : allFields.concat(field)
            ), []);
        
        // if streetNumber is required and not in the current address
        const streetNumberRequired =
            requiredFields.includes('streetNumber')
            && !location.streetNumber;
        
        if (!missingFields.length) {
            const payload = {
                ...location,
                city: location.locality,
                houseNo: location.streetNumber,
                where: location.postcode
            };
            // perform search if all data present
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
            
            // this.$nextTick(() => {
            //     this.$refs.streetNumberInput.focus();
            // });
        } else {
            // suggestion doesn't have desired fields
            // therefore search must be more specific
            return {
                errors: ['MORE_SPECIFIC_SEARCH'],
                requiresStreetNumber: streetNumberRequired
            }
        }
        
        // not valid
        return false;
    });
};

export {
    search,
    selectedSuggestion
};
