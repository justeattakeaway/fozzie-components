import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';
import MediaElement from '@justeat/f-media-element';
import { VueI18n } from '@justeat/f-globalisation/src';
import { VUEX_MODULE_NAMESPACE_LOYALTY } from '../../store/types';
import Header from '../Header.vue';
import tenantConfigs from '../../tenants';

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

const i18nMocker = key => key.split('.').reduce((acc, current) => acc[current], tenantConfigs[mockLocale].messages);

describe('Header.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange
        const getters = {
            isAuthenticated: () => false,
            friendlyName: () => null
        };

        const store = new Vuex.Store({
            modules: {
                [VUEX_MODULE_NAMESPACE_LOYALTY]: {
                    namespaced: true,
                    getters
                }
            }
        });

        wrapper = mount(Header, {
            store,
            i18n,
            localVue,
            mocks: {
                $t: i18nMocker
            }
        });
    });

    it('should display the title', () => {
        // Act
        const media = wrapper.findComponent(MediaElement);
        const title = media.find('h3');

        // Assert
        expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.header.title);
    });

    it('should display the subtitle', () => {
        // Act
        const media = wrapper.findComponent(MediaElement);
        const subtitle = media.find('p');

        // Assert
        expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.header.text);
    });
});
