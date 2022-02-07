import { createLocalVue, mount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import Notifications from '../Notifications.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

describe('Notifications Component', () => {
    it('should only show the success alert if `showSuccessfulAlert` true', () => {
        // Arrange & Act
        const wrapper = mount(Notifications, {
            i18n,
            localVue,
            propsData: {
                showSaveErrorAlert: false,
                showSuccessfulAlert: true
            }
        });

        // Assert
        const errorAlert = wrapper.find('[data-test-id="contact-preferences-error-alert"]');
        expect(errorAlert.exists()).toEqual(false);
        const successAlert = wrapper.find('[data-test-id="contact-preferences-success-alert"]');
        expect(successAlert.exists()).toEqual(true);
    });

    it('should only show the error alert if `showSaveErrorAlert` true', () => {
        // Arrange & Act
        const wrapper = mount(Notifications, {
            i18n,
            localVue,
            propsData: {
                showSaveErrorAlert: true,
                showSuccessfulAlert: false
            }
        });

        // Assert
        const errorAlert = wrapper.find('[data-test-id="contact-preferences-error-alert"]');
        expect(errorAlert.exists()).toEqual(true);
        const successAlert = wrapper.find('[data-test-id="contact-preferences-success-alert"]');
        expect(successAlert.exists()).toEqual(false);
    });
});
