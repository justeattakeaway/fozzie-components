import { normaliseCardType } from '..';

describe('contentCards › utils › normaliseCardType', () => {
    it('Should return a camelcase ID for given Braze content card type', async () => {
        // Assemble
        const tests = [
            {
                input: 'Voucher_Card_1',
                output: 'voucherCard1'
            },
            {
                input: 'Anniversary_Card',
                output: 'anniversaryCard'
            },
            {
                input: '1_2_3',
                output: '123'
            }
        ];

        // Act & Assert
        await Promise.all(tests.map(({ input, output }) => expect(normaliseCardType(input)).toBe(output)));
    });

    it('Should return the input if type is not equal to string', async () => {
        // Assemble
        const tests = [
            undefined,
            null,
            123,
            {},
            []
        ];

        // Act & Assert
        await Promise.all(tests.map(input => expect(normaliseCardType(input)).toBe(input)));
    });
});
