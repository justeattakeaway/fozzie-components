import CookieHelper from 'js-cookie';

import areCookiesPermitted, {
    consentCookieName,
    consentCookieValue,
    legacyBannerCookieName,
    legacyBannerCookieValue
} from '../areCookiesPermitted';

jest.mock('js-cookie');

describe('f-braze-adapter › areCookiesPermitted', () => {
    it('should be a function', () => {
        // Assert
        expect(areCookiesPermitted).toBeInstanceOf(Function);
    });

    describe('when called', () => {
        it(`should query the value of \`${consentCookieName}\` cookie`, () => {
            // Act
            areCookiesPermitted();

            // Assert
            expect(CookieHelper.get).toHaveBeenCalledWith(consentCookieName);
        });

        it.each([
            [true, consentCookieValue],
            [false, 'necessary'],
            [false, null]
        ])(`should return \`%p\` when \`${consentCookieName}\` is \`%p\``, (expected, cookieValue) => {
            // Arrange
            CookieHelper.get.mockReturnValue(cookieValue);

            // Act & Assert
            expect(areCookiesPermitted()).toBe(expected);
        });

        describe(`and when the value of the \`${consentCookieName}\` cookie is not \`${consentCookieValue}\``, () => {
            beforeEach(() => {
                CookieHelper.get.mockReturnValueOnce(null);
            });

            it(`should query the value of \`${legacyBannerCookieName}\` cookie`, () => {
                // Act
                areCookiesPermitted();

                // Assert
                expect(CookieHelper.get).toHaveBeenCalledWith(legacyBannerCookieName);
            });

            it.each([
                [true, legacyBannerCookieValue],
                [false, null]
            ])(`should return \`%p\` when \`${legacyBannerCookieName}\` is \`%p\``, (expected, cookieValue) => {
                // Arrange
                CookieHelper.get.mockReturnValue(cookieValue);

                // Act & Assert
                expect(areCookiesPermitted()).toBe(expected);
            });
        });
    });
});
