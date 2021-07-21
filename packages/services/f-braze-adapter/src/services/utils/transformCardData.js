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
        pinned,
        updated
    } = card;

    const {
        background_color: backgroundColor,
        brand_name: brand,
        content_container_background: contentBackgroundColor,
        banner,
        button_1: ctaText = linkText,
        deduplication_key: deduplicationKey,
        discount_percentage: discountPercentage,
        earned_stamps: earnedStamps,
        expiry_date: expiryDate,
        expiry_line: expiryLine,
        footer,
        restaurant_logo_url: restaurantLogoUrl,
        icon_1: icon = restaurantLogoUrl,
        location,
        restaurant_image_url: restaurantImageUrl,
        image_1: image = (imageUrl || restaurantImageUrl),
        offer_auth_required: offerAuthRequired,
        order,
        restaurant_id: restaurantId,
        subtitle = subtitleDescription,
        total_required_stamps: totalRequiredStamps,
        custom_card_type: type,
        voucher_code: voucherCode,
        headline,
        display_times_json: displayTimesJson
    } = (extras || {});

    const extrasMembers = Object.keys(extras);

    const description = extrasMembers
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

    const isReadyToClaim = extrasMembers.includes('is_ready_to_claim')
        ? ['true', true].includes(extras.is_ready_to_claim)
        : undefined;

    const isVisible = extrasMembers.includes('is_visible')
        ? ['true', true].includes(extras.is_visible)
        : undefined;

    const output = {
        backgroundColor,
        brand,
        contentBackgroundColor,
        banner,
        ctaText,
        deduplicationKey: deduplicationKey || `${type}/${title}`,
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
        isVisible,
        location,
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

    Object.keys(output)
        .filter(k => output[k] === undefined)
        .forEach(k => delete output[k]);

    return output;
};

export default transformCardData;
