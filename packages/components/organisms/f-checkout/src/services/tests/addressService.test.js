import addressService from '../addressService';
import { getCookie } from '../../utils/helpers';

jest.mock('../../utils/helpers');

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

describe('addressService', () => {
    const tenant = 'uk';
    const allAddresses = [area511Line, bristol2Lines, london3LinesDefault];

    describe('getClosestAddress ::', () => {
        describe('when last searched postcode is not present', () => {
            const postcode = '';

            it('should return empty address if addresses is empty', () => {
                // Arrange
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress([], tenant);

                // Assert
                expect(actual).toEqual({
                    line1: '',
                    line2: '',
                    city: '',
                    postcode: ''
                });
            });

            it('should return default address if default address is present', () => {
                // Arrange
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: london3LinesDefault.Line1,
                    line2: `${london3LinesDefault.Line2}, ${london3LinesDefault.Line3}`,
                    city: london3LinesDefault.City,
                    postcode: london3LinesDefault.ZipCode
                });
            });
        });
        describe('when last searched postcode is present', () => {
            it('should return empty address with postcode set, when postcode does not match', () => {
                // Arrange
                const postcode = 'EN1 1AA';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: '',
                    line2: '',
                    city: '',
                    postcode
                });
            });

            it('should return empty address with formatted postcode set, when postcode does not match and has no spaces', () => {
                // Arrange
                const postcode = 'EN11AA';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: '',
                    line2: '',
                    city: '',
                    postcode: 'EN1 1AA'
                });
            });

            it('should return empty address with postcode set, when postcode does not match', () => {
                // Arrange
                const postcode = 'EN1 1AA';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: '',
                    line2: '',
                    city: '',
                    postcode
                });
            });

            it('should return address with full postcode match', () => {
                // Arrange
                const postcode = 'BS1 1AA';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: bristol2Lines.Line1,
                    line2: bristol2Lines.Line2,
                    city: bristol2Lines.City,
                    postcode: bristol2Lines.ZipCode
                });
            });

            it('should return address with full postcode match when address has no spaces', () => {
                // Arrange
                const postcode = 'EC4M7RF';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: london3LinesDefault.Line1,
                    line2: `${london3LinesDefault.Line2}, ${london3LinesDefault.Line3}`,
                    city: london3LinesDefault.City,
                    postcode: london3LinesDefault.ZipCode
                });
            });

            it('should return address with postcode partial match', () => {
                // Arrange
                const postcode = 'AR51';
                getCookie.mockReturnValue(postcode);

                // Act
                const actual = addressService.getClosestAddress(allAddresses, tenant);

                // Assert
                expect(actual).toEqual({
                    line1: area511Line.Line1,
                    line2: '',
                    city: area511Line.City,
                    postcode: area511Line.ZipCode
                });
            });
        });
    });
});
