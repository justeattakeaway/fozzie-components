import LocationGoogle from '..';
import { loadGoogleMapsMocks } from '../../../../utils/testHelpers/testHelpers';

describe('`LocationGoogle`', () => {
    let service;
    let googleMapsMock;

    beforeEach(() => {
        googleMapsMock = loadGoogleMapsMocks();
        jest.spyOn(window.google.maps.places, 'AutocompleteService');
        jest.spyOn(window.google.maps.places, 'PlacesService');
        jest.spyOn(window.google.maps, 'Geocoder');
        window.google.maps.places.AutocompleteSessionToken = jest.fn();
        service = LocationGoogle();
    });

    describe('`getLocationDetails`', () => {
        describe('when invoked', () => {
            beforeEach(() => {
                service.clientInit();
                googleMapsMock.placesGetDetails.mockImplementation((object, callback) => {
                    callback({});
                });
            });

            it('should call getDetails method on google maps places service', () => {
                const placeId = 123;

                return service.getLocationDetails(placeId).then(() => {
                    expect(googleMapsMock.placesGetDetails).toHaveBeenCalledWith(
                        expect.objectContaining({ placeId }),
                        expect.any(Function)
                    );
                });
            });
        });
    });

    describe('`getLocationFromGeo`', () => {
        beforeEach(() => {
            service.clientInit();
            googleMapsMock.geoGetGeoCode.mockImplementation((object, callback) => {
                callback([]);
            });
        });

        it('should call geocode method on google maps geocoder', () => {
            // Act & Assert
            service.getLocationFromGeo().then(() => {
                expect(googleMapsMock.geoGetGeoCode).toHaveBeenCalledWith({
                    location: expect.any(Object)
                }, expect.any(Function));
            });
        });

        it('should call latlng method on google maps latlng service', () => {
            // Arrange
            const args = [123, 456];

            // Act & Assert
            return service.getLocationFromGeo(...args).then(() => {
                expect(googleMapsMock.latLng).toHaveBeenCalledWith(...args);
            });
        });
    });

    describe('`searchLocations`', () => {
        beforeEach(() => {
            service.clientInit();
            googleMapsMock.autoCompleteGetPlace.mockImplementation((object, callback) => {
                callback([]);
            });
        });

        describe('when invoked', () => {
            it('should call `getPlacePredictions` method on google maps `autocomplete` service', () => {
                // Arrange
                const address = 'my address';
                const country = 'my country';
                const arg = {
                    componentRestrictions: { country },
                    input: address
                };

                // Act & Assert
                return service.searchLocations(address, country).then(() => {
                    expect(googleMapsMock.autoCompleteGetPlace).toHaveBeenCalledWith(
                        expect.objectContaining(arg),
                        expect.any(Function)
                    );
                });
            });

            it('should pass `sessionToken` to `getPlacePredictions`', () => service.searchLocations('address', 'country').then(() => {
                expect(googleMapsMock.autoCompleteGetPlace).toHaveBeenCalledWith(
                    expect.objectContaining({ sessionToken: service.getSessionToken() }),
                    expect.any(Function)
                );
            }));

            it('should keep the `sessionToken` the same for subsequent calls', () => service.searchLocations('address', 'country').then(() => {
                const newToken = service.getSessionToken();
                expect(newToken).toBe(service.getSessionToken());
            }));
        });
    });

    describe('method definitions', () => {
        beforeEach(() => {
            googleMapsMock.autoCompleteGetPlace.mockImplementation((object, callback) => {
                callback([]);
            });
        });

        it('should be defined on the wrapper', () => {
            expect(service.getLocationDetails).toBeDefined();
            expect(service.getLocationFromGeo).toBeDefined();
            expect(service.searchLocations).toBeDefined();
        });

        it('should return an instance of a `promise`', () => {
            // Arrange
            service.clientInit();

            // Act & Assert
            expect(service.getLocationDetails()).toBeInstanceOf(Promise);
            expect(service.getLocationFromGeo()).toBeInstanceOf(Promise);
            expect(service.searchLocations()).toBeInstanceOf(Promise);
        });
    });
});

