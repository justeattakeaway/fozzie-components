import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import RegistrationServiceApi from '../../services/RegistrationServiceApi';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';
import { VueI18n } from '@justeat/f-globalisation';

import {
    i18n
} from './helpers/setup';

jest.mock('../../services/RegistrationServiceApi', () => ({
    createAccount: jest.fn()
}));

let wrapper;

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Registration', () => {
    const propsData = {
        locale: 'en-GB',
        createAccountUrl: 'http://localhost/account/register',
        showLoginLink: true,
        loginUrl: '/account/register'
    };

    it('should be defined', () => {
        // Arrange & Act
        wrapper = shallowMount(Registration, {
            propsData,
            localVue,
            i18n
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should have one form with method "post"', () => {
        // Arrange
        wrapper = mount(Registration, {
            propsData,
            localVue,
            i18n
        });

        // Act
        const forms = wrapper.findAll('form');

        // Assert
        expect(forms.length).toBe(1);
        expect(forms.wrappers[0].attributes('method')).toBe('post');
    });

    it('should have a button', () => {
        // Arrange
        wrapper = shallowMount(Registration, {
            propsData,
            localVue,
            i18n
        });

        // Act
        const button = wrapper.find("[data-test-id='create-account-submit-button']");

        // Assert
        expect(button.exists()).toBe(true);
    });

    describe(': props :', () => {
        it('should show the login link if showLoginLink prop set to true.', () => {
            // Arrange
            wrapper = shallowMount(Registration, {
                propsData: {
                    createAccountUrl: 'http://localhost/account/register',
                    showLoginLink: true,
                    loginUrl: '/account/register'
                },
                localVue,
                i18n
            });

            // Act
            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            // Assert
            expect(loginLink.exists()).toBe(true);
        });

        it('should not show the login link if showLoginLink is set to false.', () => {
            // Arrange
            wrapper = shallowMount(Registration, {
                propsData: {
                    createAccountUrl: 'http://localhost/account/register',
                    showLoginLink: false,
                    loginUrl: ''
                },
                localVue,
                i18n
            });

            // Act
            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            // Assert
            expect(loginLink.exists()).toBe(false);
        });

        it('should show the login link if showLoginLink prop not set', () => {
            // Arrange
            wrapper = shallowMount(Registration, {
                propsData,
                localVue,
                i18n
            });

            // Act
            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            // Assert
            expect(loginLink.exists()).toBe(true);
        });

        it('should show emit VisitLoginPage event when login link is clicked.', () => {
            // Arrange
            wrapper = shallowMount(Registration, {
                propsData: {
                    createAccountUrl: 'http://localhost/account/register',
                    showLoginLink: true,
                    loginUrl: '/account/register'
                },
                localVue,
                i18n
            });

            // Act
            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");
            loginLink.trigger('click');

            // Assert
            expect(wrapper.emitted(EventNames.VisitLoginPage).length).toBe(1);
        });
    });

    describe('when creating an account', () => {
        const mountComponentAndAttachToDocument = () => {
            const div = document.createElement('div');
            document.body.appendChild(div);

            return mount(Registration, {
                propsData,
                attachTo: div,
                mocks: {
                    $cookies: {
                        remove: jest.fn()
                    }
                },
                localVue,
                i18n
            });
        };

        afterEach(() => {
            wrapper.destroy();
        });

        it('should remove the existing `je-oidc` cookie', async () => {
            // Arrange
            wrapper = mountComponentAndAttachToDocument();

            Object.defineProperty(wrapper.vm.$v, '$invalid', {
                get: jest.fn(() => false)
            });

            const cookieRemoveSpy = jest.spyOn(wrapper.vm.$cookies, 'remove');

            // Act
            await wrapper.vm.onFormSubmit();
            await flushPromises();

            // Assert
            expect(cookieRemoveSpy).toHaveBeenCalledWith('je-oidc');
        });

        describe('with a faulty registration service', () => {
            it('should populate generic error message and emit failure event when service responds with an error', async () => {
                // Arrange
                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw new Error('Conflict');
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).not.toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });

            it('should show error message and emit failure event when service responds with a 409', async () => {
                // Arrange
                const testEmailAddress = 'test@test.test';

                const err = {
                    response: {
                        status: 409,
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [{
                                description: 'The specified email already exists',
                                errorCode: '409'
                            }]
                        }
                    }
                };
                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });
                wrapper.vm.email = testEmailAddress;

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.conflictedEmailAddress).toBe(testEmailAddress);
                expect(wrapper.emitted(EventNames.CreateAccountWarning).length).toBe(1);
            });

            it('should emit mfa challenge issued event when service responds with a 403', async () => {
                // Arrange
                const err = {
                    response: {
                        status: 403,
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [{
                                description: '"MFA Challenge Issued"',
                                errorCode: 'MFAChallengeIssued'
                            }],
                            // eslint-disable-next-line camelcase
                            mfa_token: 'mfa-token',
                            // eslint-disable-next-line camelcase
                            mfa_target: 'someone@somewhere.com'
                        }
                    }
                };

                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                const mfaChallengeIssuedEvent = wrapper.emitted(EventNames.MfaChallengeIssued);
                expect(mfaChallengeIssuedEvent.length).toBe(1);
                expect(mfaChallengeIssuedEvent[0][0].mfaToken).toBe('mfa-token');
                expect(mfaChallengeIssuedEvent[0][0].mfaTarget).toBe('someone@somewhere.com');
                expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
                expect(wrapper.emitted(EventNames.LoginBlocked)).toBeUndefined();
            });

            it('should emit login blocked event when service responds with a 401', async () => {
                // Arrange
                const err = {
                    response: {
                        status: 401,
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [{
                                description: 'Failed user authentication.',
                                errorCode: 'FailedUserAuthentication'
                            }]
                        }
                    }
                };

                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.LoginBlocked).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
            });

            it('should emit rate limit exceeded event when service responds with a 429', async () => {
                // Arrange
                const err = {
                    response: {
                        status: 429,
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [{
                                description: '"Rate limit exceeded"',
                                errorCode: 'RateLimitExceeded'
                            }]
                        }
                    }
                };

                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                const rateLimitExceededEvent = wrapper.emitted(EventNames.RateLimitExceeded);
                expect(rateLimitExceededEvent.length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
                expect(wrapper.emitted(EventNames.LoginBlocked)).toBeUndefined();
            });

            it('should populate generic error message and emit failure event when service responds with a 400', async () => {
                // Arrange
                const err = {
                    response: {
                        status: 400,
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [{
                                description: 'The Password field is required',
                                errorCode: '400'
                            }]
                        }
                    }
                };
                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('The Password field is required');
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });

            it('should show generic error message and emit failure event when service returns unkown error', async () => {
                // Arrange
                const err = {
                    response: {
                        data: {
                            errors: [{
                                errorCode: 'XXX',
                                description: 'an unknown error'
                            }]
                        }
                    }
                };
                RegistrationServiceApi.createAccount.mockImplementation(async () => {
                    throw err;
                });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('Unable to Create Account at this time');
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });
        });

        describe('with a working registration service', () => {
            beforeEach(() => {
                RegistrationServiceApi.createAccount.mockClear();
                RegistrationServiceApi.createAccount.mockImplementation(async () => Promise.resolve());

                wrapper = mountComponentAndAttachToDocument();
            });

            it('should post correct data and emit success event when service succeeds', async () => {
                // Arrange
                Object.defineProperty(wrapper.vm.$v, '$invalid', {
                    get: jest.fn(() => false)
                });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(RegistrationServiceApi.createAccount).toHaveBeenCalledTimes(1);
                expect(wrapper.vm.genericErrorMessage).toBe('');
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            });

            it('should show error message and emit failure event when the first name field is not populated', async () => {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameRequiredError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('firstName');
            });

            it('should show error message and emit failure event when the first name field is populated with invalid input', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-firstName-input"]').setValue('wh4t @ w3!rd |\\|ame');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('firstName');
            });

            it('should show error message and emit inline failure event when the first name field is populated with invalid input and focus is lost', async () => {
                // Arrange
                const firstNameInput = wrapper.find('[data-test-id="formfield-firstName-input"]');
                firstNameInput.setValue('wh4t @ w3!rd |\\|ame');

                // Act
                firstNameInput.trigger('blur');
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError)[0][0]).toBe('firstName');
            });

            it('should show error message and emit failure event when the first name field is populated with too long an input', async () => {
                // Arrange
                const longValue = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';
                wrapper.find('[data-test-id="formfield-firstName-input"]').setValue(longValue);

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameMaxLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('firstName');
            });

            it('should show error message and emit failure event when the last name field is not populated', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-firstName-input"]').setValue('Joe');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameRequiredError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('lastName');
            });

            it('should show error message and emit failure event when the last name field is populated with invalid input', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-lastName-input"]').setValue('wh4t @ w3!rd |\\|ame');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameInvalidCharError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('lastName');
            });

            it('should show error message and emit failure event when the last name field is populated with too long an input', async () => {
                // Arrange
                const longValue = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';
                wrapper.find('[data-test-id="formfield-lastName-input"]').setValue(longValue);

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('lastName');
            });

            it('should show error message and emit inline failure event when the last name field is populated with too long an input and focus is lost', async () => {
                // Arrange
                const longValue = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';
                const lastNameInput = wrapper.find('[data-test-id="formfield-lastName-input"]');
                lastNameInput.setValue(longValue);

                // Act
                lastNameInput.trigger('blur');
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError)[0][0]).toBe('lastName');
            });

            it('should allow input and emit success event when the password field is populated with a long input', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-firstName-input"]').setValue('Joe');
                wrapper.find('[data-test-id="formfield-lastName-input"]').setValue('Test');
                wrapper.find('[data-test-id="formfield-email-input"]').setValue('joe@test.com');
                wrapper.find('[data-test-id="formfield-password-input"]').setValue('llanfairpwllgwyngyllgogerychwyrndrobwlllgwyngyllgogerychwyrndrobwllllantysiliogogogoch');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            });

            it('should show error message and emit failure event when the password field is populated with too short an input', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-password-input"]').setValue('foobarbaz');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowPasswordMinLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('password');
            });

            it('should show error message and emit inline failure event when the password field is populated with too short an input and focus is lost', async () => {
                // Arrange
                const passwordInput = wrapper.find('[data-test-id="formfield-password-input"]');
                passwordInput.setValue('foobarbaz');

                // Act
                passwordInput.trigger('blur');
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowPasswordMinLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError)[0][0]).toBe('password');
            });

            it('should show error message and emit failure event when the email field is populated with too long an input', async () => {
                // Arrange
                const longEmail = 'test-user-with-somewhat-long-email@justeattakeaway.com';
                wrapper.find('[data-test-id="formfield-email-input"]').setValue(longEmail);

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowEmailMaxLengthError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)[0][0].invalidFields).toContain('email');
            });

            it('should show error message and emit inline failure event when the email field is invalid and focus is lost', async () => {
                // Arrange
                const emailInput = wrapper.find('[data-test-id="formfield-email-input"]');
                emailInput.setValue('invalid email');

                // Act
                emailInput.trigger('blur');
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowEmailInvalidError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountInlineError)[0][0]).toBe('email');
            });

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-firstName-input"]').setValue('Joe');
                wrapper.find('[data-test-id="formfield-lastName-input"]').setValue('O\'Test');
                wrapper.find('[data-test-id="formfield-email-input"]').setValue('joe@test.com');
                wrapper.find('[data-test-id="formfield-password-input"]').setValue('foobarbazqux');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            });
        });
    });
});
