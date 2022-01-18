/**
 * Replaces any found location placeholders with users current location data
 * @param cards
 * @param location
 * @param longitude
 * @param latitude
 * @returns {*}
 */
const urlLocationSubstitution = (cards, { location, longitude, latitude }) => cards.map(card => ({
    ...card,
    url: card.url.replace('$LOCATION', location).replace('$LAT', latitude).replace('$LON', longitude)
}));

export default urlLocationSubstitution;
