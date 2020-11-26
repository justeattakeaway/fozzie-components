import * as generalServices from '../general.services';
import * as helpers from '../../utils/helpers';

describe('`general.services`', () => {
    describe('`processLocationCookie`', () => {
        it('should exist', () => {
            expect(generalServices.processLocationCookie).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `shouldSetCookie` is not defined', () => {
                it('should return `false`', () => {
                    expect(generalServices.processLocationCookie()).toBe(false);
                });
            });

            describe('AND `shouldSetCookie` is defined & `address` matches the correct `type`', () => {
                it('should invoke `setCookie` to manually set a location cookie', () => {
                    // Arrange
                    const address = 'AR511AR';
                    const spy = jest.spyOn(helpers, 'setCookie');

                    // Act
                    generalServices.processLocationCookie(true, address);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('je-location', address, 365);
                });
            });
        });
    });

    describe('`onCustomSubmit`', () => {
        it('should exist', () => {
            expect(generalServices.onCustomSubmit).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a custom submit handler is provided', () => {
                it('should `preventDefault`', () => {
                    // Arrange
                    const event = { preventDefault: jest.fn() };

                    // Act
                    generalServices.onCustomSubmit(() => {}, 'AR511AR', event);

                    // Assert
                    expect(event.preventDefault).toHaveBeenCalled();
                });
            });

            describe('AND a custom submit handler is NOT provided', () => {
                it('should `preventDefault`', () => {
                    // Arrange
                    const event = { preventDefault: jest.fn() };

                    // Act
                    generalServices.onCustomSubmit(false, 'AR511AR', event);

                    // Assert
                    expect(event.preventDefault).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('`generateFormQueryUrl`', () => {
        it('should exist', () => {
            expect(generalServices.generateFormQueryUrl).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `queryString` & `formUrl` exist', () => {
                it('should return a `formUrl` with a `queryString` appended', () => {
                    // Arrange
                    const formUrl = 'aquila/theEagle';
                    const queryString = {
                        genitive: 'Aquilae'
                    };

                    // Act
                    const result = generalServices.generateFormQueryUrl(
                        queryString,
                        formUrl
                    );

                    // Assert
                    expect(result).toBe('aquila/theEagle?genitive=Aquilae');
                });

                it('should return a `formUrl` with multiple `queryString` key/values appended if more than one is defined', () => {
                    // Arrange
                    const formUrl = 'aquila/theEagle';
                    const queryString = {
                        genitive: 'Aquilae',
                        celestial: 'equator'
                    };

                    // Act
                    const result = generalServices.generateFormQueryUrl(
                        queryString,
                        formUrl
                    );

                    // Assert
                    expect(result).toBe('aquila/theEagle?genitive=Aquilae&celestial=equator');
                });
            });

            describe('AND `queryString` is not populated', () => {
                it('should return the `formUrl` value', () => {
                    // Arrange
                    const formUrl = 'aquila/theEagle';

                    // Act
                    const result = generalServices.generateFormQueryUrl(
                        '',
                        formUrl
                    );

                    // Assert
                    expect(result).toBe(formUrl);
                });
            });

            describe('AND `formUrl` is not populated', () => {
                it('should return the `formUrl` value', () => {
                    // Arrange
                    const queryString = {
                        genitive: 'Aquilae',
                        celestial: 'equator'
                    };

                    // Act
                    const result = generalServices.generateFormQueryUrl(
                        queryString,
                        ''
                    );

                    // Assert
                    expect(result).toBe('');
                });
            });
        });
    });
});
