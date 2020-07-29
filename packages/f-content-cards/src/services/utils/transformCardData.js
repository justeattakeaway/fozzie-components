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
        description: subtitle
    } = card;

    const {
        button_1: ctaText = linkText,
        icon_1: icon,
        image_1: image = imageUrl,
        order,
        custom_card_type: type,
        voucher_code: voucherCode
    } = extras;

    const description = Object.values(extras)
        .filter(([key]) => key.indexOf('line_') !== -1)
        .map(({ 1: val }) => val);

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
        target
    };
};

export default transformCardData;
