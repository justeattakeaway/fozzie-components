import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';
import MediaElement from '@justeat/f-media-element';
import { VueI18n } from '@justeat/f-globalisation/src';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../../store/types';
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
    describe('ssAuthenticated: false', () => {
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

            wrapper = mount(Header, {
                store,
                i18n,
                localVue,
                mocks: {
                    $t: i18nMocker
                }
            });
        });

        it('should display the unauthenticated title', () => {
            // Act
            const media = wrapper.findComponent(MediaElement);
            const title = media.find('h3');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.header.title);
        });

        it('should display the unauthenticated subtitle', () => {
            // Act
            const media = wrapper.findComponent(MediaElement);
            const subtitle = media.find('p');

            // Assert
            expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.header.subtitle);
        });
    });

    describe('ssAuthenticated: true', () => {
        let wrapper;
        let getters;

        beforeEach(() => {
            // Arrange
            getters = {
                isAuthenticated: () => true,
                friendlyName: () => 'Matthew'
            };

            const store = new Vuex.Store({
                modules: {
                    [VUEX_MODULE_NAMESPACE_OFFERS]: {
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

        it('should display the authenticated title', () => {
            // Act
            const media = wrapper.findComponent(MediaElement);
            const title = media.find('h3');

            // Assert
            expect(title.text()).toEqual(`${getters.friendlyName()},\n ${tenantConfigs[mockLocale].messages.authenticated.header.title}`);
        });

        it('should display the authenticated subtitle', () => {
            // Act
            const media = wrapper.findComponent(MediaElement);
            const subtitle = media.find('p');

            // Assert
            expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.authenticated.header.subtitle);
        });

        it('should display the authenticated title without name', () => {
            // Arrange
            const g = {
                isAuthenticated: () => true,
                friendlyName: () => null
            };

            const store = new Vuex.Store({
                modules: {
                    [VUEX_MODULE_NAMESPACE_OFFERS]: {
                        namespaced: true,
                        getters: g
                    }
                }
            });

            const w = mount(Header, {
                store,
                i18n,
                localVue,
                mocks: {
                    $t: i18nMocker
                }
            });
            // Act
            const media = w.findComponent(MediaElement);
            const title = media.find('h3');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.authenticated.header.title);
        });
    });
});
