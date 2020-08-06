import { mount, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import RegistrationServiceApi from '../../services/RegistrationServiceApi';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';

jest.mock('../../services/RegistrationServiceApi', () => ({ createAccount: jest.fn() }));

describe('Registration', () => {
    const propsData = {
        tenant: 'uk',
        createAccountUrl: 'http://localhost/account/register'
    };

    it('should be defined', () => {
        const wrapper = shallowMount(Registration, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('has a button', () => {
        const wrapper = shallowMount(Registration, { propsData });
        const button = wrapper.find("[data-test-id='create-account-submit-button']");
        expect(button.exists()).toBe(true);
    });

    describe(': props :', () => {
        it('if `value` is specified, should assign the input field a value attribute', () => {
            const wrapper = shallowMount(Registration, { propsData });
            expect(wrapper.exists()).toBe(true);
        });

        it('should show the login link if loginSettings prop set.', () => {
            const wrapper = shallowMount(Registration, {
                propsData: {
                    tenant: 'uk',
                    createAccountUrl: 'http://localhost/account/register',
                    loginSettings: {
                        preLinkText: 'Already have an account?',
                        linkText: 'Log in',
                        url: '/login'
                    }
                }
            });

            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            expect(loginLink.exists()).toBe(true);
        });

        it('should not show the login link if loginSettings prop set but linkText not set.', () => {
            const wrapper = shallowMount(Registration, {
                propsData: {
                    tenant: 'uk',
                    createAccountUrl: 'http://localhost/account/register',
                    loginSettings: {
                        preLinkText: 'Already have an account?'
                    }
                }
            });

            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            expect(loginLink.exists()).toBe(false);
        });

        it('should not show the login link if loginSettings prop set but url not set.', () => {
            const wrapper = shallowMount(Registration, {
                propsData: {
                    tenant: 'uk',
                    createAccountUrl: 'http://localhost/account/register',
                    loginSettings: {
                        preLinkText: 'Already have an account?',
                        linkText: 'Log in'
                    }
                }
            });

            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            expect(loginLink.exists()).toBe(false);
        });

        it('shoud not show the login link if loginSettings prop not set', () => {
            const wrapper = shallowMount(Registration, { propsData });

            const loginLink = wrapper.find("[data-test-id='create-account-login-link']");

            expect(loginLink.exists()).toBe(false);
        });
    });

    describe('when creating an account', () => {
        function mountComponentAndAttachToDocument () {
            const div = document.createElement('div');
            document.body.appendChild(div);
            return mount(Registration, { propsData, attachTo: div });
        }

        it('should post correct data and emit success event when service succeeds', async () => {
            // Arrange
            RegistrationServiceApi.createAccount.mockImplementation(async () => Promise.resolve());
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(RegistrationServiceApi.createAccount).toHaveBeenCalledTimes(1);
                expect(wrapper.vm.genericErrorMessage).toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should populate generic error message and emit failure event when service responds with an error', async () => {
            // Arrange
            RegistrationServiceApi.createAccount.mockImplementation(async () => { throw new Error('Conflict'); });
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).not.toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when service responds with a 409', async () => {
            // Arrange
            const err = { response: { data: { faultId: '123', traceId: '123', errors: [{ description: 'The specified email already exists', errorCode: '409' }] } } };
            RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowEmailAlreadyExistsError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should populate generic error message and emit failure event when service responds with a 400', async () => {
            // Arrange
            const err = { response: { data: { faultId: '123', traceId: '123', errors: [{ description: 'The Password field is required', errorCode: '400' }] } } };
            RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('The Password field is required');
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show default error message and emit failure event when service with an error with no description', async () => {
            // Arrange
            const err = { response: { data: { errors: [{ errorCode: 'XXX' }] } } };
            RegistrationServiceApi.createAccount.mockImplementation(async () => { throw err; });
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).toEqual('Something went wrong, please try again later');
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the first name field is not populated', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameRequiredError).toBe(true);
                expect(wrapper.vm.shouldShowFirstNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(false);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the first name field is populated with invalid input', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                wrapper.find('[data-test-id="input-first-name"]').setValue('wh4t @ w3!rd |\\|ame');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the first name field is populated with too long an input', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                const longValue = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';
                wrapper.find('[data-test-id="input-first-name"]').setValue(longValue);

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameMaxLengthError).toBe(true);
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(false);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the last name field is not populated', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                wrapper.find('[data-test-id="input-first-name"]').setValue('Adam');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameRequiredError).toBe(true);
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameInvalidCharError).toBe(false);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the last name field is populated with invalid input', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                wrapper.find('[data-test-id="input-last-name"]').setValue('wh4t @ w3!rd |\\|ame');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameInvalidCharError).toBe(true);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show error message and emit failure event when the last name field is populated with too long an input', async () => {
            // Arrange
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                const longValue = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';
                wrapper.find('[data-test-id="input-last-name"]').setValue(longValue);

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowLastNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(true);
                expect(wrapper.vm.shouldShowLastNameInvalidCharError).toBe(false);
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should show not error messages and emit success event when the name fields are populated correctly', async () => {
            // Arrange
            RegistrationServiceApi.createAccount.mockImplementation(async () => Promise.resolve());
            const wrapper = mountComponentAndAttachToDocument();
            Object.defineProperty(wrapper.vm.$v, '$invalid', { get: jest.fn(() => false) });
            try {
                wrapper.find('[data-test-id="input-first-name"]').setValue('James');
                wrapper.find('[data-test-id="input-last-name"]').setValue('O\'Neil-Wight');
                wrapper.find('[data-test-id="input-email"]').setValue('ashton.adamms+jetest@just-eat.com');
                wrapper.find('[data-test-id="input-password"]').setValue('Secure123');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.vm.shouldShowFirstNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowFirstNameInvalidCharError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameRequiredError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameMaxLengthError).toBe(false);
                expect(wrapper.vm.shouldShowLastNameInvalidCharError).toBe(false);
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });
    });
});
