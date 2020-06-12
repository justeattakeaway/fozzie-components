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
            try {
                const firstName = 'Ashton',
                    lastName = 'Adamms',
                    email = 'ashton.adamms@just-eat.com',
                    password = 'Passw0rd';
                await wrapper.find("[data-test-id='input-first-name']").setValue(firstName);
                await wrapper.find("[data-test-id='input-last-name']").setValue(lastName);
                await wrapper.find("[data-test-id='input-email']").setValue(email);
                await wrapper.find("[data-test-id='input-password']").setValue(password);

                // Act
                wrapper.find("[data-test-id='create-account-submit-button']").trigger('click');
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
            try {
                const firstName = 'Ashton',
                    lastName = 'Adamms',
                    email = 'ashton.adamms+jetest@just-eat.com',
                    password = 'Passw0rd';
                await wrapper.find("[data-test-id='input-first-name']").setValue(firstName);
                await wrapper.find("[data-test-id='input-last-name']").setValue(lastName);
                await wrapper.find("[data-test-id='input-email']").setValue(email);
                await wrapper.find("[data-test-id='input-password']").setValue(password);

                // Act
                wrapper.find("[data-test-id='create-account-submit-button']").trigger('click');
                await flushPromises();

                // Assert
                expect(wrapper.vm.genericErrorMessage).not.toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });
    });
});
