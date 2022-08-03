import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
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
        data = sutData,
        shallow = true
    } = {}) => {
        // initialiseSpy = jest.spyOn(sut.methods, 'initialise');
        // onFormSubmitSpy = jest.spyOn(sut.methods, 'onFormSubmit');
        // onShowHelpInfoSpy = jest.spyOn(sut.methods, 'onShowHelpInfo');

        const mountFn = shallow ? shallowMount : mount;

        const mock = mountFn(sut, {
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

    it.each([
        ['show', true],
        ['NOT show', false]
    ])('should %s error message when hasSubmitError is %s', async (_, hasSubmitError) => {
        // Arrange
        wrapper = await mountSut();

        // Act
        await wrapper.setData({
            hasSubmitError
        });

        // Assert
        const alert = wrapper.find('[data-test-id="mfa-submit-error-alert"]');
        expect(alert.exists()).toBe(hasSubmitError);
    });

    it.each([
        ['show', true],
        ['NOT show', false]
    ])('should %s validation error when showValidationError is %s', async (_, showValidationError) => {
        // Arrange
        wrapper = await mountSut({ shallow: false }); // Deep mount to make sure slot is rendered

        // Act
        await wrapper.setData({
            showValidationError
        });

        // Assert
        const validationError = wrapper.find('[data-test-id="mfa-form-validation-error"]');
        expect(validationError.exists()).toBe(showValidationError);
    });
});
