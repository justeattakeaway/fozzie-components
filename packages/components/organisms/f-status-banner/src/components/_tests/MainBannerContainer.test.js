import { shallowMount } from '@vue/test-utils';
import MainBannerContainer from '../MainBannerContainer.vue';
import * as analyticsService from '../../services/analytics.service';

describe('`MainBannerContainer`', () => {
    let spy;
    
    beforeEach(() => {
        spy = jest.spyOn(analyticsService, 'loadAnalyticsAccount').mockImplementation(() => ()=> {});
    });
    
    it('should be defined', () => {
        // Arrange
        const propsData = {
            copy: {
                statusBannerContent: {
                    searchboxHeading: '',
                    searchboxSubHeading: ''
                }
            }
        };
        const wrapper = shallowMount(MainBannerContainer, { propsData });
        
        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });
    
    describe('`loadAnalyticsAccount`', () => {
       it('should fire when the component is mounted', () => {
           // Arrange
           const propsData = {
               copy: {
                   statusBannerContent: {
                       searchboxHeading: '',
                       searchboxSubHeading: ''
                   }
               }
           };
           shallowMount(MainBannerContainer, { propsData });
           
           // Assert
           expect(spy).toHaveBeenCalled();
       });
    });
    
    describe('`trackMenuWebPageExperiment`', () => {
        it('should fire when the component is mounted', () => {
            // Arrange
            const propsData = {
                copy: {
                    statusBannerContent: {
                        searchboxHeading: '',
                        searchboxSubHeading: ''
                    }
                }
            };
            const spy = jest.spyOn(analyticsService, 'trackMenuWebPageExperiment');
            shallowMount(MainBannerContainer, { propsData });
            
            // Assert
            expect(spy).toHaveBeenCalled();
        });
    });
    
    describe('`dataLayerPushPageData`', () => {
        it('should fire when the component is mounted & pass through a `locale`', () => {
            // Arrange
            const propsData = {
                locale: 'en-GB',
                copy: {
                    statusBannerContent: {
                        searchboxHeading: '',
                        searchboxSubHeading: ''
                    }
                }
            };
            const spy = jest.spyOn(analyticsService, 'dataLayerPushPageData');
            shallowMount(MainBannerContainer, { propsData });
            
            // Assert
            expect(spy).toHaveBeenCalledWith('en-GB');
        });
    });
});
