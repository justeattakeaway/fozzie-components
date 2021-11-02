import {
     withKnobs, text, select, boolean
 } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import TakeawaypayActivation from '../src/components/TakeawaypayActivation.vue';
import ApiMock from '../src/demo/apiMock';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

const activationStatusAvailableResponse = '/activation-status-200.json';
const activationStatusBadRequestResponse = '/activation-status-400.json';
const activationStatusInternalErrorResponse = '/activation-status-500.json';
const activateSuccessResponse = '/activate-200.json';
const activateBadRequestResponse = '/activate-400.json';
const activateInternalErrorResponse = '/activate-500.json';

ApiMock.setupApiResponse(activationStatusAvailableResponse);
ApiMock.setupApiResponse(activationStatusBadRequestResponse);
ApiMock.setupApiResponse(activationStatusInternalErrorResponse);
ApiMock.setupApiResponse(activateSuccessResponse);
ApiMock.setupApiResponse(activateBadRequestResponse);
ApiMock.setupApiResponse(activateInternalErrorResponse);
ApiMock.passThroughAny();

const activationBadRequestDescription = 'Linking token is invalid, account already linked (Response from server is 400)';
const activationInternalErrorDescription = 'Internal Server Error (Response from server is 500)';
const activationBadRequest = '400';
const activationInternalError = '500';
const activateSuccessDescription = 'Activation successful';

const authenticationLoggedInRegistered = 'Logged In (registered)';
const authenticationLoggedInGuest = 'Logged In (guest)';

// eslint-disable-next-line
const mockAuthTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
  + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
  + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
  + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
  + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

// eslint-disable-next-line
const mockAuthTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImN'
  + 'yZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJ'
  + 'zdWIiOiIxODcwMzA5MyIsIm5hbWUiOiJKb2UgQmxvZ2dzIiwiZ2xvYmFsX3V'
  + 'zZXJfaWQiOiJVN05SQWxXQWc1ek9kc2RSZ2Y3bmtUeW9pOTBYRW89IiwiZ2l2'
  + 'ZW5fbmFtZSI6IkpvZSIsImZhbWlseV9uYW1lIjoiQmxvZ2dzIiwicm9sZSI6Ik'
  + 'd1ZXN0IiwiaWF0IjoxNjE1NDY5NTE2fQ.d-dLpZM8vi7IR1GdqZI9IPzUcjnidU-7qO62B3Nfk6I';

const authenticationOptions = {
    None: null,
    [authenticationLoggedInRegistered]: mockAuthTokenRegistered,
    [authenticationLoggedInGuest]: mockAuthTokenGuest
};

const activationStatusOptions = {
    None: null,
    [activationBadRequestDescription]: activationBadRequest,
    [activationInternalErrorDescription]: activationInternalError
};

const activateOptions = {
    [activateSuccessDescription]: null,
    [activationBadRequestDescription]: activationBadRequest,
    [activationInternalErrorDescription]: activationInternalError
};

export const TakeawaypayActivationComponent = () => ({
    components: { TakeawaypayActivation },
    props: {
        locale: {
            default: select('Locale', [locales.gb, locales.au], locales.gb)
        },
        authentication: {
            default: select('Authentication', authenticationOptions)
        },
        activationStatusResponse: {
            default: select('Activation Status Response', activationStatusOptions)
        },
        activateResponse: {
            default: select('Activate Takeaway Pay Response', activateOptions)
        },
        loginUrl: {
            default: text('Login URL', '/account/login')
        },
        registrationUrl: {
            default: text('Registration URL', '/account/register')
        },
        homeUrl: {
            default: text('Home URL', '/home')
        },
        employeeId: {
            default: text('Employee Id', '12345')
        }
    },
    computed: {
        authToken () {
            return this.authentication ? this.authentication : '';
        },
        getActivationStatusUrl () {
            return this.activationStatusResponse ? `/activation-status-${this.activationStatusResponse}.json` : '/activation-status-200.json';
        },
        activationUrl () {
            return this.activateResponse ? `/activate-${this.activateResponse}.json` : '/activate-200.json';
        }
    },

    template: 
        '<takeawaypay-activation ' +
            ':login-url="loginUrl" ' +
            ':registration-url="registrationUrl" ' +
            ':home-url="homeUrl" ' +
            ':get-activation-status-url="getActivationStatusUrl" ' +
            ':activate-url="activationUrl" ' +
            ':authToken="authToken" ' +
            ':employee-id="employeeId" ' +
            ':locale="locale" ' +
            // eslint-disable-next-line no-template-curly-in-string
            ':key="`${authToken},${getActivationStatusUrl},${activationUrl},${locale}`" />'
});

TakeawaypayActivationComponent.storyName = 'f-takeawaypay-activation';
