import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Registration from '../Registration.vue';
import EventNames from '../../event-names';

const axiosMock = new MockAdapter(axios);


const CONSUMERS_REQUEST_DATA =
    {
        emailAddress: 'test-user@justeat.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'test123'
    };

const propsData = {
    locale: 'en-GB',
    createAccountUrl: 'http://localhost/consumer/uk'
};

describe('Registration API service', () => {
    function mountComponentAndAttachToDocument () {
        const div = document.createElement('div');
        document.body.appendChild(div);
        return mount(Registration, { propsData, attachTo: div });
    }

    it('responds with 201 when request is made with valid details', async () => {
        // Arrange
        axiosMock.onPost(propsData.createAccountUrl, {

            firstName: CONSUMERS_REQUEST_DATA.firstName,
            lastName: CONSUMERS_REQUEST_DATA.lastName,
            emailAddress: CONSUMERS_REQUEST_DATA.emailAddress,
            password: CONSUMERS_REQUEST_DATA.password

        }).reply(201);

        // Act
        const wrapper = mountComponentAndAttachToDocument();
        try {
            wrapper.find('[data-test-id="input-first-name"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
            wrapper.find('[data-test-id="input-last-name"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
            wrapper.find('[data-test-id="input-email"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
            wrapper.find('[data-test-id="input-password"]').setValue(CONSUMERS_REQUEST_DATA.password);

            // Act
            await wrapper.vm.onFormSubmit();
            await flushPromises();

            // Assert
            expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
        } finally {
            wrapper.destroy();
        }
    });

    it('responds with 409 when request is made with e-mail in use', async () => {
        // Arrange
        axiosMock.onPost(propsData.createAccountUrl, {

            firstName: CONSUMERS_REQUEST_DATA.firstName,
            lastName: CONSUMERS_REQUEST_DATA.lastName,
            emailAddress: CONSUMERS_REQUEST_DATA.emailAddress,
            password: CONSUMERS_REQUEST_DATA.password

        }).reply(409, {
            faultId: 'e2ea5f11-f771-487a-9f80-5c6f0981890b',
            traceId: '80000806-0000-fd00-b63f-84710c7967bb',
            errors: [
                {
                    description: 'The specified email already exists',
                    errorCode: '409'
                }
            ]
        });

        // Act
        const wrapper = mountComponentAndAttachToDocument();
        try {
            wrapper.find('[data-test-id="input-first-name"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
            wrapper.find('[data-test-id="input-last-name"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
            wrapper.find('[data-test-id="input-email"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
            wrapper.find('[data-test-id="input-password"]').setValue(CONSUMERS_REQUEST_DATA.password);

            // Act
            await wrapper.vm.onFormSubmit();
            await flushPromises();

            // Assert
            expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
            expect(wrapper.vm.shouldShowEmailAlreadyExistsError).toBe(true);
        } finally {
            wrapper.destroy();
        }
    });
});
