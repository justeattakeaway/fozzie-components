import extractCardId from './extractCardId';
import getCardUrlTarget from './getCardUrlTarget';

const transformCardData = (card = {}) => {
    const {
        id,
        url,
        extras = {},
        imageUrl,
        title,
        linkText,
        description: subtitle,
        pinned
    } = card;

    const {
        button_1: ctaText = linkText,
        icon_1: icon,
        image_1: image = imageUrl,
        order,
        custom_card_type: type,
        voucher_code: voucherCode,
        updated
    } = extras;

    const description = Object.keys(extras)
        .filter(key => key.indexOf('line_') !== -1)
        .map(key => extras[key]);

    const extractedCardId = extractCardId(id);
    const target = getCardUrlTarget(url);

    return {
        description,
        id,
        extractedCardId,
        url,
        icon,
        ctaText,
        image,
        title,
        subtitle,
        order,
        voucherCode,
        type,
        target,
        updated,
        pinned
    };
};

export default transformCardData;
