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
            },
            $flattenParams () {
                return [
                    {
                        name: 'required',
                        params: {
                            type: 'required'
                        },
                        path: ['otherValidation']
                    },
                    {
                        name: 'minLength',
                        params: {
                            type: 'minLength',
                            min: 10
                        },
                        path: ['minLengthValidation']
                    },
                    {
                        name: 'required',
                        params: {
                            type: 'required'
                        },
                        path: ['yetAnotherValidation']
                    }
                ];
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

    it('should handle nested validation objects and return the full path of them in valid and invalid fields', () => {
        // Arrange
        const v = {
            $params: {
                parentObjectValidation: {},
                minLengthValidation: {},
                yetAnotherValidation: {}
            },
            minLengthValidation: {
                $invalid: false
            },
            parentObjectValidation: {
                $invalid: true,
                childObjectValidation: {
                    $invalid: true,
                    grandChildObjectValidation: {
                        $invalid: true
                    }
                }
            },
            yetAnotherValidation: {
                $invalid: true
            },
            $flattenParams () {
                return [
                    {
                        name: 'required',
                        params: {
                            type: 'required'
                        },
                        path: ['parentObjectValidation', 'childObjectValidation', 'grandChildObjectValidation']
                    },
                    {
                        name: 'minLength',
                        params: {
                            type: 'minLength',
                            min: 50
                        },
                        path: ['parentObjectValidation', 'childObjectValidation', 'grandChildObjectValidation']
                    },
                    {
                        name: 'minLength',
                        params: {
                            type: 'minLength',
                            min: 10
                        },
                        path: ['minLengthValidation']
                    },
                    {
                        name: 'required',
                        params: {
                            type: 'required'
                        },
                        path: ['yetAnotherValidation']
                    }
                ];
            }
        };

        // Act
        const actual = getFormValidationState(v);

        // Assert
        expect(actual).toStrictEqual({
            validFields: ['minLengthValidation'],
            invalidFields: ['parentObjectValidation.childObjectValidation.grandChildObjectValidation', 'yetAnotherValidation']
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
    ])('should validate %s as %s with `en-GB` locale', (postcode, expected) => {
        // Act
        const actual = isValidPostcode(postcode, 'en-GB');

        // Assert
        expect(actual).toBe(expected);
    });

    it.each([
        ['01000', true],
        ['52430', true],
        ['342567', false],
        ['4521', false],
        ['AR51 1AA', false],
        ['ATEGD', false],
        ['00 000', false],
        ['23', false],
        ['not even trying', false],
        ['01!23', false],
        ['', false],
        [null, false]
    ])('should validate %s as %s with `es-ES` locale', (postcode, expected) => {
        // Act
        const actual = isValidPostcode(postcode, 'es-ES');

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
    ])('should validate %s as %s with `en-GB` locale', (number, expected) => {
        // Act
        const actual = isValidPhoneNumber(number, 'en-GB');

        // Assert
        expect(actual).toBe(expected);
    });

    it.each([
        ['111111111', true],
        ['11111111', false],
        ['!askfjt%$', false],
        ['not even trying', false],
        ['', false],
        [null, false]
    ])('should validate %s as %s with `es-ES` locale', (number, expected) => {
        // Act
        const actual = isValidPhoneNumber(number, 'es-ES');

        // Assert
        expect(actual).toBe(expected);
    });
});
