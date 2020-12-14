import {
    isPostcodeEmpty,
    doesPostcodeMatchRegex,
    normalisePostcode,
    safeParseJson
} from '../helpers';

describe('helpers', () => {
    describe('`isPostcodeEmpty`', () => {
        it('should exist', () => {
            expect(isPostcodeEmpty).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a value is passed in', () => {
                it('should return `falsy` to indicate a value was populated', () => {
                    // Arrange
                    const postcode = 'AR51 1AR';

                    // Act
                    const result = isPostcodeEmpty(postcode);

                    // Assert
                    expect(result).toBe(false);
                });
            });

            describe('AND a value is NOT passed in', () => {
                it('should return `truthy` to indicate a value was not populated', () => {
                    // Act
                    const result = isPostcodeEmpty('');

                    // Assert
                    expect(result).toBe(true);
                });
            });
        });
    });

    describe('`doesPostcodeMatchRegex`', () => {
        it('should exist', () => {
            expect(doesPostcodeMatchRegex).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND the postcode passed in passes the regex test', () => {
                it('should return `truthy`', () => {
                    // Arrange
                    const postcode = 'AR51 1AR';

                    // Act
                    const result = doesPostcodeMatchRegex(postcode);

                    // Assert
                    expect(result).toBe(true);
                });
            });

            describe('AND the postcode passed in does not pass the regex test', () => {
                it('should return `falsy`', () => {
                    // Arrange
                    const postcode = 'NOT A POSTCODE';

                    // Act
                    const result = doesPostcodeMatchRegex(postcode);

                    // Assert
                    expect(result).toBe(false);
                });
            });
        });
    });

    describe('`normalisePostcode`', () => {
        it('should exist', () => {
            expect(normalisePostcode).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a postcode is passed in', () => {
                it('should return a normalised postcode format, i.e set it to uppercase & remove spaces.', () => {
                    // Arrange
                    const postcode = 'ar51 1ar';

                    // Act
                    const result = normalisePostcode(postcode);

                    // Assert
                    expect(result).toBe('AR511AR');
                });
            });

            describe('AND there\'s no postcode passed in', () => {
                it('should return an empty string', () => {
                    // Arrange
                    const postcode = '';

                    // Act
                    const result = normalisePostcode(postcode);

                    // Assert
                    expect(result).toBe('');
                });
            });
        });
    });

    describe('`safeParseJson`', () => {
        it('should exist', () => {
            expect(safeParseJson).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a valid string is passed in as a param', () => {
                it('should return a parsed JSON value', () => {
                    // Arrange
                    const json = '{"Apophis": "99942", "isNearEarth": true }';

                    // Act
                    const result = safeParseJson(json);

                    // Assert
                    expect(result).toEqual({
                        Apophis: '99942',
                        isNearEarth: true
                    });
                });
            });

            describe('AND the string provided is invalid i.e contains invalid JSON syntax', () => {
                it('should return `null`', () => {
                    // Arrange
                    // Invalid json example which will throw.
                    const json = '{"Apophis": "99942 }';

                    // Act
                    const result = safeParseJson(json);

                    // Assert
                    expect(result).toBe(null);
                });
            });
        });
    });
});
