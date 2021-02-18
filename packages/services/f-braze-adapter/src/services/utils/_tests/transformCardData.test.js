import transformCardData from '../transformCardData';
import getCardUrlTarget from '../getCardUrlTarget';
import extractCardId from '../extractCardId';

jest.mock('../getCardUrlTarget');
jest.mock('../extractCardId');

const id = '__ID__';
const url = '__URL__';
const imageUrl = '__IMAGE_URL__';
const title = '__TITLE__';
const linkText = '__LINK_TEXT__';
const line1 = '__LINE_1__';
const line2 = '__LINE_2__';
const pinned = '__PINNED__';
const button = '__BUTTON__';
const icon = '__ICON__';
const image = '__IMAGE__';
const order = '__ORDER__';
const type = '__TYPE__';
const voucherCode = '__VOUCHER_CODE__';
const updated = '__UPDATED__';
const extractedCardId = '__EXTRACTED_CARD_ID__';
const description = '__DESCRIPTION__';
const subtitle = '__SUBTITLE__';
const target = { attribute: '_self' };
const discountPercentage = '__DISCOUNT_PERCENTAGE__';
const earnedStamps = '__EARNED_STAMPS__';
const expiryDate = '__EXPIRY_DATE__';
const expiryLine = '__EXPIRY_LINE__';
const isReadyToClaim = '__IS_READY_TO_CLAIM__';
const totalRequiredStamps = '__TOTAL_REQUIRED_STAMPS__';

getCardUrlTarget.mockReturnValue(target);
extractCardId.mockReturnValue(extractedCardId);

const extras = {
    button_1: button, // eslint-disable-line camelcase
    discount_percentage: discountPercentage, // eslint-disable-line camelcase
    earned_stamps: earnedStamps, // eslint-disable-line camelcase
    expiry_date: expiryDate, // eslint-disable-line camelcase
    expiry_line: expiryLine, // eslint-disable-line camelcase
    icon_1: icon, // eslint-disable-line camelcase
    image_1: image, // eslint-disable-line camelcase
    is_ready_to_claim: isReadyToClaim, // eslint-disable-line camelcase
    line_1: line1, // eslint-disable-line camelcase
    line_2: line2, // eslint-disable-line camelcase
    order,
    custom_card_type: type, // eslint-disable-line camelcase
    voucher_code: voucherCode, // eslint-disable-line camelcase
    total_required_stamps: totalRequiredStamps, // eslint-disable-line camelcase
    updated
};

const rawCard = {
    id,
    url,
    extras,
    imageUrl,
    title,
    linkText,
    pinned,
    description
};

const reformattedCard = {
    description: [line1, line2],
    discountPercentage,
    earnedStamps,
    expiryDate,
    expiryLine,
    id,
    extractedCardId,
    url,
    icon,
    ctaText: button,
    image,
    isReadyToClaim,
    title,
    totalRequiredStamps,
    subtitle: description,
    order,
    voucherCode,
    type,
    target,
    updated,
    pinned
};

describe('services › utils › transformCardData', () => {
    it('should reformat the appboy data model', () => {
        // Arrange & Act
        const output = transformCardData(rawCard);

        // Assert
        expect(output).toEqual(reformattedCard);
    });

    it('should handle extras when undefined', () => {
        // Arrange
        const data = {
            ...rawCard,
            extras: undefined
        };

        // Act
        const output = transformCardData(data);

        // Assert
        expect(output).toBeDefined();
    });

    it('should fallback to linkText when button_1 is undefined', () => {
        // Arrange
        const data = { linkText };

        // Act
        const output = transformCardData(data);

        // Assert
        expect(output.ctaText).toBe(linkText);
    });

    it('should fallback to imageUrl when image_1 is undefined', () => {
        // Arrange
        const data = { imageUrl };

        // Act
        const output = transformCardData(data);

        // Assert
        expect(output.image).toBe(imageUrl);
    });

    describe('when `subtitle` key within extras is populated', () => {
        // Arrange
        const subtitleCardData = {
            ...rawCard,
            extras: {
                line_1: line1, // eslint-disable-line camelcase
                line_2: line2, // eslint-disable-line camelcase
                subtitle
            }
        };

        it('should populate `subtitle` key with subtitle value from extras', () => {
            // Act
            const output = transformCardData(subtitleCardData);

            // Assert
            expect(output.subtitle).toBe('__SUBTITLE__');
        });

        it('should prepend `description` key from main card config (if set) into description array', () => {
            // Act
            const output = transformCardData(subtitleCardData);

            // Assert
            expect(output.description).toEqual(['__DESCRIPTION__', '__LINE_1__', '__LINE_2__']);
        });

        it('should not append to description array, if description key is not set in main card config', () => {
            // Arrange
            const data = {
                ...subtitleCardData,
                description: undefined
            };

            // Act
            const output = transformCardData(data);

            // Assert
            expect(output.description).toEqual(['__LINE_1__', '__LINE_2__']);
        });
    });

    it('should return an empty object if provided card is not an object', async () => {
        const tests = [
            null,
            undefined,
            123,
            'ABC',
            true
        ];

        await Promise.all(tests.map(test => expect(transformCardData(test)).toEqual({})));
    });
});
