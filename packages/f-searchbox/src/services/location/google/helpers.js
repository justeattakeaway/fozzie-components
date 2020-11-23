/**
 * Finds the first instance of a specified address type, in a Google Maps address component field
 * Example Google Maps API response with address components:
 * {
    ...
    "address_components": [
      { "long_name": "Adelfia", "short_name": "Adelfia", "types": [ "locality", "political" ] },
    ]
  }
 *
 *
 *
 * @param components
 * @param useLongName
 * @param types
 * @returns {*}
 */
const getAddressComponent = (components = [], useLongName, ...types) => {
    const result = components.find(component => (
        component.types.some(type => (
            types.includes(type)
        ))
    ));
    return result && (
        useLongName
            ? result.long_name || result.short_name
            : result.short_name || result.long_name
    );
};

/**
 * Format location result so it can be consumed and resolved by the google places getter methods.
 *
 * @param result
 * @returns {Object}
 */
const formatLocation = result => {
    const address = result.address_components;
    const hasLocation = result.geometry && result.geometry.location;
    const state = getAddressComponent(address, false, 'administrative_area_level_1');
    const unitNumber = getAddressComponent(address, false, 'subpremise');
    return {
        country: getAddressComponent(address, false, 'country'),
        formattedAddress: result.formatted_address,
        latitude: hasLocation && hasLocation.lat(),
        longitude: hasLocation && hasLocation.lng(),
        locality: getAddressComponent(
            address,
            true,
            'locality',
            'administrative_area_level_3',
            'administrative_area_level_2',
            'administrative_area_level_1',
            'post_town'
        ),
        placeId: result.place_id,
        postcode: getAddressComponent(address, true, 'postal_code', 'postal code'),
        state,
        street: getAddressComponent(address, true, 'route'),
        streetNumber: getAddressComponent(address, true, 'street_number'),
        sublocality: getAddressComponent(address, true, 'sublocality', 'sublocality_level_1'),
        types: result.types,
        unitNumber
    };
};

export {
    formatLocation,
    getAddressComponent
};
