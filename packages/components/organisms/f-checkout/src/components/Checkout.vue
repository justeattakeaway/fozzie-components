<template>
    <div>
        <component
            :is="messageType.name"
            v-if="message && !errorFormType"
            ref="errorMessage"
            v-bind="messageType.props">
            <span>{{ messageType.content }}</span>
        </component>

        <div
            v-if="shouldShowSpinner"
            :class="$style['c-spinner-wrapper']"
            data-test-id="checkout-loading-spinner">
            <div :class="$style['c-spinner']" />
        </div>
        <div
            v-else-if="shouldShowCheckoutForm"
            data-theme="jet"
            data-test-id="checkout-component">
            <card
                is-rounded
                has-full-width-footer
                has-outline
                is-page-content-wrapper
                card-heading-position="center"
                :data-test-id="`checkout-card-component-${serviceType}`"
                :class="$style['c-checkout']">
                <checkout-header :login-url="loginUrl" />

                <form
                    method="post"
                    :class="$style['c-checkout-form']"
                    @submit.prevent="onFormSubmit">
                    <section
                        v-if="invalidFieldsSummary"
                        class="is-visuallyHidden"
                        role="alert"
                        data-test-id="error-summary-container">
                        {{ invalidFieldsSummary }}
                    </section>

                    <guest-block v-if="!isLoggedIn" />

                    <form-field
                        :value="customer.mobileNumber"
                        name="mobile-number"
                        maxlength="16"
                        input-type="tel"
                        :label-text="$t('labels.mobileNumber')"
                        :has-error="isMobileNumberEmpty || isMobileNumberInvalid"
                        aria-describedby="mobile-number-error"
                        :aria-invalid="isMobileNumberInvalid"
                        :aria-label="formattedMobileNumberForScreenReader"
                        @blur="formFieldBlur('mobileNumber')"
                        @input="updateCustomerDetails({ mobileNumber: $event })">
                        <template #error>
                            <error-message
                                v-if="isMobileNumberEmpty"
                                id="mobile-number-error"
                                data-js-error-message
                                data-test-id="error-mobile-number-empty">
                                {{ $t('validationMessages.mobileNumber.requiredError') }}
                            </error-message>
                            <error-message
                                v-if="isMobileNumberInvalid"
                                id="mobile-number-error"
                                data-js-error-message
                                data-test-id="error-mobile-number-invalid">
                                {{ $t('validationMessages.mobileNumber.invalidCharError') }}
                            </error-message>
                        </template>
                    </form-field>

                    <form-field
                        v-if="isCheckoutMethodDineIn"
                        :value="tableIdentifier"
                        input-type="text"
                        name="table-identifier"
                        :label-text="$t('labels.tableIdentifier')"
                        :has-error="isTableIdentifierEmpty"
                        maxlength="12"
                        @input="updateTableIdentifier($event)">
                        <template #error>
                            <error-message
                                v-if="isTableIdentifierEmpty"
                                data-js-error-message
                                data-test-id="error-table-identifier-empty">
                                {{ $t('validationMessages.tableIdentifier.requiredError') }}
                            </error-message>
                        </template>
                    </form-field>

                    <address-block
                        v-if="isCheckoutMethodDelivery"
                        data-test-id="address-block" />

                    <form-selector :key="availableFulfilmentTimesKey" />

                    <checkout-notes />

                    <f-button
                        :class="[
                            $style['c-checkout-submitButton'], {
                                [$style['c-checkout-submitButton--noBottomSpace']]: !isLoggedIn
                            }]"
                        button-type="primary"
                        button-size="large"
                        is-full-width
                        action-type="submit"
                        data-test-id="confirm-payment-submit-button"
                        :is-loading="isFormSubmitting"
                    >
                        {{ $t('buttonText') }}
                    </f-button>
                </form>

                <template
                    v-if="!isLoggedIn"
                    #cardFooter>
                    <checkout-terms-and-conditions />
                </template>
            </card>
        </div>

        <error-page
            v-else-if="errorFormType"
            :error-form-type="errorFormType"
            :redirect-url="redirectUrl"
            :service-type="serviceType" />
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
    required, email, maxLength, requiredIf
} from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { validations } from '@justeat/f-services';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import VueScrollTo from 'vue-scrollto';
import AddressBlock from './Address.vue';
import CheckoutHeader from './Header.vue';
import CheckoutNotes from './Notes.vue';
import CheckoutTermsAndConditions from './TermsAndConditions.vue';
import FormSelector from './Selector.vue';
import GuestBlock from './Guest.vue';
import ErrorDialog from './ErrorDialog.vue';
import ErrorPage from './Error.vue';
import exceptions from '../exceptions/exceptions';
import {
    ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE,
    CHECKOUT_ERROR_FORM_TYPE,
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
    TENANT_MAP,
    VALIDATIONS,
    VUEX_CHECKOUT_ANALYTICS_MODULE,
    VUEX_CHECKOUT_EXPERIMENTATION_MODULE,
    VUEX_CHECKOUT_MODULE
} from '../constants';
import checkoutValidationsMixin from '../mixins/validations.mixin';
import loggerMixin from '../mixins/logger.mixin';
import EventNames from '../event-names';
import tenantConfigs from '../tenants';
import { mapUpdateCheckoutRequest, mapAnalyticsNames } from '../services/mapper';
import addressService from '../services/addressService';

