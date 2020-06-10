/**
 * Normalises a braze custom card type to camelCase
 * @param {string} cardType - Braze custom_card_type to normalise
 * @returns {string}
 */
export const normaliseCardType = cardType => {
    if (typeof cardType !== 'string') return cardType;
    return cardType.replace(/_/g, '').replace(/^\w/, c => c.toLowerCase());
};

export default {
    normaliseCardType
};
