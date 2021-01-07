import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FullAddressSuggestions from '../FormFullAddressSearchSuggestions.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    suggestions: [{ Description: 'NASA' }, { postcode: 'SpaceX' }]
};

const createStore = (state = mockState) => new Vuex.Store({
    modules: {
        searchbox: {
            namespaced: true,
            state
        }
    },
    hasModule: jest.fn(() => true)
});

describe('`FullAddressSuggestions`', () => {
    function bootstrap (opts = {}) {
        const {
            noResultsSuggestion = '',
            params = {
                suggestionFormat: suggestion => suggestion
            },
            selected = 0
        } = opts;
        
        const event = { preventDefault: jest.fn() };
        
        const wrapper = shallowMount(FullAddressSuggestions, {
            propsData: {
                params,
                noResultsSuggestion,
                selected
            },
            localVue,
            store: createStore()
        });
        
        return {
            wrapper,
            event
        };
    }
    
    describe('`getDescription`', () => {
        it('should exist', () => {
            const { wrapper } = bootstrap();
            
            expect(wrapper.vm.getDescription).toBeDefined();
        });
        
        describe('when invoked', () => {
            it('should return the whole `Description` correctly', () => {
                // Arrange
                const { wrapper } = bootstrap();
                const address = {
                    Description: ' Hill 400, Burgberg - 15 address ',
                };
                
                // Act
                const result = wrapper.vm.getDescription(address);
                
                // Assert
                expect(result).toEqual('Hill 400, Burgberg - 15 address');
            });
        });
    });
    
    describe('`getMatchedPostcodes`', () => {
        it('should exist', () => {
            const { wrapper } = bootstrap();
            
            expect(wrapper.vm.getMatchedPostcodes).toBeDefined();
        });
        
        describe('when invoked', () => {
            it('should return the matched `postcode`', () => {
                // Arrange
                const { wrapper } = bootstrap();
                const address = {
                    Text: 'Hill_900',
                };
                
                // Act
                const result = wrapper.vm.getMatchedPostcodes(address);
                
                // Assert
                expect(result).toEqual('Hill_900');
            });
        });
    });
    
    describe('`computed`', () => {
        describe('`getAddressItems`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();
                
                expect(wrapper.vm.getAddressItems).toBeDefined();
            });
            
            describe('when invoked', () => {
                it('should filter out items that include `postcode`', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    
                    // Act
                    const result = wrapper.vm.getAddressItems;
                    
                    // Assert
                    expect(result).toEqual([{ Description: 'NASA' }]);
                });
            });
        });
    });
});
