import * as generalServices from '../general.services';
import * as helpers from '../../utils/helpers';
import { LOCATION_COOKIE_PROPS } from '../constants';

describe('`general.services`', () => {
    describe('`processLocationCookie`', () => {
        it('should exist', () => {
            expect(generalServices.processLocationCookie).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `shouldSetCookie` is set to `false`', () => {
                it('should return `false`', () => {
                    expect(generalServices.processLocationCookie()).toBe(false);
                });
            });

            describe('AND `shouldSetCookie` is set to `true` & `address` matches the correct `type` `string`', () => {
                it('should invoke `setCookie` to manually set a location cookie for `je-location`', () => {
                    // Arrange
                    const address = 'AR511AR';
                    const spy = jest.spyOn(helpers, 'setCookie');

                    // Act
                    generalServices.processLocationCookie(true, address);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('je-location', address, 365);
                });
            });

            describe('AND `shouldSetCookie` is set to `true` & `address` does not match the `type` `string`', () => {
                it('should invoke `setCookie` to manually set location cookies for `je-location`', () => {
                    // Arrange
                    const address = {
                        postcode: 'AR511AR'
                    };

                    const spy = jest.spyOn(helpers, 'setCookie');

                    // Act
                    generalServices.processLocationCookie(true, address);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('je-location', address.postcode, 365);
                });

                it.each(LOCATION_COOKIE_PROPS)('set cookies correctly "%s"', type => {
                    // Arrange
                    const address = {
                        sublocality: 'spectroscopic',
                        unitNumber: 'Galactic interstellar',
                        street: 'Earth\'s northern hemisphere',
                        houseNo: '1',
                        city: 'H II',
                        state: 'state'
                    };

                    const spy = jest.spyOn(helpers, 'setJeCookie');

                    // Act
                    generalServices.processLocationCookie(true, address);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(type, address[type]);
                });
                
                it('should set the `latitude` & `longitude` if the address response contain them', () => {
                    // Arrange
                    const address = {
                        latitude: 1.1,
                        longitude: 1.2
                    };
    
                    const spy = jest.spyOn(helpers, 'setJeCookie');
    
                    // Act
                    generalServices.processLocationCookie(true, address);
    
                    // Assert
                    expect(spy).toHaveBeenCalledWith('latitude', 1.1);
                    expect(spy).toHaveBeenCalledWith('longitude', 1.2);
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
