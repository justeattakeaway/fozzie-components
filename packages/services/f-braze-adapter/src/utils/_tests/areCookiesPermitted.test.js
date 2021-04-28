import CookieHelper from 'js-cookie';

import areCookiesPermitted from '../areCookiesPermitted';

jest.mock('js-cookie');

describe('f-braze-adapter › areCookiesPermitted', () => {
    it('should be a function', () => {
        // Assert
        expect(areCookiesPermitted).toBeInstanceOf(Function);
    });

    describe('when called', () => {
        it('should query the value of `je-cookieConsent` cookie', () => {
            // Act
            areCookiesPermitted();

            // Assert
            expect(CookieHelper.get).toHaveBeenCalledWith('je-cookieConsent');
        });

        it.each([
            [true, 'full'],
            [false, 'necessary'],
            [false, null]
        ])('should return `%p` when `je-cookieConsent` is `%p`', (expected, cookieValue) => {
            // Arrange
            CookieHelper.get.mockReturnValue(cookieValue);

            // Act & Assert
            expect(areCookiesPermitted()).toBe(expected);
        });
    });
});
