import { mount } from '@vue/test-utils';
import Unauthenticated from '../Unauthenticated.vue';
import tenantConfigs from '../../tenants';

const mockLocale = 'en-GB';

describe('Unauthenticated.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        wrapper = mount(Unauthenticated, {
            mocks: {
                $t: key => key.split('.').reduce((acc, current) => acc[current], tenantConfigs[mockLocale].messages),
                $style: {
                    'c-title': 'c-title',
                    'c-subtitle': 'c-subtitle',
                    'c-signup-button': 'c-signup-button',
                    'c-login-button': 'c-login-button'
                }
            },
            stubs: ['search-box']
        });
    });

    it('should display the title for unauthenticated state', () => {
        // Act
        const title = wrapper.find('.c-title');

        // Assert
        expect(title.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.title);
    });

    it('should display the subtitle for unauthenticated state', () => {
        // Act
        const subtitle = wrapper.find('.c-subtitle');

        // Assert
        expect(subtitle.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.subtitle);
    });

    it('should display a login link with tenant specific text', () => {
        // Act
        const link = wrapper.find('.c-login-button');

        // Assert
        expect(link.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.loginButton);
    });

    it('should display a sign up link with tenant specific text', () => {
        // Act
        const link = wrapper.find('.c-signup-button');

        // Assert
        expect(link.text()).toEqual(tenantConfigs[mockLocale].messages.unauthenticated.signUpButton);
    });
});
