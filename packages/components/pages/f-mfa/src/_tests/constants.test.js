import { MFA_CODE_REGEX, RETURN_URL_REGEX } from '../constants';

describe('Regex :: ', () => {
    describe('MFA code', () => {
        it.each([
            'abcdefghijklmnopqrstuvwxyz',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            '12345678900987654321',
            '12345_67890-12345_67890',
            'Aa1-Bb2-Cc3Dd4Ee5_Ff6Gg7Hh8-Ii9-Jj10'
        ])('should allow %s', testString => {
            // Act
            const result = MFA_CODE_REGEX.test(testString);

            // Assert
            expect(result).toBe(true);
        });

        it.each([
            '1',
            '1234567890abcdefghi', // Length 19
            'AAAAAAAAAAaaaaaaaaaa1111111111BBBBBBBBBBbbbbbbbbbb2222222222C', // Length 61
            'Aa1&Bb2-Cc3+Dd4Ee5_Ff6/Gg7Hh8=Ii9-Jj10' // Illegal characters
        ])('should disallow %s', testString => {
            // Act
            const result = MFA_CODE_REGEX.test(testString);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('return URL', () => {
        it.each([
            '%2F',
            '/',
            '',
            'help',
            '/help',
            '/account/login?notification=true',
            '/checkout?lat=50.1&lon=1.3',
            '%2faccount%2flogin'
        ])('should allow %s', testString => {
            // Act
            const result = RETURN_URL_REGEX.test(testString);

            // Assert
            expect(result).toBe(true);
        });

        it.each([
            'deliveroo.com',
            '<script>alert("test")</script>',
            '%3Cscript%3Ealert(%22test%22)%3C%2Fscript%3E',
            "%253Cscript%253Ealert('XSS')%253C%252Fscript%253E",
            "%253cscript%253ealert('XSS')%253c%252fscript%253e",
            '%253c',
            '%253C',
            '%253e',
            '%253E',
            '%252f',
            '%252F',
            '..%252F..%252F',
            '../',
            '.%252F/passwd'
        ])('should disallow %s', testString => {
            // Act
            const result = RETURN_URL_REGEX.test(testString);

            // Assert
            expect(result).toBe(false);
        });
    });
});
