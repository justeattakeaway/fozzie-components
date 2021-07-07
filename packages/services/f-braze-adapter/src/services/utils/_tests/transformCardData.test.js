/* eslint camelcase: ["error", {allow: [
    "button_1",
    "deduplication_key",
    "discount_percentage",
    "earned_stamps",
    "expiry_date",
    "expiry_line",
    "icon_1",
    "image_1",
    "is_ready_to_claim",
    "is_visible",
    "line_1",
    "line_2",
    "custom_card_type",
    "voucher_code",
    "total_required_stamps",
    "display_times_json"
]}] */

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
const location = '__LOCATION__';
const order = '__ORDER__';
const type = '__TYPE__';
const voucherCode = '__VOUCHER_CODE__';
const updated = '__UPDATED__';
const extractedCardId = '__EXTRACTED_CARD_ID__';
const description = '__DESCRIPTION__';
const deduplicationKey = '__DEDUPLICATION_KEY__';
const subtitle = '__SUBTITLE__';
const target = { attribute: '_self' };
const discountPercentage = '__DISCOUNT_PERCENTAGE__';
const earnedStamps = '__EARNED_STAMPS__';
const expiryDate = '__EXPIRY_DATE__';
const expiryLine = '__EXPIRY_LINE__';
const isReadyToClaim = '__IS_READY_TO_CLAIM__';
const isVisible = '__IS_VISIBLE__';
const totalRequiredStamps = '__TOTAL_REQUIRED_STAMPS__';

getCardUrlTarget.mockReturnValue(target);
extractCardId.mockReturnValue(extractedCardId);

const extras = {
    button_1: button,
    deduplication_key: deduplicationKey,
    discount_percentage: discountPercentage,
    earned_stamps: earnedStamps,
    expiry_date: expiryDate,
    expiry_line: expiryLine,
    icon_1: icon,
    image_1: image,
    is_ready_to_claim: isReadyToClaim,
    is_visible: isVisible,
    line_1: line1,
    line_2: line2,
    location,
    order,
    custom_card_type: type,
    voucher_code: voucherCode,
    total_required_stamps: totalRequiredStamps
};

const rawCard = {
    id,
    url,
    extras,
    imageUrl,
    title,
    linkText,
    pinned,
    description,
    updated
};

const reformattedCard = {
    description: [line1, line2],
    deduplicationKey,
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
    isReadyToClaim: false, // because `'__IS_READY_TO_CLAIM__'` is not `true` or `'true'`
    isVisible: false, // because `'__IS_VISIBLE__'` is not `true` or `'true'`
    location,
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

    describe.each([
        ['isVisible', 'is_visible'],
        ['isReadyToClaim', 'is_ready_to_claim']
    ])('`%s`', (targetKey, sourceKey) => {
        it.each([
            [true, 'true'],
            [true, true],
            [false, 'false'],
            [false, false]
        ])(`should output boolean value '%p' when '${sourceKey}' is '%p'`, (targetValue, sourceValue) => {
            // Arrange
            const data = {
                ...rawCard,
                extras: {
                    [sourceKey]: sourceValue
                }
            };

            // Act
            const output = transformCardData(data);

            // Assert
            expect(output[targetKey]).toBe(targetValue);
        });

        it(`should be undefined when '${sourceKey}' is not present in source data`, () => {
            // Arrange
            const data = {
                ...rawCard,
                extras: {
                    ...rawCard.extras
                }
            };
            delete data.extras[sourceKey];

            // Act
            const output = transformCardData(data);

            // Assert
            expect(Object.keys(output)).not.toContain(targetKey);
        });
    });

    describe('when `subtitle` key within extras is populated', () => {
        // Arrange
        const subtitleCardData = {
            ...rawCard,
            extras: {
                line_1: line1,
                line_2: line2,
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

    describe('when `display_times_json is defined', () => {
        describe('as a string', () => {
            it('should attempt to parse `display_times_json` as JSON into `displayTimes`', () => {
                // Arrange
                const data = {
                    extras: { display_times_json: '{"foo":"bar"}' }
                };

                // Act
                const output = transformCardData(data);

                // Assert
                expect(output.displayTimes).toEqual({ foo: 'bar' });
            });

            it('should result in `displayTimes` being an empty object if it fails to parse', () => {
                // Arrange
                const data = {
                    extras: { display_times_json: '{invalid}' }
                };

                // Act
                const output = transformCardData(data);

                // Assert
                expect(output.displayTimes).toEqual({});
            });
        });

        describe('as an object', () => {
            it('should pass `display_times_json` verbatim into `displayTimes', () => {
                // Arrange
                const data = {
                    extras: {
                        display_times_json: {
                            foo: 'bar'
                        }
                    }
                };

                // Act
                const output = transformCardData(data);

                // Assert
                expect(output.displayTimes).toEqual({
                    foo: 'bar'
                });
            });
        });
    });
});
