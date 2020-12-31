import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Registration from '../Registration.vue';
import EventNames from '../../event-names';
import { CONSUMERS_REQUEST_DATA } from '../../../test/specs/constants/consumer';

const axiosMock = new MockAdapter(axios);

const propsData = {
    locale: 'en-GB',
    createAccountUrl: 'http://localhost/consumer/uk',
    showLoginLink: true,
    loginUrl: '/account/register'
};

let wrapper;

describe('Registration API service', () => {
    allure.feature('Registration API');
    beforeEach(() => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        wrapper = mount(Registration, { propsData, attachTo: div });
    });

    afterEach(() => {
        wrapper.destroy();
        jest.clearAllMocks();
    });

    it('responds with 201 when request is made with valid details', async () => {
        // Arrange
        axiosMock.onPost(propsData.createAccountUrl, CONSUMERS_REQUEST_DATA).reply(201);

        // Act
        wrapper.find('[data-test-id="input-first-name"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
        wrapper.find('[data-test-id="input-last-name"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
        wrapper.find('[data-test-id="input-email"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
        wrapper.find('[data-test-id="input-password"]').setValue(CONSUMERS_REQUEST_DATA.password);
        // TODO: Add marketing preferences checkbox when it exists

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
    });

    it('responds with 409 when request is made with e-mail in use', async () => {
        // Arrange
        axiosMock.onPost(propsData.createAccountUrl, CONSUMERS_REQUEST_DATA).reply(409, {
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
        wrapper.find('[data-test-id="input-first-name"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
        wrapper.find('[data-test-id="input-last-name"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
        wrapper.find('[data-test-id="input-email"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
        wrapper.find('[data-test-id="input-password"]').setValue(CONSUMERS_REQUEST_DATA.password);
        // TODO: Add marketing preferences checkbox when it exists

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
        expect(wrapper.vm.shouldShowEmailAlreadyExistsError).toBe(true);
    });

    it('responds with 403 when login blocked by ravelin or recaptcha', async () => {
        // Arrange
        axiosMock.onPost(propsData.createAccountUrl, CONSUMERS_REQUEST_DATA).reply(403, {
            faultId: '25bbe062-c53d-4fbc-9d6c-3df6127b94fd',
            traceId: 'H3TKh4QSJUSwVBCBqEtkKw',
            errors: [
                {
                    description: 'Failed user authentication.',
                    errorCode: 'FailedUserAuthentication'
                }
            ]
        });

        // Act
        wrapper.find('[data-test-id="input-first-name"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
        wrapper.find('[data-test-id="input-last-name"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
        wrapper.find('[data-test-id="input-email"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
        wrapper.find('[data-test-id="input-password"]').setValue(CONSUMERS_REQUEST_DATA.password);
        // TODO: Add marketing preferences checkbox when it exists

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.LoginBlocked).length).toBe(1);
        expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
    });
});