const {
    CreateGuestUserError,
    UpdateCheckoutError,
    UpdateCheckoutAccessForbiddenError,
    PlaceOrderError,
    GetCheckoutError,
    GetCheckoutAccessForbiddenError,
    AvailableFulfilmentGetError,
    GetBasketError
} = exceptions;

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
        FButton,
        Card,
        CheckoutHeader,
        CheckoutNotes,
        CheckoutTermsAndConditions,
        ErrorPage,
        ErrorMessage,
        FormField,
        FormSelector,
        GuestBlock,
        ErrorDialog
    },

    mixins: [
        validationMixin,
        VueGlobalisationMixin,
        checkoutValidationsMixin,
        loggerMixin
    ],

    props: {
        getCheckoutUrl: {
            type: String,
            required: true
        },

        checkoutAvailableFulfilmentUrl: {
            type: String,
            required: true
        },

        createGuestUrl: {
            type: String,
            required: true
        },

        getBasketUrl: {
            type: String,
            required: true
        },

        placeOrderUrl: {
            type: String,
            required: true
        },

        paymentPageUrlPrefix: {
            type: String,
            required: true
        },

        updateCheckoutUrl: {
            type: String,
            required: true
        },

        checkoutTimeout: {
            type: Number,
            required: false,
            default: 10000
        },

        spinnerTimeout: {
            type: Number,
            required: false,
            default: 500
        },

        authToken: {
            type: String,
            default: ''
        },

        otacToAuthExchanger: {
            type: Function,
            default: () => {
                throw new Error('otacToAuthExchanger is not implemented');
            }
        },

        loginUrl: {
            type: String,
            required: true
        },

        getAddressUrl: {
            type: String,
            required: true
        },

        applicationName: {
            type: String,
            required: true
        },

        getGeoLocationUrl: {
            type: String,
            required: true
        },

        experiments: {
            type: Object,
            default: () => ({})
        },

        getCustomerUrl: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            tenantConfigs,
            shouldShowSpinner: false,
            isLoading: false,
            errorFormType: null,
            isFormSubmitting: false,
            availableFulfilmentTimesKey: 0
        };
    },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    provide () {
        const $v = {};

        Object.defineProperty($v, VALIDATIONS.address, {
            enumerable: true,
            get: () => this.$v.address
        });

        Object.defineProperty($v, VALIDATIONS.guest, {
            enumerable: true,
            get: () => this.$v.customer
        });

        return { $v };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'address',
            'availableFulfilment',
            'basket',
            'customer',
            'errors',
            'geolocation',
            'isGuestCreated',
            'hasAsapSelected',
            'id',
            'isFulfillable',
            'isLoggedIn',
            'messages',
            'message',
            'notices',
            'orderId',
            'restaurant',
            'serviceType',
            'tableIdentifier',
            'time',
            'userNotes'
        ]),

        wasMobileNumberFocused () {
            return this.$v.customer.mobileNumber.$dirty;
        },

        isMobileNumberEmpty () {
            return this.wasMobileNumberFocused && !this.customer.mobileNumber;
        },

        isMobileNumberInvalid () {
            return this.wasMobileNumberFocused && !this.isMobileNumberEmpty && !this.$v.customer.mobileNumber.isValidPhoneNumber;
        },

        isTableIdentifierEmpty () {
            return this.$v.tableIdentifier.$dirty && !this.$v.tableIdentifier.required;
        },

        isCheckoutMethodDelivery () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY;
        },

        isCheckoutMethodDineIn () {
            return this.serviceType === CHECKOUT_METHOD_DINEIN;
        },

        tenant () {
            return TENANT_MAP[this.$i18n.locale];
        },

        shouldLoadAddress () {
            return this.isLoggedIn &&
                this.isCheckoutMethodDelivery &&
                (!this.address || !this.address.line1);
        },

        /* If phone number is missing both from chckout api and from
        * `state.AuthToken`, then retrieve the phone number from customer api
        * This can happen for newly created guest */
        shouldLoadCustomer () {
            return this.isLoggedIn &&
                !this.customer.mobileNumber;
        },

        shouldShowCheckoutForm () {
            return !this.isLoading && !this.errorFormType;
        },

        eventData () {
            return {
                isLoggedIn: this.isLoggedIn,
                serviceType: this.serviceType,
                chosenTime: this.time.from,
                isFulfillable: this.isFulfillable,
                issueMessage: this.message?.code
            };
        },

        messageType () {
            return this.message && this.message.shouldShowInDialog
                ? this.dialogMessage
                : this.alertMessage;
        },

        dialogMessage () {
            return {
                name: 'error-dialog',
                props: {
                    'redirect-url': this.redirectUrl
                }
            };
        },

        alertMessage () {
            return {
                name: 'alert',
                props: {
                    type: 'danger',
                    class: this.$style['c-checkout-alert'],
                    heading: this.$t('errorMessages.errorHeading')
                },
                content: this.message
            };
        },

        invalidFieldsSummary () {
            const invalidFieldCount = this.$v.$dirty
                && validations.getFormValidationState(this.$v).invalidFields.length;

            if (!invalidFieldCount) return null;

            return invalidFieldCount === 1 ?
                this.$t('errorMessages.singleFieldError') :
                this.$t('errorMessages.multipleFieldErrors', { errorCount: invalidFieldCount });
        },

        formattedMobileNumberForScreenReader () {
            return this.customer.mobileNumber ? [...this.customer.mobileNumber].join(' ') : '';
        },

        /**
         * If there is no fulfilment times available (errorFormType === noTimeAvailable)
         * redirect to search if the location cookie exists otherwise redirect to home.
         *
         * For all other error form types
         * redirect to menu if the `restaurant.seoName` exists otherwise redirect to home.
         *
         * */
        redirectUrl () {
            if (this.errorFormType === CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable) {
                const postcodeCookie = this.$cookies.get('je-location');

                return postcodeCookie ? `area/${postcodeCookie}` : '/';
            }

            const prefix = this.isCheckoutMethodDineIn ? 'dine-in' : 'restaurants';

            if (!this.restaurant.seoName) {
                return '/';
            }

            return `${prefix}-${this.restaurant.seoName}/menu`;
        }
    },

    watch: {
        /**
         *
         * Only reload checkout if the token changes as below:
         * Truthy > Falsey
         * Falsey > Truthy
         *
         * Do not reload checkout if the token changes from one token to another token
         * as it will always be valid.
         *
         * */
        async authToken (newTokenVal, oldTokenVal) {
            this.setAuthToken(this.authToken);

            if ((!newTokenVal && oldTokenVal) || (!oldTokenVal && newTokenVal)) {
                await this.initialise();
            }
        }
    },

    async mounted () {
        this.setAuthToken(this.authToken);

        await this.initialise();
        this.trackInitialLoad();
        this.$emit(EventNames.CheckoutMounted);
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'createGuestUser',
            'getAvailableFulfilment',
            'getAddress',
            'getCustomer',
            'getCustomerName',
            'getBasket',
            'getCheckout',
            'getGeoLocation',
            'placeOrder',
            'setAuthToken',
            'updateCheckout',
            'updateCustomerDetails',
            'updateTableIdentifier',
            'updateMessage',
            'updateUserNote',
            'updateAddress',
            'getUserNote',
            'saveUserNote'
        ]),

        ...mapActions(VUEX_CHECKOUT_ANALYTICS_MODULE, [
            'trackFormErrors',
            'trackFormInteraction',
            'trackInitialLoad'
        ]),

        ...mapActions(VUEX_CHECKOUT_EXPERIMENTATION_MODULE, [
            'setExperimentValues'
        ]),

        /**
         * Loads the necessary data to render a meaningful checkout component.
         *
         */
        async initialise () {
            this.setExperimentValues(this.experiments);
            this.isLoading = true;

            this.startSpinnerCountdown();

            const promises = this.isLoggedIn
                ? [this.loadBasket(), this.loadCheckout(), this.loadAvailableFulfilment()]
                : [this.loadBasket(), this.loadAddressFromLocalStorage(), this.loadAvailableFulfilment()];

            await Promise.all(promises);

            this.resetLoadingState();

            if (this.shouldLoadAddress) {
                await this.loadAddress();
            }

            // This call can be removed when newly created guest JWT token has phone number claim populated
            if (this.shouldLoadCustomer) {
                await this.loadCustomer();
            }

            this.getUserNote();
        },

        /**
         * Update address lines if localStorage is populated.
         *
         * */
        loadAddressFromLocalStorage () {
            const address = addressService.getAddressFromLocalStorage();

            if (address) {
                this.updateAddress(address);
            }
        },

        /**
         * Process all the information to submit the checkout and place an order
         * while emitting events to communicate its success or failure.
         *
         */
        async submitCheckout () {
            try {
                this.saveUserNote();

                if (!this.isLoggedIn && !this.isGuestCreated) {
                    await this.setupGuestUser();
                }

                await this.lookupGeoLocation();

                await this.handleUpdateCheckout();

                if (this.isFulfillable) {
                    await this.submitOrder();

                    this.redirectToPayment();
                } else {
                    this.handleNonFulfillableCheckout();
                }
            } catch (error) {
                this.handleErrorState(error);
            }
        },

        /**
         * Display and track issues when updating checkout even though the request was successful.
         * (e.g. request is correct, but the restaurant is now offline).
         */
        handleNonFulfillableCheckout () {
            if (this.errors) {
                this.trackFormErrors();

                this.logInvoker({
                    message: 'Consumer Checkout Not Fulfillable',
                    data: this.eventData,
                    logMethod: this.$logger.logWarn
                });

                this.$emit(EventNames.CheckoutUpdateFailure, this.eventData);
            }
        },

        /**
         * Handles call of `updateCheckout` and catches and throws any returned errors.
         * 1. Maps checkout data.
         * 2. Call `updateCheckout`.
         * 3. If `updateCheckout` call succeeds but issues are returned, it will be handled by
         *    its parent method
         * 4. If `updateCheckout` call fails, throw an UpdateCheckoutError.
         */
        async handleUpdateCheckout () {
            try {
                const data = mapUpdateCheckoutRequest({
                    address: this.address,
                    customer: this.customer,
                    isCheckoutMethodDelivery: this.isCheckoutMethodDelivery,
                    isCheckoutMethodDineIn: this.isCheckoutMethodDineIn,
                    time: this.time,
                    userNotes: this.userNotes,
                    geolocation: this.geolocation,
                    asap: this.hasAsapSelected,
                    tableIdentifier: this.tableIdentifier
                });

                await this.updateCheckout({
                    url: this.updateCheckoutUrl,
                    data,
                    timeout: this.checkoutTimeout
                });

                await this.reloadAvailableFulfilmentTimesIfOutdated();

                this.$emit(EventNames.CheckoutUpdateSuccess, this.eventData);
            } catch (e) {
                const statusCode = e?.response?.data?.statusCode || e?.response?.status;

                if (statusCode === 403) {
                    throw new UpdateCheckoutAccessForbiddenError(e, this.$logger);
                }

                throw new UpdateCheckoutError(e);
            }
        },

        /**
         * Redirect to the payment page.
         */
        redirectToPayment () {
            window.location.assign(`${this.paymentPageUrlPrefix}/${this.orderId}`);
        },

        /**
         * Place the order, emit the expected events, and throw a new PlaceOrderError if the process fails.
         */
        async submitOrder () {
            try {
                const data = {
                    basketId: this.basket.id,
                    customerNotes: {
                        noteForRestaurant: this.userNotes.delivery?.note || this.userNotes.restaurant?.note,
                        noteForKitchen: this.userNotes.kitchen.note
                    },
                    referralState: this.getReferralState()
                };

                await this.placeOrder({
                    url: this.placeOrderUrl,
                    data,
                    timeout: this.checkoutTimeout
                });

                this.$emit(EventNames.CheckoutPlaceOrderSuccess, this.eventData);
                this.$emit(EventNames.CheckoutSuccess, this.eventData);

                this.logInvoker({
                    message: 'Consumer Checkout Successful',
                    data: this.eventData,
                    logMethod: this.$logger.logInfo
                });
            } catch (e) {
                const errorCode = e?.response?.data?.errorCode;

                throw new PlaceOrderError(e.message, errorCode, this.$logger);
            }
        },

        /**
         * Setup a new guest user account. This method will be called when isLoggedIn is false.
         * Events emitted to communicate success or failure.
         * Throw a CreateGuestUserError if it fails.
         */
        async setupGuestUser () {
            try {
                const createGuestData = {
                    emailAddress: this.customer.email,
                    firstName: this.customer.firstName,
                    lastName: this.customer.lastName,
                    registrationSource: 'Guest'
                };

                await this.createGuestUser({
                    url: this.createGuestUrl,
                    tenant: this.tenant,
                    data: createGuestData,
                    timeout: this.checkoutTimeout,
                    otacToAuthExchanger: this.otacToAuthExchanger
                });

                this.$emit(EventNames.CheckoutSetupGuestSuccess);
            } catch (e) {
                throw new CreateGuestUserError(e.message);
            }
        },

        /**
         * Load the checkout details while emitting events to communicate its success or failure.
         *
         */
        async loadCheckout () {
            try {
                await this.getCheckout({
                    url: this.getCheckoutUrl,
                    timeout: this.checkoutTimeout
                });

                this.$emit(EventNames.CheckoutGetSuccess);
            } catch (error) {
                if (error?.response?.status === 403) {
                    this.handleErrorState(new GetCheckoutAccessForbiddenError(error.message, this.$logger));
                } else {
                    this.handleErrorState(new GetCheckoutError(error.message, error?.response?.status));
                }
            }
        },

        /**
         * Load the basket details while emitting events to communicate its success or failure.
         *
         */
        async loadBasket () {
            try {
                await this.getBasket({
                    url: this.getBasketUrl,
                    tenant: this.tenant,
                    language: this.$i18n.locale,
                    timeout: this.checkoutTimeout
                });

                this.$emit(EventNames.CheckoutBasketGetSuccess);
            } catch (error) {
                this.handleErrorState(new GetBasketError(error.message, error?.response?.status));
            }
        },

        /**
         * Load the available fulfilment details while emitting events to communicate its success or failure.
         *
         */
        async loadAvailableFulfilment () {
            try {
                await this.getAvailableFulfilment({
                    url: this.checkoutAvailableFulfilmentUrl,
                    timeout: this.checkoutTimeout
                });

                if (!this.availableFulfilment.times.length) {
                    this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable;
                }

                this.$emit(EventNames.CheckoutAvailableFulfilmentGetSuccess);
            } catch (error) {
                this.handleErrorState(new AvailableFulfilmentGetError(error.message, error.response?.status));
            }
        },

        /**
         * Load the customer address while emitting events to communicate its success or failure.
         *
         */
        async loadAddress () {
            try {
                await this.getAddress({
                    url: this.getAddressUrl,
                    tenant: this.tenant,
                    language: this.$i18n.locale,
                    timeout: this.checkoutTimeout,
                    currentPostcode: this.$cookies.get('je-location')
                });

                this.$emit(EventNames.CheckoutAddressGetSuccess);
            } catch (error) {
                this.$emit(EventNames.CheckoutAddressGetFailure, error);

                this.logInvoker({
                    message: 'Get checkout address failure',
                    data: this.eventData,
                    logMethod: this.$logger.logWarn,
                    error
                });
            }
        },

        /**
         * Load the customer while emitting events to communicate its success or failure.
         *
         */
        async loadCustomer () {
            try {
                await this.getCustomer({
                    url: this.getCustomerUrl,
                    timeout: this.checkoutTimeout
                });

                this.$emit(EventNames.CheckoutCustomerGetSuccess);
            } catch (error) {
                this.$emit(EventNames.CheckoutCustomerGetFailure, error);

                this.logInvoker({
                    message: 'Get checkout customer failure',
                    data: this.eventData,
                    logMethod: this.$logger.logWarn,
                    error
                });
            }
        },

        /**
         * Look up the geo details for the customers address, skip on failure.
         *
         */
        async lookupGeoLocation () {
            try {
                const locationData = {
                    addressLines: Object.values(this.address).filter(addressLine => !!addressLine)
                };

                if (locationData.addressLines.length) {
                    await this.getGeoLocation({
                        url: this.getGeoLocationUrl,
                        postData: locationData,
                        timeout: this.checkoutTimeout
                    });
                }
            } catch (error) {
                this.logInvoker({
                    message: 'Geo Location Lookup Failed',
                    data: this.eventData,
                    logMethod: this.$logger.logWarn,
                    error
                });
            }
        },

        /**
         * Emit, log and track the error based on the parameters
         * encapsulated within the 'error' class.
         * Set the `message` for the user to see.
         */
        handleErrorState (error) {
            const message = this.$t(error.messageKey) || this.$t('errorMessages.genericServerError');
            const eventToEmit = error.eventToEmit || EventNames.CheckoutFailure;
            const logMessage = error.logMessage || 'Consumer Checkout Failure';
            const logMethod = error.logMethod || this.$logger.logError;
            const errorName = error.errorCode ? `${error.errorCode}-` : ''; // This appends the hyphen so it doesn't appear in the logs when the error name does not exist

            this.$emit(eventToEmit, { ...this.eventData, error });

            this.logInvoker({
                message: logMessage,
                data: this.eventData,
                logMethod,
                error
            });

            this.trackFormInteraction({ action: 'error', error: `error_${errorName}${error.message}` });

            if (!error.shouldShowInDialog && !error.errorFormType) {
                this.updateMessage(message);

                this.$nextTick(() => {
                    this.scrollToElement(this.$refs.errorMessage.$el);
                });
            }

            this.errorFormType = error.errorFormType;
        },

        /**
         * Scroll to a ref element in the screen.
        */
        scrollToElement (element, options = { offset: -20 }) {
            const scrollingDurationInMilliseconds = 650;

            if (element) {
                VueScrollTo.scrollTo(element, scrollingDurationInMilliseconds, options);
            }
        },

        /**
         * Check form is valid - no inline messages
         * 1. If form is valid try to call `submitCheckout`.
         * 2. If the form is invalid process error tracking and logging via `onInvalidCheckoutForm()`.
         */
        async onFormSubmit () {
            this.trackFormInteraction({ action: 'submit' });
            this.updateMessage();
            this.setSubmittingState(true);

            if (this.isFormValid()) {
                await this.submitCheckout();
            } else {
                this.onInvalidCheckoutForm();
            }

            this.setSubmittingState(false);
        },

        /**
         * Fired when `isFormValid` returns falsey via `onFormSubmit()` call.
         * 1. Emit `CheckoutValidationError` for consuming application.
         * 2. Process tracking with action type and error fields
         * 3. Log warn.
         *
         * */
        onInvalidCheckoutForm () {
            const validationState = validations.getFormValidationState(this.$v);
            const invalidFields = mapAnalyticsNames(validationState.invalidFields);

            this.scrollToFirstInlineError();

            this.$emit(EventNames.CheckoutValidationError, validationState);
            this.trackFormInteraction({
                action: 'inline_error',
                error: invalidFields
            });

            this.trackFormInteraction({
                action: 'error',
                error: ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE
            });

            this.logInvoker({
                message: 'Checkout Validation Error',
                data: { ...this.eventData, validationState },
                logMethod: this.$logger.logWarn
            });
        },

        /**
         * Scroll to the first inline error, no matter which one it is.
         */
        scrollToFirstInlineError () {
            this.$nextTick(() => {
                const firstInlineError = document.querySelector('[data-js-error-message]');

                this.scrollToElement(firstInlineError, { offset: -100 });
            });
        },

        /**
         * Check to see if any `Vuelidate` validation errors
         */
        isFormValid () {
            this.$v.$touch();
            return !this.$v.$invalid;
        },

        /**
         * Use phone validation in `f-services` to check if customer number is
         * valid in current locale
         */
        isValidPhoneNumber () {
            return validations.isValidPhoneNumber(this.customer.mobileNumber, this.$i18n.locale);
        },

        /**
         * Use postcode validation in `f-services` to check if customer postcode is
         * valid in current locale
         */
        isValidPostcode () {
            return validations.isValidPostcode(this.address.postcode, this.$i18n.locale);
        },

        resetLoadingState () {
            this.isLoading = false;
            this.shouldShowSpinner = false;
        },

        startSpinnerCountdown () {
            setTimeout(() => {
                if (this.isLoading) {
                    this.shouldShowSpinner = true;
                }
            }, this.spinnerTimeout);
        },

        formFieldBlur (field) {
            const fieldValidation = this.$v.customer[field];
            if (fieldValidation) {
                fieldValidation.$touch();
            }
        },

        /**
         * Sets the submitting state of the Checkout form. When true a spinner is displayed on the submit button
         * This is done to allow us to test the setting of this value and ensure it is called with the correct value in the correct order.
         * @param  {boolean} isFormSubmitting  - whether the form should be in a submitting state or not.
         */
        setSubmittingState (isFormSubmitting) {
            this.isFormSubmitting = isFormSubmitting;
        },

        getReferralState () {
            const cookieName = `je-rw-menu-referral-state-${this.restaurant.id}`;
            const referralCookie = this.$cookies.get(cookieName);

            return referralCookie && referralCookie.menuReferralState
                ? 'ReferredByWeb'
                : 'None';
        },

        /**
         * Calls `loadAvailableFulfilment` times if we have no available fulfilment times available.
         * Updates the key for the `FromDropdown` component to force the component re-render.
         *
         * When we receive the new `availableFulfilment` times, the dropdown doesn't automatically set the selected time
         * to the first available fulfilment time. It leaves the selected value blank.
         * Forcing the component to re-render ensures that the correct time is selected and displayed.
         */
        async reloadAvailableFulfilmentTimesIfOutdated () {
            if (this.message?.code === ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE) {
                await this.loadAvailableFulfilment();
                this.availableFulfilmentTimesKey++;
            }
        }
    },

    validations () {
        const validationProperties = {
            customer: {
                mobileNumber: {
                    isValidPhoneNumber: this.isValidPhoneNumber
                }
            },
            tableIdentifier: {
                required: requiredIf(() => this.isCheckoutMethodDineIn),
                maxLength: maxLength(12)
            }
        };

        if (!this.isLoggedIn) {
            validationProperties.customer = {
                ...validationProperties.customer,
                firstName: {
                    required
                },
                lastName: {
                    required
                },
                email: {
                    required,
                    email
                }
            };
        }

        if (this.isCheckoutMethodDelivery) {
            validationProperties.address = {
                line1: {
                    required
                },
                locality: {
                    required
                },
                postcode: {
                    required,
                    isValidPostcode: this.isValidPostcode
                }
            };
        }

        return validationProperties;
    }
};
</script>

<style lang="scss" module>
@include loadingIndicator('large');

.c-spinner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .c-spinner {
        margin: 0 auto;
    }
}

.c-checkout {
    @include media('<=narrow') {
        border: none;
        margin-top: 0;
        margin-bottom: 0;
    }
}

.c-checkout-form {
    margin-top: spacing(x2);
}

.c-checkout-alert {
    width: $checkout-width;
    margin-left: auto;
    margin-right: auto;

    @include media('<=#{$checkout-width}') {
        width: calc(100% - #{spacing(x5)}); // Matches the margin of `f-card`
    }
}
/* If these stay the same then just rename the class to something more generic */
.c-checkout-submitButton {
    margin: spacing(x4) 0;

    @include media('>=#{$checkout-width}') {
        margin: spacing(x4) 0 0;
    }
}

.c-checkout-submitButton--noBottomSpace {
    margin-bottom: 0;
}
</style>
