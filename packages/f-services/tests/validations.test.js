import validations from '../src/validations';

const { getFormValidationState, isValidPostcode, isValidPhoneNumber } = validations;

describe('getFormValidationState', () => {
    it('should separate valid and invalid fields', () => {
        // Arrange
        const v = {
            $params: {
                minLengthValidation: {},
                otherValidation: {},
                yetAnotherValidation: {}
            },
            minLengthValidation: {
                $invalid: false
            },
            otherValidation: {
                $invalid: true
            },
            yetAnotherValidation: {
                $invalid: true
            }
        };

        // Act
        const actual = getFormValidationState(v);

        // Assert
        expect(actual).toStrictEqual({
            validFields: ['minLengthValidation'],
            invalidFields: ['otherValidation', 'yetAnotherValidation']
        });
    });
});

describe('isValidPostcode', () => {
    it.each([
        ['AR51 1AA', true],
        ['BS1 4DJ', true],
        ['bs14dj', true],
        ['ec4m 7rf', true],
        ['EC4M7RF', true],
        ['A11A', false],
        ['TEST1A', false],
        ['not even trying', false],
        ['BS! 4DJ', false],
        ['', false],
        [null, false]
    ])('should validate %s as %s', (postcode, expected) => {
        // Act
        const actual = isValidPostcode(postcode);

        // Assert
        expect(actual).toBe(expected);
    });
});

describe('isValidPhoneNumber', () => {
    it.each([
        ['0711111111', true],
        ['+447111111111', true],
        ['0711 1111 111', false],
        ['07111', false],
        ['07!!!!', false],
        ['not even trying', false],
        ['', false],
        [null, false]
    ])('should validate %s as %s', (number, expected) => {
        // Act
        const actual = isValidPhoneNumber(number);

        // Assert
        expect(actual).toBe(expected);
    });
});
