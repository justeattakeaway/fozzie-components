import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import { AUTHENTICATION_JWT } from '../test-utils/constants/f-takeawaypayActivation';
import TakeawaypayActivation from '../src/components/TakeawaypayActivation.vue';
import ApiMock from '../src/demo/apiMock';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
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

export const TakeawaypayActivationComponent = (args, { argTypes }) => ({
    components: { TakeawaypayActivation },
    props: Object.keys(argTypes),
    computed: {
        authToken () {
            return this.isLoggedIn ? AUTHENTICATION_JWT : '';
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

TakeawaypayActivationComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb, locales.au, locales.nz, locales.it, locales.es, locales.ie],
        description: 'Locale'
    },
    isLoggedIn: {
        control: { type: 'boolean' },
        description: 'Is User Logged In'
    },
    activationStatusResponse: {
        control: { type: 'select' },
        options: activationStatusOptions,
        description: 'Activation Status Response'
    },
    activateResponse: {
        control: { type: 'select' },
        options: activateOptions,
        description: 'Activate Takeaway Pay Response'
    },
    loginUrl: {
        control: { type: 'text' },
        description: 'Login URL'
    },
    registrationUrl: {
        control: { type: 'text' },
        description: 'Registration URL'
    },
    homeUrl: {
        control: { type: 'text' },
        description: 'Home URL'
    },
    employeeId: {
        control: { type: 'text' },
        description: 'Employee ID'
    }
};

TakeawaypayActivationComponent.args = {
    employeeId: '12345',
    homeUrl: '/home',
    registrationUrl: '/account/register',
    loginUrl: '/account/login',
    activateResponse: null,
    activationStatusResponse: null,
    locale: locales.gb,
    isLoggedIn: false
};

TakeawaypayActivationComponent.storyName = 'f-takeawaypay-activation';
