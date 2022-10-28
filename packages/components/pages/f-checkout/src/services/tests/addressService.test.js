import { when } from 'jest-when';
import addressService from '../addressService';
import localStorageMock from '../../../test-utils/local-storage/local-storage-mock';
import { Addresses } from '../../../stories/helpers/addresses';

const area511Line = {
    City: 'Area 51',
    ZipCode: 'AR51 1AA',
    IsDefault: false,
    Line1: '1 Test Road',
    Line2: null,
    Line3: null
};

const bristol2Lines = {
    City: 'Bristol',
    ZipCode: 'BS1 1AA',
    IsDefault: false,
    Line1: '1 Bristol Road',
    Line2: 'Flat 1',
    Line3: null
};

const london3LinesDefault = {
    City: 'London',
    ZipCode: 'EC4M 7RF',
    IsDefault: true,
    Line1: 'Fleet Place House',
    Line2: 'Farringdon',
    Line3: 'City of London'
};

const defaultAustraliaId = 17731860;

const australiaAddressDefault = {
    City: 'Sydney',
    ZipCode: '2089',
    Line1: '196 Kurraba Road',
    Line2: 'Unit 5',
    Line3: 'Neutral Bay',
    Line4: 'New South Wales',
    AddressId: defaultAustraliaId
};

const australiaAddressAdditional = {
    City: 'Melbourne',
    ZipCode: '3071',
    Line1: '94 Shaftesbury Parade',
    Line2: null,
    Line3: 'Thornbury',
    Line4: 'Victoria',
    AddressId: 18086210
};

