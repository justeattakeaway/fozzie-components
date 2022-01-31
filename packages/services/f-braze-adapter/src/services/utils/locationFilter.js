/**
 * Tests if passed lat long are valid
 * @param lat
 * @param lon
 * @returns {boolean}
 */
const hasValidLocation = (lat, lon) => {
    const regexExp = /^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi;
    return regexExp.test(`${lat},${lon}`);
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

    // will be undefined if no locations KVP exists
    const locationsList = card?.location?.split(',');
    // return true if NO KVP
    if (locationsList === undefined) {
        return !(needsLongitude || needsLatitude || needsLocation);
    }

    if (needsLongitude || needsLatitude || needsLocation) {
        // if we have a location attribute and or one of the placeholders but
        // NO current location return false
        if (!location) {
            return false;
        }
        // if we don't have a valid lat long throw it out
        if (!hasValidLocation(latitude, longitude)) {
            return false;
        }
    }

    if (!location) {
        return true;
    }

    // match the location and return based on this
    return matchLocation(location, locationsList);
});

export default locationFilter;
