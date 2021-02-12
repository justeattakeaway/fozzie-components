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
    describe('getClosestAddress ::', () => {
        it('should return default address when there is no postcode', () => {
            // Arrange
            const postcode = '';
            const tenant = 'uk';
            const addresses = [area511Line, bristol2Lines, london3LinesDefault];
            getCookie.mockReturnValue(postcode);

            // Act
            const actual = addressService.getClosestAddress(addresses, tenant);

            // Assert
            expect(actual).toEqual({
                line1: london3LinesDefault.Line1,
                line2: `${london3LinesDefault.Line2}, ${london3LinesDefault.Line3}`,
                city: london3LinesDefault.City,
                postcode: london3LinesDefault.ZipCode
            });
        });
    });
});
