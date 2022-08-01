import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import sut from '../Mfa.vue';
import tenantConfigs from '../../tenants';

describe('Mfa', () => {
    const localVue = createLocalVue();
    localVue.use(VueI18n);
    const baseUrl = 'https://api.test.co.uk/';
    let wrapper;
    let sutMocks;
    let sutProps;
    let sutData;
    // let initialiseSpy;
    // let onFormSubmitSpy;
    // let onShowHelpInfoSpy;

    const i18n = {
        locale: 'en-GB',
        messages: {
            'en-GB': tenantConfigs['en-GB'].messages
        }
    };

    const logMocks = {
        info: jest.fn(),
        error: jest.fn()
    };

    const mountSut = async ({
        mocks = sutMocks,
        propsData = sutProps,
        data = sutData
    } = {}) => {
        // initialiseSpy = jest.spyOn(sut.methods, 'initialise');
        // onFormSubmitSpy = jest.spyOn(sut.methods, 'onFormSubmit');
        // onShowHelpInfoSpy = jest.spyOn(sut.methods, 'onShowHelpInfo');

        const mock = shallowMount(sut, {
            i18n,
            localVue,
            propsData,
            data,
            mocks
        });
        await mock.vm.$nextTick();

        return mock;
    };

    beforeEach(() => {
        // Arrange
        sutData = () => ({
            verificationCode: '',
            email: '',
            isSubmitting: false,
            showErrorPage: false
        });
        sutProps = {
            smartGatewayBaseUrl: baseUrl
        };
        sutMocks = {
            $log: logMocks
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        // Act
        wrapper = await mountSut();

        // Assert
        expect(wrapper.exists()).toBe(true);
    });
});
