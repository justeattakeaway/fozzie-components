import { mount } from '@vue/test-utils';
import MediaElement from '@justeat/f-media-element';
import Button from '@justeat/f-button';
import NoResults from '../NoResults.vue';
import tenantConfigs from '../../tenants';

const mockLocale = 'en-GB';

describe('NoResults.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        wrapper = mount(NoResults, {
            mocks: {
                $t: key => key.split('.').reduce((acc, current) => acc[current], tenantConfigs[mockLocale].messages)
            },
            stubs: ['search-box']
        });
    });

    it('should display the tenant specific title', () => {
        // Act
        const mediaElement = wrapper.findComponent(MediaElement);
        const title = mediaElement.find('h3');

        // Assert
        expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.noResults.title);
    });

    it('should display the tenant specific subtitle', () => {
        // Act
        const mediaElement = wrapper.findComponent(MediaElement);
        const subtitle = mediaElement.find('p');

        // Assert
        expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.noResults.subtitle);
    });

    it('should display a terms and conditions link with tenant specific text', () => {
        // Act
        const button = wrapper.findComponent(Button);
        const link = button.find('a');

        // Assert
        expect(link.text()).toEqual(tenantConfigs[mockLocale].messages.termsAndConditionsLinkText);
    });

    it('should link to the tenant specific terms and conditions url', () => {
        // Act
        const button = wrapper.findComponent(Button);
        const link = button.find('a');

        // Assert
        expect(link.attributes('href')).toEqual(tenantConfigs[mockLocale].messages.termsAndConditionsLinkUrl);
    });
});
