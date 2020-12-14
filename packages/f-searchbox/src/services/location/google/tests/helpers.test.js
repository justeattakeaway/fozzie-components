/* eslint-disable camelcase */

import { getAddressComponentsMock } from '../../../../utils/testHelpers/testHelpers';
import { getAddressComponent, formatLocation } from '../helpers';

describe('`LocationHelpers`', () => {
    describe('`getAddressComponent`', () => {
        it('should exist', () => {
            expect(getAddressComponent).toBeDefined();
        });

        describe('when invoked', () => {
            describe('when there are no arguments provided', () => {
                it('should return `undefined`', () => {
                    expect(getAddressComponent()).toBeUndefined();
                });
            });

            describe('when there are arguments provided', () => {
                it('should return the long name of the first matched component type', () => {
                    // Arrange
                    const { address_components } = getAddressComponentsMock();

                    // Act
                    const result = getAddressComponent(
                        address_components,
                        true,
                        'administrative_area_level_2',
                        'administrative_area_level_1'
                    );

                    // Assert
                    expect(result).toEqual('Metropolitan City of Bari');
                });

                it('should return short name of component type, if no long name provided', () => {
                    // Arrange
                    const { address_components } = getAddressComponentsMock();

                    // Act
                    const result = getAddressComponent(
                        address_components,
                        true,
                        'test_short_name'
                    );

                    // Assert
                    expect(result).toEqual('TEST-SHORT-NAME');
                });

                it('should return undefined if no long name or short name provided on component type', () => {
                    // Arrange
                    const { address_components } = getAddressComponentsMock();

                    // Act
                    const result = getAddressComponent(
                        address_components,
                        true,
                        'test_no_name'
                    );

                    // Assert
                    expect(result).toBeUndefined();
                });

                it('should return undefined if no matching component type found', () => {
                    // Arrange
                    const { address_components } = getAddressComponentsMock();

                    // Act
                    const result = getAddressComponent(
                        address_components,
                        true,
                        'test_unfound_type'
                    );

                    // Assert
                    expect(result).toBeUndefined();
                });
            });
        });
    });

    describe('`formatLocation`', () => {
        it('should exist', () => {
            expect(formatLocation).toBeDefined();
        });

        describe('when invoked', () => {
            it('should return a correctly formatted location', () => {
                // Arrange
                const mockFormattedResult = {
                    country: 'IT',
                    formattedAddress: '70010 Adelfia, Metropolitan City of Bari, Italy',
                    latitude: 41.0037948,
                    locality: 'Adelfia',
                    longitude: 16.87218770000004,
                    placeId: 'ChIJde5K3d3qRxMRy_DlKnAZdOo',
                    postcode: '70010',
                    state: 'Apulia',
                    street: 'route-name',
                    streetNumber: 'street-number',
                    sublocality: 'Metropolitan City of Bari',
                    types: [
                        'locality',
                        'political'
                    ],
                    unitNumber: 'subpremise-number'
                };

                // Act
                const results = getAddressComponentsMock();

                // Assert
                expect(formatLocation(results)).toEqual(mockFormattedResult);
            });
        });
    });
});

