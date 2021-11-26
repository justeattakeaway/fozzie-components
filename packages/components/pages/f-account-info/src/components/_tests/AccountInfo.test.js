import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import AccountInfo from '../AccountInfo.vue';
import tenantConfigs from '../../tenants';
import {
    baseUrl,
    token
} from '../../../test-utils/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

let sutProps;

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange & Act
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl
        };
    });

    describe('when mounting the component', () => {
        it('should be defined', () => {
            // Arrange
            // Act
            const wrapper = shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: sutProps
            });

            // Assert
            expect(wrapper.exists()).toBe(true);
        });

        it('should not call initialise method if the authorisation has not completed', () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false }
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise method once the authorisation has completed', async () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            const wrapper = shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false }
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });
    });
});
