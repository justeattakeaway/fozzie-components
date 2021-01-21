import axios from 'axios';
import loqate from '..';
import { getLoqateFullResponseMock } from '../../../../utils/testHelpers/testHelpers';

describe('`Loqate`', () => {
    describe('`getPartialAddressSearch`', () => {
        it('should exist', () => {
            expect(loqate.getPartialAddressSearch).toBeDefined();
        });

        describe('when invoked', () => {
            beforeEach(() => {
                axios.get = jest.fn(() => Promise.resolve({ data: 'E46 SMG' }));
            });

            afterEach(() => {
                axios.get.mockClear();
            });

            it('should make a call to the `loqate` endpoint with correct params passed', () => {
                // Arrange
                loqate.key = 'S55-E46-2006-2013';

                // Act
                loqate.getPartialAddressSearch({
                    address: 'S54',
                    streetLevelAddress: 'S54-E46-2001-2006'
                });

                // Assert
                expect(axios.get).toHaveBeenCalledWith(
                    '/Find/v1.10/json3.ws',
                    {
                        baseURL: 'https://api.addressy.com/Capture/Interactive',
                        params: {
                            Container: 'S54-E46-2001-2006',
                            Countries: 'GB',
                            Field1Format: '',
                            Field2Format: '',
                            Id: '',
                            Key: '',
                            Limit: '20',
                            Text: 'S54'
                        }
                    }
                );
            });

            it('should return a response from the `loqate` api once resolved `ok`', async () => {
                const result = [{
                    Id: 'GB|RM|ENG|1AA-IG6',
                    Type: 'Postcode',
                    Text: 'S58 B58',
                    Description: 'F97 X3 M, Germany - 23 Addresses'
                }];
                axios.get = jest.fn().mockImplementation(() => new Promise(resolve => {
                    resolve({ data: result });
                }));

                const response = await loqate.getPartialAddressSearch({
                    address: 'S54',
                    streetLevelAddress: 'S54-E46-2001-2006'
                });

                expect(response).toEqual(result);
            });

            it('should `throw` if the call fails', async () => {
                // Arrange
                const errorMessage = 'Error status: F97 X3 M';
                axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

                // Act & Assert
                await expect(loqate.getPartialAddressSearch()).rejects.toThrow(errorMessage);
            });
        });
    });

    describe('`getFullAddressDetails`', () => {
        it('should exist', () => {
            expect(loqate.getFullAddressDetails).toBeDefined();
        });

        describe('when invoked', () => {
            beforeEach(() => {
                axios.get = jest.fn(() => Promise.resolve({ data: 'E46 SMG' }));
            });

            afterEach(() => {
                axios.get.mockClear();
            });

            it('should make a call to the `loqate` endpoint with correct url & params passed', () => {
                // Act
                loqate.getFullAddressDetails('BMW|RHD|B|S55E46');

                // Assert
                expect(axios.get).toHaveBeenCalledWith(
                    '/Retrieve/v1/json3.ws',
                    {
                        baseURL: 'https://api.addressy.com/Capture/Interactive',
                        params: {
                            Countries: 'GB',
                            Field1Format: '{Latitude}',
                            Field2Format: '{Longitude}',
                            Id: 'BMW|RHD|B|S55E46',
                            Key: '',
                            Limit: '20'
                        }
                    }
                );
            });

            it('should return a response from the `loqate` api once resolved `ok`', async () => {
                const result = getLoqateFullResponseMock();
                axios.get = jest.fn().mockImplementation(() => new Promise(resolve => {
                    resolve({ data: result });
                }));

                const response = await loqate.getFullAddressDetails('BMW|RHD|B|S55E46');

                expect(response).toEqual(result);
            });
        });
    });

    describe('`hasMinimumAddressCriteria`', () => {
        it('should exist', () => {
            expect(loqate.hasMinimumAddressCriteria).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a `parsedAddress` has been passed', () => {
                it('should return `true`', () => {
                    // Act & Assert
                    expect(loqate.hasMinimumAddressCriteria('AR511AR')).toBe(true);
                });
            });

            describe('AND a `parsedAddress` has been passed but it does not meet the requirements', () => {
                it('should return `false`', () => {
                    // Act & Assert
                    expect(loqate.hasMinimumAddressCriteria('AR')).toBe(false);
                });
            });

            describe('AND a `parsedAddress` has not been passed', () => {
                it('should return `false`', () => {
                    // Act & Assert
                    expect(loqate.hasMinimumAddressCriteria()).toBe(false);
                });
            });
        });
    });
});
