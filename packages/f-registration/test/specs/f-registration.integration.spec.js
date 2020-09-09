import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Registration from '../../src/components/Registration.vue';
import EventNames from '../../src/event-names';

const axiosMock = new MockAdapter(axios);


const CONSUMERS_REQUEST_DATA =
    {
        "emailAddress": "test-user@justeat.com",
        "firstName": "Test",
        "lastName": "User",
        "password": "test123"
    };

const propsData = {
    locale: 'en-GB',
    createAccountUrl: 'http://localhost/account/register'
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

        }).reply(409);

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
            console.log(wrapper)
            expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
        } finally {
            wrapper.destroy();
        }
    });
});
