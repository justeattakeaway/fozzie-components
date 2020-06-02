import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';
import { mount, shallowMount } from '@vue/test-utils';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';

describe('Registration', () => {
    const axiosMock = new MockAdapter(axios);
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

        afterEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
        });

        it('should post correct data and emit success event when API responds with 201 Created', async () => {
            // Arrange
            axiosMock.onPost('http://localhost/account/register').reply(201);
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
                expect(axiosMock.history.post.length).toBe(1);
                expect(axiosMock.history.post[0].data).toBe(JSON.stringify({
                    firstName, lastName, email, password
                }));
                expect(wrapper.vm.genericErrorMessage).toBeNull();
                expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
            } finally {
                wrapper.destroy();
            }
        });

        it('should populate error message and emit failure event when API responds with 409 Conflict', async () => {
            // Arrange
            axiosMock.onPost('http://localhost/account/register').reply(409, { data: 'The email address already exists' });
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