describe('addressService', () => {
    describe('getClosestAddress ::', () => {
        const ukAddressesData = { Addresses: [area511Line, bristol2Lines, london3LinesDefault] };
        const auAddressesData = { Addresses: [australiaAddressDefault, australiaAddressAdditional], DefaultAddress: defaultAustraliaId };
        const itAddressesData = Addresses.it;

        describe.each([
            ['uk', ukAddressesData],
            ['au', auAddressesData],
            ['it', itAddressesData]
        ])('when tenant === `%s` AND last searched postcode is not present', (tenant, addressData) => {
            const postcode = '';

            it('should return empty address if addresses is empty', () => {
                // Act
                const actual = addressService.getClosestAddress({}, tenant, postcode);

                // Assert
                expect(actual).toMatchSnapshot();
            });

            it('should return default address if default address is present', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcode);

                // Assert
                expect(actual).toMatchSnapshot();
            });
        });

        describe.each([
            ['uk', ukAddressesData],
            ['au', auAddressesData],
            ['it', itAddressesData]
        ])('when tenant === `%s` AND last searched postcode is present', (tenant, addressData) => {
            const postcodeTypes = {
                noMatch: {
                    au: '4278',
                    it: '35674',
                    uk: 'EN1 1AA'
                },
                noMatchOrSpaces: {
                    au: '4278',
                    it: '35674',
                    uk: 'EN11AA'
                },
                match: {
                    au: '2089',
                    it: '26844',
                    uk: 'BS1 1AA'
                },
                matchNoSpaces: {
                    au: '2089',
                    it: '26844',
                    uk: 'EC4M7RF'
                },
                partial: {
                    au: '30',
                    it: '20',
                    uk: 'AR51'
                }
            };

            it('should return empty address with postcode set, when postcode does not match', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcodeTypes.noMatch[tenant]);

                // Assert
                expect(actual).toMatchSnapshot();
            });

            it('should return empty address with formatted postcode set, when postcode does not match and has no spaces', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcodeTypes.noMatchOrSpaces[tenant]);

                // Assert
                expect(actual).toMatchSnapshot();
            });

            it('should return address with full postcode match', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcodeTypes.match[tenant]);

                // Assert
                expect(actual).toMatchSnapshot();
            });

            it('should return address with full postcode match when address has no spaces', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcodeTypes.matchNoSpaces[tenant]);

                // Assert
                expect(actual).toMatchSnapshot();
            });

            it('should return address with postcode partial match', () => {
                // Act
                const actual = addressService.getClosestAddress(addressData, tenant, postcodeTypes.partial[tenant]);

                // Assert
                expect(actual).toMatchSnapshot();
            });
        });
    });

    describe('isAddressInLocalStorage ::', () => {
        describe('if localStorage exists', () => {
            beforeEach(() => {
                Object.defineProperty(window, 'localStorage', { value: localStorageMock });
            });

            afterEach(() => {
                window.localStorage.clear();
                jest.resetAllMocks();
            });

            describe('when the address does NOT exist in local storage', () => {
                it('should return false', () => {
                    expect(addressService.isAddressInLocalStorage()).toBe(false);
                });
            });

            describe('when the address does exist in local storage', () => {
                it('should return true if there is a postcode', async () => {
                    // Arrange
                    window.localStorage.setItem('je-full-address-details', JSON.stringify(london3LinesDefault));

                    // Act & Assert
                    expect(addressService.isAddressInLocalStorage()).toBe(true);
                });

                it('should return false if the customer only searched a postcode', async () => {
                    // Arrange
                    window.localStorage.setItem('je-full-address-details', JSON.stringify({
                        City: null,
                        Field1: null,
                        Field2: null,
                        Line1: null,
                        Line2: null,
                        Line3: null,
                        Line4: null,
                        Line5: null,
                        PostalCode: null,
                        searchBoxAddress: 'BS3 4RL'
                    }));

                    // Act & Assert
                    expect(addressService.isAddressInLocalStorage()).toBe(false);
                });
            });
        });

        describe('if localStorage does NOT exist', () => {
            beforeAll(() => {
                Object.defineProperty(window, 'localStorage', { value: null });
            });

            afterAll(() => {
                window.localStorage.clear();
                jest.resetAllMocks();
            });

            it('should return false', () => {
                // Assert
                expect(addressService.isAddressInLocalStorage()).toBe(false);
            });
        });
    });

    describe('getAddressFromLocalStorage ::', () => {
        beforeEach(() => {
            Object.defineProperty(window, 'localStorage', { value: localStorageMock });
        });

        afterEach(() => {
            window.localStorage.clear();
            jest.resetAllMocks();
        });

        describe('when the address does NOT exist in local storage', () => {
            it('should return null', () => {
                // Assert
                expect(addressService.getAddressFromLocalStorage()).toBe(null);
            });
        });

        describe('when the address does exist in local storage', () => {
            it('should return the address mapped correctly', () => {
                // Arrange
                const expectedAddress = {
                    line1: 'Fleet Place House',
                    line2: 'Farringdon',
                    locality: 'London',
                    postcode: 'EC4M 7RF'
                };
                window.localStorage.setItem('je-full-address-details', JSON.stringify(london3LinesDefault));

                // Act & Assert
                expect(addressService.getAddressFromLocalStorage('uk')).toEqual(expectedAddress);
            });
        });
    });

    describe('getAddressCoords ::', () => {
        it('should return coordinates in correct order', () => {
            // Arrange
            const address = {
                Line1: 'Flat 101',
                Line2: 'Made Up House',
                Line3: 'Camden Town',
                Line4: '',
                Line5: '',
                City: 'London',
                Field1: '51.529747',
                Field2: '-0.142396',
                PostalCode: 'NW1 4DE',
                searchBoxAddress: 'NW1 4DE'
            };

            const expectedCoords = ['51.529747', '-0.142396'];

            // Act & Assert
            expect(addressService.getAddressCoords(address)).toEqual(expectedCoords);
        });

        it('should return coordinates in reverse order if shouldReverse is truthy', () => {
            // Arrange
            const address = {
                Line1: 'Flat 101',
                Line2: 'Made Up House',
                Line3: 'Camden Town',
                Line4: '',
                Line5: '',
                City: 'London',
                Field1: '51.529747',
                Field2: '-0.142396',
                PostalCode: 'NW1 4DE',
                searchBoxAddress: 'NW1 4DE'
            };

            const expectedCoords = ['-0.142396', '51.529747'];

            // Act & Assert
            expect(addressService.getAddressCoords(address, true)).toEqual(expectedCoords);
        });

        it('should return null if coordinates are missing in address', () => {
            // Arrange
            const address = {
                Line1: 'Flat 101',
                Line2: 'Made Up House',
                Line3: 'Camden Town',
                Line4: '',
                Line5: '',
                City: 'London',
                Field1: null,
                Field2: null,
                PostalCode: 'NW1 4DE',
                searchBoxAddress: 'NW1 4DE'
            };

            // Act & Assert
            expect(addressService.getAddressCoords(address)).toEqual(null);
        });
    });

    describe('getAddressFromCookie ::', () => {
        const tenant = 'au';
        it('when the input cookies parameter is invalid should return null', () => {
            // Arrange
            const invalidCookies = {};
            // Act & Assert
            expect(addressService.getAddressFromCookie(tenant, invalidCookies)).toBe(null);
        });

        it('when the address does NOT exists in cookies returns null', () => {
            // Arrange
            const emptyCookies = { get: jest.fn().mockReturnValue(null) };
            // Act & Assert
            expect(addressService.getAddressFromCookie(tenant, emptyCookies)).toBe(null);
        });

        it('when the address in cookies is incomplete returns null', () => {
            // Arrange
            const get = jest.fn();
            when(get).calledWith('je-last_houseNo_used').mockReturnValue('1');
            const incompleteCookies = { get };

            // Act & Assert
            expect(addressService.getAddressFromCookie(tenant, incompleteCookies)).toBe(null);
        });

        describe('when the address does exist in cookies', () => {
            let get;
            let cookies;
            const houseNumber = '35';
            const street = 'Myrtle Bank Road';
            const unitNumber = 'Flat 1';
            const latitude = '54.24';
            const longitude = '0.24';
            const sublocality = '1';
            const state = 'TAS';
            const postalCode = '7259';
            const city = 'Myrtle Bank';
            const searchBoxAddress = '35 Myrtle Bank Road Flat 1, Myrtle Bank 7259 TAS, Australia';

            beforeEach(() => {
                // Arrange - cookies
                get = jest.fn();
                when(get).calledWith('je-last_houseNo_used').mockReturnValue(houseNumber);
                when(get).calledWith('je-last_street_used').mockReturnValue(street);
                when(get).calledWith('je-last_unitNumber_used').mockReturnValue(unitNumber);
                when(get).calledWith('je-last_latitude_used').mockReturnValue(latitude);
                when(get).calledWith('je-last_longitude_used').mockReturnValue(longitude);
                when(get).calledWith('je-last_sublocality_used').mockReturnValue(sublocality);
                when(get).calledWith('je-last_state_used').mockReturnValue(state);
                when(get).calledWith('je-location').mockReturnValue(postalCode);
                when(get).calledWith('je-last_city_used').mockReturnValue(city);
                when(get).calledWith('je-last_suggestion_used').mockReturnValue(searchBoxAddress);
                cookies = { get };
            });

            it('return correct address', () => {
                // Arrange
                const expectedAddress = {
                    line1: `${houseNumber} ${street}`,
                    line2: unitNumber,
                    locality: city,
                    administrativeArea: state,
                    postcode: postalCode
                };

                // Act & Assert
                expect(addressService.getAddressFromCookie(tenant, cookies)).toStrictEqual(expectedAddress);
            });

            it('return correct unformatted address when mapped is falsy', () => {
                // Arrange
                const expectedAddress = {
                    Line1: `${houseNumber} ${street}`,
                    Line2: unitNumber,
                    Line3: sublocality,
                    administrativeArea: state,
                    City: city,
                    PostalCode: postalCode,
                    Field1: latitude,
                    Field2: longitude,
                    searchBoxAddress
                };
                // Act & Assert
                expect(addressService.getAddressFromCookie(tenant, cookies, false)).toStrictEqual(expectedAddress);
            });
        });
    });

    describe('doesAddressInStorageAndFormMatch ::', () => {
        describe('when the address fields are the same', () => {
            it('should return true', () => {
                // Arrange
                const storageAddress = {
                    Line1: 'Fleet Place House',
                    Line2: 'Farringdon',
                    City: 'London',
                    PostalCode: 'EC4M 7RF'
                };

                const formAddress = {
                    line1: 'Fleet Place House',
                    line2: 'Farringdon',
                    locality: 'London',
                    postcode: 'EC4M 7RF'
                };

                // Act & Assert
                expect(addressService.doesAddressInStorageAndFormMatch(storageAddress, formAddress)).toEqual(true);
            });
        });

        describe('when the city field is different', () => {
            it('should return false', () => {
                // Arrange
                const storageAddress = {
                    Line1: 'Fleet Place House',
                    Line2: 'Farringdon',
                    City: 'Newcastle',
                    PostalCode: 'EC4M 7RF'
                };

                const formAddress = {
                    line1: 'Fleet Place House',
                    line2: 'Farringdon',
                    locality: 'London',
                    postcode: 'EC4M 7RF'
                };

                // Act & Assert
                expect(addressService.doesAddressInStorageAndFormMatch(storageAddress, formAddress)).toEqual(false);
            });
        });

        describe('when the postcode is different', () => {
            it('should return false', () => {
                // Arrange
                const storageAddress = {
                    Line1: 'Fleet Place House',
                    Line2: 'Farringdon',
                    City: 'London',
                    PostalCode: 'EC4M 7RF'
                };

                const formAddress = {
                    line1: 'Fleet Place House',
                    line2: 'Farringdon',
                    locality: 'London',
                    postcode: 'EC4M 7RE'
                };

                // Act & Assert
                expect(addressService.doesAddressInStorageAndFormMatch(storageAddress, formAddress)).toEqual(false);
            });
        });
    });

    describe('setAddressInLocalStorage ::', () => {
        const addressDetails = {
            postcode: 'TA3 1SS',
            line1: '86 Pier Road',
            line2: 'Flat 1',
            line3: null,
            line4: null,
            administrativeArea: null,
            locality: 'Stapley'
        };

        describe('when local storage is available', () => {
            it('save address in local storage correctly', () => {
                // Arrange
                const spy = jest.spyOn(window.localStorage, 'setItem');
                const expectedValue = JSON.stringify({
                    PostalCode: addressDetails.postcode,
                    Line1: addressDetails.line1,
                    Line2: addressDetails.line2,
                    Line3: addressDetails.line3,
                    Line4: addressDetails.line4,
                    administrativeArea: addressDetails.administrativeArea,
                    City: addressDetails.locality
                });

                // Act
                addressService.setAddressInLocalStorage(addressDetails);

                // Assert
                expect(spy).toHaveBeenCalledWith('je-full-address-details', expectedValue);
            });
        });
    });
});
