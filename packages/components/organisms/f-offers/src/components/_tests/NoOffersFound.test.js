import { createLocalVue, mount } from '@vue/test-utils';
import MediaElement from '@justeat/f-media-element';
import Button from '@justeat/f-button';
import { VueI18n } from '@justeat/f-globalisation/src';
import Vuex from 'vuex';
import NoOffersFound from '../NoOffersFound.vue';
import tenantConfigs from '../../tenants';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../../store/types';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const mockLocale = 'en-GB';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

describe('NoOffersFound.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        const getters = {
            isAuthenticated: () => false,
            friendlyName: () => null
        };

        const store = new Vuex.Store({
            modules: {
                [VUEX_MODULE_NAMESPACE_OFFERS]: {
                    namespaced: true,
                    getters
                }
            }
        });

        wrapper = mount(NoOffersFound, {
            store,
            i18n,
            localVue,
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
        expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.noOffersFound.title);
    });

    it('should display the tenant specific subtitle', () => {
        // Act
        const mediaElement = wrapper.findComponent(MediaElement);
        const subtitle = mediaElement.find('p');

        // Assert
        expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.noOffersFound.subtitle);
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
