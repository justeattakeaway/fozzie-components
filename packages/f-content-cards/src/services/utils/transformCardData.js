import extractCardId from './extractCardId';
import getCardUrlTarget from './getCardUrlTarget';

/**
 * Transforms various card data and extended fields into uniform card data format
 * @param card
 * @return {Object}
 */
const transformCardData = card => {
    if (card === null || typeof card !== 'object') return {};

    const {
        id,
        url,
        extras = {},
        imageUrl,
        title,
        linkText,
        description: subtitleDescription,
        pinned
    } = card;

    const {
        banner,
        button_1: ctaText = linkText,
        footer,
        restaurant_logo_url: restaurantLogoUrl,
        icon_1: icon = restaurantLogoUrl,
        restaurant_image_url: restaurantImageUrl,
        image_1: image = (imageUrl || restaurantImageUrl),
        offer_auth_required: offerAuthRequired,
        order,
        restaurant_id: restaurantId,
        subtitle = subtitleDescription,
        custom_card_type: type,
        updated,
        voucher_code: voucherCode
    } = extras;

    const description = Object.keys(extras)
        .filter(key => key.indexOf('line_') !== -1)
        .map(key => extras[key]);

    if (subtitleDescription && (subtitle !== subtitleDescription)) {
        description.unshift(subtitleDescription);
    }

    const extractedCardId = extractCardId(id);
    const target = getCardUrlTarget(url);

    return {
        banner,
        ctaText,
        description,
        extractedCardId,
        footer,
        icon,
        id,
        image,
        offerAuthRequired,
        order,
        pinned,
        restaurantId,
        subtitle,
        target,
        title,
        type,
        updated,
        url,
        voucherCode
    };
};

export default transformCardData;
