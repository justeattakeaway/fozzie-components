/**
 * @param cards
 * @param currentLocation
 * @returns Array
 */
const locationFilter = (cards, { location }) => cards.filter(card => {
    const needsLocation = card?.url?.includes('$LOCATION');
    // const needsLatitude = card?.url?.includes('$LAT');
    // const needsLongitude = card?.url?.includes('$LON');

    if (needsLocation) {
        // will be undefined if no locations KVP exists
        const locationsList = card?.location?.split(',');
        // return true if NO KVP
        if (locationsList === undefined) {
            return true;
        }
        // if we have a location attribute but NO current location return false
        if (!location) {
            return false;
        }
        const locationToMatch = location.toLowerCase().replace(/\s/g, '');
        const matchedLocations = locationsList.map(l => l.toLowerCase().replace(/\s/g, ''))
            .filter(l => locationToMatch === l).length;
        return matchedLocations > 0;
    }

    return true;
});

export default locationFilter;
