import {
     withKnobs, text, select, boolean
 } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
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

// eslint-disable-next-line
const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
    + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
    + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
    + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
    + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

export const TakeawaypayActivationComponent = () => ({
    components: { TakeawaypayActivation },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
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
        }
    },
    computed: {
        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
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
            // eslint-disable-next-line no-template-curly-in-string
            ':key="`${authToken},${getActivationStatusUrl},${activationUrl}`" />'
});

TakeawaypayActivationComponent.storyName = 'f-takeawaypay-activation';
