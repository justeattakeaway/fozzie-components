import { mount, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import RegistrationServiceApi from '../../services/RegistrationServiceApi';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';

jest.mock('../../services/RegistrationServiceApi', () => ({ createAccount: jest.fn() }));

let wrapper;

describe('Registration', () => {
    const propsData = {
        locale: 'en-GB',
        createAccountUrl: 'http://localhost/account/register',
        showLoginLink: true,
        loginUrl: '/account/register'
    };

    it('should be defined', () => {
        // Arrange & Act
        wrapper = shallowMount(Registration, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should have one form with method "post"', () => {
        // Arrange
        wrapper = mount(Registration, { propsData });

        // Act
        const forms = wrapper.findAll('form');

        // Assert
        expect(forms.length).toBe(1);
        expect(forms.wrappers[0].attributes('method')).toBe('post');
    });

    it('should have a button', () => {
        // Arrange
        wrapper = shallowMount(Registration, { propsData });

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
                }
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
                }
            });

            // Act
            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            // Assert
            expect(loginLink.exists()).toBe(false);
        });

        it('should show the login link if showLoginLink prop not set', () => {
            // Arrange
            wrapper = shallowMount(Registration, { propsData });

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
                }
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
            return mount(Registration, { propsData, attachTo: div });
        };

        afterEach(() => {
            wrapper.destroy();
        });

        describe('with a faulty registration service', () => {
            it('should populate generic error message and emit failure event when service responds with an error', async () => {
                // Arrange
                RegistrationServiceApi.createAccount.mockImplementation(async () => { throw new Error('Conflict'); });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).not.toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });

            it('should show error message and emit failure event when service responds with a 409', async () => {
                // Arrange
                const err = { response: { data: { faultId: '123', traceId: '123', errors: [{ description: 'The specified email already exists', errorCode: '409' }] } } };
                RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowEmailAlreadyExistsError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });

            it('should emit login blocked event when service responds with a 403', async () => {
                // Arrange
                const err = {
                    response:
                    {
                        data: {
                            faultId: '123',
                            traceId: '123',
                            errors: [
                                {
                                    description: 'Failed user authentication.',
                                    errorCode: 'FailedUserAuthentication'
                                }
                            ]
                        }
                    }
                };

                RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.LoginBlocked).length).toBe(1);
                expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
            });

            it('should populate generic error message and emit failure event when service responds with a 400', async () => {
                // Arrange
                const err = { response: { data: { faultId: '123', traceId: '123', errors: [{ description: 'The Password field is required', errorCode: '400' }] } } };
                RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('The Password field is required');
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            });

            it('should show default error message and emit failure event when service with an error with no description', async () => {
                // Arrange
                const err = { response: { data: { errors: [{ errorCode: 'XXX' }] } } };
                RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
                wrapper = mountComponentAndAttachToDocument();
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('Something went wrong, please try again later');
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
                Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(RegistrationServiceApi.createAccount).toHaveBeenCalledTimes(1);
                expect(wrapper.vm.genericErrorMessage).toBeNull();
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
                wrapper.find('[data-test-id="formfield-password-input"]').setValue('dog');

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
                passwordInput.setValue('dog');

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
                wrapper.find('[data-test-id="formfield-password-input"]').setValue('abc123');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            });
        });
    });
});
