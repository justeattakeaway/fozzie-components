import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import sut from '../Mfa.vue';
import tenantConfigs from '../../tenants';
import {
    REDIRECT_URL_EVENT_NAME
} from '../../constants';

const localVue = createLocalVue();
localVue.use(VueI18n);
const baseUrl = 'https://api.test.co.uk/';
let wrapper;
let sutMocks;
let sutProps;
let sutData;
let initialiseSpy;
let mockPostValidateMfaToken;

// Default to en-GB
const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

// Mock the route date with valid data and as it would appear encoded in the location.value.href
const routeMock = {
    query: {
        code: 'ABC123',
        email: 'jazz.man%40hemail.com',
        returnUrl: '%2Fplace%2Fi%2Fcame%2Ffrom'
    }
};

// Spy on the logging warn method
const warnLogSpy = jest.fn();
const errorLogSpy = jest.fn();
const logMocks = {
    warn: warnLogSpy,
    error: errorLogSpy
};

// Add Spy on the AccountWebApi.postValidateMfaToken method
jest.mock(
    '../../services/AccountWeb.api',
    () => jest.fn().mockImplementation(() => ({
        postValidateMfaToken: mockPostValidateMfaToken
    }))
);

// Provide a generic mount method to be called by each test which
// can override mocks, props and data within each test if required
const mountSut = async ({
    mocks = sutMocks,
    propsData = sutProps,
    data = sutData,
    shallow = true
} = {}) => {
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
        // Arrange clean valid defaults (can be overridden by each test)
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
            $route: routeMock,
            $log: logMocks
        };
        initialiseSpy = jest.spyOn(sut.methods, 'initialise');
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
    ])('should %s the submit button if the otp field is %s', async (_, __, otp, expected) => {
        // Arrange
        wrapper = await mountSut();

        // Act
        await wrapper.setData({ otp });

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
        it.each([
            ['returnUrl', '/place/i/came/from'],
            ['email', 'jazz.man@hemail.com'],
            ['mfa', 'ABC123']
        ])('should set the %s if a valid value supplied on the querystring', async (key, expected) => {
            // Act
            wrapper = await mountSut();

            // Assert
            expect(wrapper.vm[key]).toBe(expected);
            expect(warnLogSpy).not.toHaveBeenCalled();
        });

        it.each([
            ['returnUrl', 'https%3A%2F%2Fwww.somebadplace.co.uk%3FreturnUrl%3Dnottheplace%2Fi%2Fcame%2Ffrom'],
            ['email', 'mysite..123%40hemail.b'],
            ['code', '123456789012345678901234567890XXX']
        ])('should show the error page and log warn if the %s validation fails', async (key, value) => {
            // Arrange
            const sutOverrideMocks = {
                ...sutMocks,
                $route: {
                    ...routeMock,
                    query: {
                        ...routeMock.query,
                        [key]: value
                    }
                }
            };

            // Act
            wrapper = await mountSut({ mocks: sutOverrideMocks });

            // Assert
            const errorCard = wrapper.find('[data-test-id="mfa-error-page"]');
            expect(errorCard.exists()).toBe(true);
            expect(warnLogSpy).toHaveBeenCalled();
        });

        it.each([
            ['returnUrl'],
            ['email'],
            ['code']
        ])('should show the error page and log warn if the %s values are missing', async key => {
            // Arrange
            const queryMock = {
                ...routeMock.query
            };
            delete queryMock[key];
            const sutOverrideMocks = {
                ...sutMocks,
                $route: {
                    ...routeMock,
                    query: queryMock
                }
            };

            // Act
            wrapper = await mountSut({ mocks: sutOverrideMocks });

            // Assert
            const errorCard = wrapper.find('[data-test-id="mfa-error-page"]');
            expect(errorCard.exists()).toBe(true);
            expect(warnLogSpy).toHaveBeenCalled();
        });
    });

    describe('When calling the onFormSubmit() method', () => {
        it.each([
            ['show', true],
            ['NOT show', false]
        ])('should %s error alert when hasSubmitError is %s', async (_, hasSubmitError) => {
            // Arrange
            wrapper = await mountSut();

            // Act
            await wrapper.setData({ hasSubmitError });

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
            await wrapper.setData({ showValidationError });

            // Assert
            const validationError = wrapper.find('[data-test-id="mfa-form-validation-error"]');
            expect(validationError.exists()).toBe(showValidationError);
        });

        describe('And the form data is valid', () => {
            it('should call the postValidateMfaToken() method with the correct params', async () => {
                // Arrange
                mockPostValidateMfaToken = jest.fn(() => {}); // Add default mock to the spy
                const expectedParams = { mfa_token: 'XYZ1234', otp: 'test-otp' }; // eslint-disable-line camelcase
                wrapper = await mountSut();
                await wrapper.setData({ otp: 'test-otp', mfa: 'XYZ1234' });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(mockPostValidateMfaToken).toHaveBeenCalledWith(expectedParams);
            });

            describe('And the submitting of the form data was unsuccessful', () => {
                it.each([
                    ['Bad request when submitting MFA', 400],
                    ['Throttled when submitting MFA', 429]
                ])("should log the error '%s' if the response status is '%s'", async (logMessage, status) => {
                    // Arrange
                    const errLogged = new Error('some status error message');
                    errLogged.response = { status };
                    mockPostValidateMfaToken = jest.fn(() => { throw errLogged; }); // Add error mock to the spy
                    wrapper = await mountSut();
                    await wrapper.setData({ otp: 'test-otp' });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(errorLogSpy).toHaveBeenCalledWith(logMessage, errLogged, ['account-pages', 'mfa']);
                    expect(wrapper.vm.isSubmitting).toBe(false);
                });
            });

            describe('And the submitting of the form data was successful', () => {
                it('should emit correct event if api call successful', async () => {
                    // Arrange
                    mockPostValidateMfaToken = jest.fn(() => {}); // Add default mock to the spy
                    const expectedUrl = '/place/i/came/from';
                    wrapper = await mountSut();
                    await wrapper.setData({ otp: 'test-otp' });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    expect(wrapper.emitted()[REDIRECT_URL_EVENT_NAME][0]).toEqual([expectedUrl]);
                    expect(wrapper.vm.isSubmitting).toBe(false);
                });
            });
        });
    });
});
