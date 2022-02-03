/**
 * Tests if passed lat long are valid
 * @param lat
 * @param lon
 * @returns {boolean}
 */
const hasValidLocation = (lat, lon) => {
    const regexExp = /^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi;
    return regexExp.test(`${lat},${lon}`) && parseFloat(lat) !== 0 && parseFloat(lon) !== 0;
};

/**
 * match location against ones in list
 * @param location
 * @param locationsList
 * @returns {boolean}
 */
const matchLocation = (location, locationsList) => {
    const locationToMatch = location.toLowerCase().replace(/\s/g, '');
    const matchedLocations = locationsList.map(l => l.toLowerCase().replace(/\s/g, ''))
        .filter(l => locationToMatch === l).length;
    return matchedLocations > 0;
};

/**
 * @param cards
 * @param currentLocation
 * @returns Array
 */
const locationFilter = (cards, { location, latitude, longitude }) => cards.filter(card => {
    const needsLocation = card?.url?.includes('$LOCATION$');
    const needsLatitude = card?.url?.includes('$LAT$');
    const needsLongitude = card?.url?.includes('$LON$');
    const hasPlaceHolder = needsLongitude || needsLatitude || needsLocation;

    // will be undefined if no locations KVP exists
    const locationsList = card?.location?.split(',');
    // return true if NO KVP and if user has no location and hasPlaceholder is false or user has location and hasPlaceholder is true
    if (locationsList === undefined) {
        return !!((needsLocation && location) ||
            ((needsLongitude || needsLatitude) && hasValidLocation(latitude, longitude)) ||
            (!hasPlaceHolder));
    }

    if (hasPlaceHolder) {
        // if we don't have a valid lat long throw it out
        if ((needsLongitude || needsLatitude) && !hasValidLocation(latitude, longitude)) {
            return false;
        }
        // if we have a location attribute and a LOCATION placeholder with
        // NO current location return false
        if (!location) {
            return !needsLocation;
        }
    } else if (!location) {
        return true;
    }

    // match the location and return based on this
    return matchLocation(location, locationsList);
});

export default locationFilter;
