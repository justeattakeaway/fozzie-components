import RegistrationServiceApi from '../../services/RegistrationServiceApi'
jest.mock('../../services/RegistrationServiceApi', () => ({ createAccount: jest.fn() })); 
import { mount, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';

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
    });

    describe('when creating an account', () => {        
        function mountComponentAndAttachToDocument () {
            const div = document.createElement('div');
            document.body.appendChild(div);
            return mount(Registration, { propsData, sync: false, attachTo: div });
        }

        it('should post correct data and emit success event when service succeeds', async () => {
            // Arrange
            RegistrationServiceApi.createAccount.mockImplementation(async () => Promise.resolve());
            const wrapper = mountComponentAndAttachToDocument();
            try {
                const firstName = 'Adam',
                    lastName = 'Ashton',
                    email = 'adam.ashton+jetest@just-eat.com',
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
            RegistrationServiceApi.createAccount.mockImplementation(async () => { throw new Error('Conflict') });
            const wrapper = mountComponentAndAttachToDocument();
            try {
                const firstName = 'Adam',
                    lastName = 'Ashton',
                    email = 'adam.ashton+jetest@just-eat.com',
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
