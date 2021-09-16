import createFeatureManagementForVue3 from '../src/createFeatureManagementForVue3';
import createFeatureManagement from '@justeat/f-feature-management';
import { reactive } from '@vue/reactivity';

jest.mock('@justeat/f-feature-management', () => {    
    const fmMock = {
        getValue: jest.fn()
    };

    return {
        __esModule: true,        
        default: () => fmMock            
    }
});

describe('When we get a mock Feature Management object', () => {
    it('should be a reactive proxy', async () => {          

        //Act
        const fm = await createFeatureManagementForVue3({});

        //Assert
        //Vue3 tracks reactive proxies, so calling reactive on the same object twice will yield the same return object
        expect(fm).toBe(reactive(createFeatureManagement()));
        
    });

    it('should have a property called reactive with a getValue function on it', async () => {          

        //Act
        const fm = await createFeatureManagementForVue3({});

        //Assert
        expect(fm.reactive).toBeInstanceOf(Object);
        expect(fm.reactive.getValue).toBeInstanceOf(Function);        
        
    });

    it('calling reactive.getValue() should delegate to function on base', async () => {
        //Arrange
        const mockFm = createFeatureManagement();
        mockFm.getValue.mockReturnValue('return value');
        
        //Act
        const fm = await createFeatureManagementForVue3({});
        const val = fm.getValue('parameter');

        //Assert
        expect(mockFm.getValue).toHaveBeenCalledWith('parameter');
        expect(val).toBe('return value')
    });

});
