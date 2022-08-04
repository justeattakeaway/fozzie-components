import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import sut from '../Mfa.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.use(VueI18n);
const baseUrl = 'https://api.test.co.uk/';
let wrapper;
let cookiesSpy;
let httpSpy;
let sutMocks;
let sutProps;
let sutData;
let windowSpy;
let windowCopy;
let windowMock;
const windowUrl = 'https://www.test.co.uk/mfa/optPage?code=ABC123&email=jazz.man@hemail.com&returnurl=place/i/came/from';
let initialiseSpy;
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
    warn: jest.fn(),
    error: jest.fn()
};

const PrepWindowMock = hrefMock => {
    windowCopy = { ...global.window };
    windowMock = ({
        ...windowCopy,
        location: {
            value: {
                href: hrefMock
            }
        }
    });
    windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => windowMock);
};

const mountSut = async ({
    mocks = sutMocks,
    propsData = sutProps,
    data = sutData,
    shallow = true
} = {}) => {
    initialiseSpy = jest.spyOn(sut.methods, 'initialise');
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

describe('Mfa', () => {
    beforeEach(() => {
        // Arrange
        PrepWindowMock(windowUrl);
        sutData = () => ({
            otp: '',
            mfa: '',
            email: '',
            tenantConfigs,
            isSubmitting: false,
            showErrorPage: false,
            returnUrl: '/'
        });
        sutProps = {
            smartGatewayBaseUrl: baseUrl
        };
        sutMocks = {
            $http: httpSpy,
            $cookies: cookiesSpy,
            $log: logMocks,
            window: windowMock
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
        ['enable', 'populated', 'abc123', undefined],
        ['disable', 'unpopulated', '', 'true']
    ])('should %s the submit button if the otp field is %s', async (_, __, optValue, expected) => {
        // Act
        wrapper = await mountSut();
        await wrapper.setData({
            otp: optValue
        });

        // Assert
        const button = wrapper.find('[data-test-id="mfa-submit-button"]');
        expect(button.attributes('disabled')).toBe(expected);
    });

    it('should call the initialise() method on the Mounted() hook', async () => {
        // Act
        wrapper = await mountSut();

        // Assert
        expect(initialiseSpy).toHaveBeenCalled();
    });

    describe('When calling the initialise() method', () => {
        it('should set the returnUrl if a valid value supplied on the querystring', async () => {
        });

        it('should set the email address if a valid value supplied on the querystring', async () => {
        });

        it('should set the mfa code if a valid value supplied on the querystring', async () => {
        });

        it('should show the error page if the return url validation fails', async () => {
        });

        it('should show the error page if the email address validation fails', async () => {
        });

        it('should show the error page if the mfa code validation fails', async () => {
        });
    });

    describe('When calling the onFormSubmit() method', () => {
        describe('And is Unsuccessful', () => {
            it.each([
                ['show', true],
                ['NOT show', false]
            ])('should %s error alert when hasSubmitError is %s', async (_, hasSubmitError) => {
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

        describe('And the form data is valid', () => {
            it('should call the postValidateMfaToken() method with the correct params', async () => {
            });

            describe('And the submitting of the form data was unsuccessful', () => {
                it('should log bad request if the error status is 400', async () => {
                });

                it('should log throttled request if the error status is 429', async () => {
                });
            });

            describe('And the submitting of the form data was successful', () => {
                it('should call the redirect method', async () => {
                });
            });
        });
    });
});
