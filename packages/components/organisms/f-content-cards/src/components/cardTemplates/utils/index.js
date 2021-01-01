/**
 * Normalises a braze custom card type to camelCase
 * @param {string} cardType - Braze custom_card_type to normalise
 * @returns {string|null}
 */
export const normaliseCardType = cardType => {
    if (typeof cardType !== 'string') {
        // eslint-disable-next-line no-console
        console.error(`normaliseCardType › Expected a string but received ${typeof cardType}`);
        return null;
    }
    return cardType.replace(/_/g, '').replace(/^\w/, c => c.toLowerCase());
};

export default {
    normaliseCardType
};
