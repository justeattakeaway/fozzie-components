import LocationGoogle from '..';
import { loadGoogleMapsMocks } from '../../../../utils/tests/testHelpers';

xdescribe('`LocationGoogle`', () => {
    let service;

    beforeEach(() => {
        service = LocationGoogle();
    });

    describe('`getLocationDetails`', () => {
        describe('when invoked', () => {
            let googleMapsMock;

            beforeEach(() => {
                googleMapsMock = loadGoogleMapsMocks();
                service.clientInit();
                googleMapsMock.placesGetDetails.mockImplementation((object, callback) => {
                    callback({});
                });
            });

            it('should call getDetails method on google maps places service', () => {
                const placeId = 123;

                service.getLocationDetails(placeId).then(() => {
                    expect(googleMapsMock.placesGetDetails).toHaveBeenCalledWith(
                        expect.objectContaining({ placeId }),
                        expect.any(Function)
                    );
                });
            });
        });
    });

    describe('`getLocationFromGeo`', () => {
        let googleMapsMock;

        beforeEach(() => {
            googleMapsMock = loadGoogleMapsMocks();
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
                }, jest.any(Function));
            });
        });

        it('should call latlng method on google maps latlng service', () => {
            // Arrange
            const args = [123, 456];

            // Act & Assert
            service.getLocationFromGeo(...args).then(() => {
                expect(googleMapsMock.latLng).toHaveBeenCalledWith(...args);
            });
        });
    });

    describe('`searchLocations`', () => {
        let googleMapsMock;

        beforeEach(() => {
            service.clientInit();
            googleMapsMock = loadGoogleMapsMocks();
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
                service.searchLocations(address, country).then(() => {
                    expect(googleMapsMock.autoCompleteGetPlace).toHaveBeenCalledWith(
                        expect.objectContaining(arg),
                        jest.any(Function)
                    );
                });
            });

            it('should pass `sessionToken` to `getPlacePredictions`', () => {
                service.searchLocations('address', 'country').then(() => {
                    expect(googleMapsMock.autoCompleteGetPlace).toHaveBeenCalledWith(
                        expect.objectContaining({ sessionToken: service.getSessionToken() }),
                        jest.any(Function)
                    );
                });
            });

            it('should keep the `sessionToken` the same for subsequent calls', () => {
                service.searchLocations('address', 'country').then(() => {
                    const newToken = service.getSessionToken();
                    expect(newToken).toBe(service.getSessionToken());
                });
            });
        });
    });

    describe('method definitions', () => {
        let googleMapsMock;

        beforeEach(() => {
            googleMapsMock = loadGoogleMapsMocks();
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

