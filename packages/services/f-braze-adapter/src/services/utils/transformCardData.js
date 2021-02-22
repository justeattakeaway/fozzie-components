import extractCardId from './extractCardId';
import getCardUrlTarget from './getCardUrlTarget';

/**
 * Attempt to parse a string containing valid JSON
 * @param {String} displayTimesJson
 * @return {Object}
 */
const ingestDisplayTimesOrEmptyObject = displayTimesJson => {
    try {
        return JSON.parse(displayTimesJson);
    } catch {
        return {};
    }
};

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
        background_color: backgroundColor,
        brand_name: brand,
        content_container_background: contentBackgroundColor,
        banner,
        button_1: ctaText = linkText,
        discount_percentage: discountPercentage,
        earned_stamps: earnedStamps,
        expiry_date: expiryDate,
        expiry_line: expiryLine,
        footer,
        is_ready_to_claim: isReadyToClaim,
        restaurant_logo_url: restaurantLogoUrl,
        icon_1: icon = restaurantLogoUrl,
        restaurant_image_url: restaurantImageUrl,
        image_1: image = (imageUrl || restaurantImageUrl),
        offer_auth_required: offerAuthRequired,
        order,
        restaurant_id: restaurantId,
        subtitle = subtitleDescription,
        total_required_stamps: totalRequiredStamps,
        custom_card_type: type,
        updated,
        voucher_code: voucherCode,
        headline,
        display_times_json: displayTimesJson
    } = (extras || {});

    const description = Object.keys(extras)
        .filter(key => key.indexOf('line_') !== -1)
        .map(key => extras[key]);

    const displayTimes = (typeof displayTimesJson === 'string')
        ? ingestDisplayTimesOrEmptyObject(displayTimesJson)
        : displayTimesJson;

    if (subtitleDescription && (subtitle !== subtitleDescription)) {
        description.unshift(subtitleDescription);
    }

    const extractedCardId = extractCardId(id);
    const target = getCardUrlTarget(url);

    return {
        backgroundColor,
        brand,
        contentBackgroundColor,
        banner,
        ctaText,
        description,
        discountPercentage,
        earnedStamps,
        expiryDate,
        expiryLine,
        extractedCardId,
        footer,
        headline,
        icon,
        id,
        image,
        isReadyToClaim,
        offerAuthRequired,
        order,
        pinned,
        restaurantId,
        subtitle,
        target,
        title,
        totalRequiredStamps,
        type,
        updated,
        url,
        voucherCode,
        displayTimes
    };
};

export default transformCardData;
