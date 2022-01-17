/**
 * @param cards
 * @param currentLocation
 * @returns Array
 */
const locationFilter = (cards, { location = '' }) => cards.filter(card => {
    // will be undefined if no locations KVP exists
    const locationsList = card?.locations?.split(',');
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
});

export default locationFilter;
