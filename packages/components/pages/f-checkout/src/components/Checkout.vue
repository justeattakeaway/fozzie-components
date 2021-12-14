<template>
    <div>
        <component
            :is="errorType"
            v-if="checkoutErrorMessage"
            ref="errorMessage"
            v-bind="errorProps.props"
            @created="handleDialogCreation">
            <span>{{ errorProps.content }}</span>
        </component>

        <age-verification
            v-if="shouldShowAgeVerificationForm" />

        <div
            v-if="shouldShowCheckoutForm"
            data-theme="jet"
            data-test-id="checkout-component">
            <card
                has-full-width-footer
                has-outline
                is-page-content-wrapper
                card-heading-position="center"
                :data-test-id="`checkout-card-component-${serviceType}`"
                :class="$style['c-checkout']">
                <checkout-header :login-url="loginUrl" />

                <checkout-form
                    :tenant="tenant"
                    :is-checkout-method-delivery="isCheckoutMethodDelivery"
                    :is-checkout-method-dine-in="isCheckoutMethodDineIn"
                    :scroll-to-element="scrollToElement"
                    :available-fulfilment-times-key="availableFulfilmentTimesKey"
                    :is-form-submitting="isFormSubmitting"
                    :is-split-notes-enabled="checkoutFeatures.isSplitNotesEnabled"
                    v-on="formEvents" />

                <template
                    v-if="!isLoggedIn"
                    #cardFooter>
                    <checkout-terms-and-conditions />
                </template>
            </card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import VueScrollTo from 'vue-scrollto';
import AgeVerification from './AgeVerification.vue';
import CheckoutFormField from './CheckoutFormField.vue';
import CheckoutForm from './CheckoutForm.vue';
import CheckoutHeader from './Header.vue';
import CheckoutNotes from './Notes.vue';
import CheckoutTermsAndConditions from './TermsAndConditions.vue';
import ErrorDialog from './ErrorDialog.vue';
import ErrorPage from './Error.vue';
import exceptions from '../exceptions/exceptions';
import {
    AGE_VERIFICATION_ISSUE,
    ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE,
    CHECKOUT_ERROR_FORM_TYPE,
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    DOB_REQUIRED_ISSUE,
    ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
    ERROR_CODE_RESTAURANT_NOT_TAKING_ORDERS,
    ERROR_TYPES,
    TENANT_MAP,
    VUEX_CHECKOUT_ANALYTICS_MODULE,
    VUEX_CHECKOUT_EXPERIMENTATION_MODULE,
    VUEX_CHECKOUT_MODULE
} from '../constants';
import loggerMixin from '../mixins/logger.mixin';
import EventNames from '../event-names';
import LogEvents from '../log-events';
import tenantConfigs from '../tenants';
import { mapUpdateCheckoutRequest, mapAnalyticsNames } from '../services/mapper';
import addressService from '../services/addressService';
import CheckoutAnalyticsService from '../services/analytics';

const {
    CreateGuestUserError,
    UpdateCheckoutError,
    UpdateCheckoutAccessForbiddenError,
    PlaceOrderError,
    GetCheckoutError,
    GetCheckoutAccessForbiddenError,
    AvailableFulfilmentGetError,
    AvailableFulfilmentEmptyError,
    GetBasketError
} = exceptions;

export default {
    name: 'VueCheckout',

    components: {
        AgeVerification,
        Alert,
        Card,
        CheckoutFormField,
        CheckoutForm,
        CheckoutHeader,
        CheckoutNotes,
        CheckoutTermsAndConditions,
        ErrorPage,
        ErrorDialog
    },

    mixins: [
        VueGlobalisationMixin,
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
            default: 60000
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
        },

        getNoteConfigUrl: {
            type: String,
            required: true
        },

        checkoutFeatures: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            tenantConfigs,
            isLoading: true,
            availableFulfilmentTimesKey: 0,
            checkoutAnalyticsService: new CheckoutAnalyticsService(this),
            isFormSubmitting: false
        };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'address',
            'availableFulfilment',
            'basket',
            'checkoutErrorMessage',
            'customer',
            'errors',
            'geolocation',
            'isGuestCreated',
            'hasAsapSelected',
            'id',
            'isFulfillable',
            'isLoggedIn',
            'messages',
            'notices',
            'orderId',
            'restaurant',
            'serviceType',
            'dineIn',
            'time',
            'notes',
            'notesConfiguration'
        ]),

        ...mapState(VUEX_CHECKOUT_ANALYTICS_MODULE, [
            'changedFields'
        ]),

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
            return this.isLoggedIn && !this.customer.mobileNumber;
        },

        shouldShowCheckoutErrorPage () {
            return this.checkoutErrorMessage?.errorType === ERROR_TYPES.errorPage;
        },

        shouldShowCheckoutForm () {
            return !this.isLoading && !this.shouldShowCheckoutErrorPage && !this.shouldShowAgeVerificationForm;
        },

        shouldShowAgeVerificationForm () {
            return !this.shouldShowCheckoutErrorPage && this.errors.some(error => error.messageKey === DOB_REQUIRED_ISSUE || error.messageKey === AGE_VERIFICATION_ISSUE);
        },

        eventData () {
            return {
                isLoggedIn: this.isLoggedIn,
                serviceType: this.serviceType
            };
        },

        errorType () {
            return this.checkoutErrorMessage.errorType || null;
        },

        errorProps () {
            const alertProps = {
                type: 'danger',
                class: this.$style['c-checkout-alert'],
                heading: this.$t('errorMessages.errorHeading')
            };

            const isAlert = this.checkoutErrorMessage?.errorType === ERROR_TYPES.alert;

            return {
                props: isAlert ? alertProps : { 'redirect-url': this.redirectUrl },
                ...isAlert && { content: this.checkoutErrorMessage?.messageKey }
            };
        },

        /**
         * If there is no fulfilment times available (messageKey === noTimeAvailable)
         * redirect to search if the location cookie exists otherwise redirect to home.
         *
         * For all other error form types
         * redirect to menu if the `restaurant.seoName` exists otherwise redirect to home.
         *
         * */
        redirectUrl () {
            if (this.checkoutErrorMessage?.messageKey === CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable
                || this.checkoutErrorMessage?.messageKey === ERROR_CODE_RESTAURANT_NOT_TAKING_ORDERS) {
                const postcodeCookie = this.$cookies.get('je-location');

                return postcodeCookie ? `area/${postcodeCookie}` : '/';
            }

            const prefix = this.isCheckoutMethodDineIn ? 'dine-in' : 'restaurants';

            if (!this.restaurant.seoName) {
                return '/';
            }

            return `${prefix}-${this.restaurant.seoName}/menu`;
        },

        formEvents () {
            return {
                [EventNames.FormSubmitting]: this.onFormSubmit,
                [EventNames.FormValid]: this.submitCheckout,
                [EventNames.FormInvalid]: this.onInvalidCheckoutForm
            };
        },

        placeOrderNotes () {
            const { courier, kitchen, order } = this.notes;
            return {
                NoteForRestaurant: order?.note || null,
                ...(kitchen?.note && { NoteForKitchen: kitchen.note }),
                ...(courier?.note && { NoteForDriver: courier.note })
            };
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
        this.checkoutAnalyticsService.trackInitialLoad();
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
            'updateUserNotes',
            'updateCheckoutErrorMessage',
            'updateAddress',
            'getNotesConfiguration'
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

            const promises = this.isLoggedIn
                ? [this.loadBasket(), this.loadCheckout(), this.loadAvailableFulfilment()]
                : [this.loadBasket(), this.loadAddressFromLocalStorage(), this.loadAvailableFulfilment()];

            await Promise.all(promises);

            await this.loadNotesConfiguration();

            this.resetLoadingState();

            if (this.shouldLoadAddress) {
                await this.loadAddress();
            }

            // This call can be removed when newly created guest JWT token has phone number claim populated
            if (this.shouldLoadCustomer) {
                await this.loadCustomer();
            }
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
                if (!this.isLoggedIn && !this.isGuestCreated) {
                    await this.setupGuestUser();
                }

                await this.lookupGeoLocation();

                await this.handleUpdateCheckout(this.getMappedDataForUpdateCheckout());

                if (this.isFulfillable) {
                    await this.submitOrder();

                    this.redirectToPayment();
                } else {
                    this.handleNonFulfillableCheckout();
                }
            } catch (error) {
                this.handleErrorState(error);
            } finally {
                this.setSubmittingState(false);
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

        /**
         * Emits and/or logs event with eventData, error and any additional data
         */
        handleEventLogging (event, error, additionalData) {
            if (EventNames[event]) {
                const data = LogEvents[event]?.hasEventData && this.eventData;

                if (data || error) {
                    this.$emit(EventNames[event], { ...data, ...(error && { error }) });
                } else {
                    this.$emit(EventNames[event]);
                }
            }

            if (LogEvents[event]?.logMessage) {
                this.logInvoker({
                    message: LogEvents[event].logMessage,
                    data: { ...this.eventData, ...additionalData },
                    logMethod: this.$logger[LogEvents[event].logMethod],
                    ...error && { error }
                });
            }
        },


        /**
         * Display and track issues when updating checkout even though the request was successful.
         * (e.g. request is correct, but the restaurant is now offline).
         */
        handleNonFulfillableCheckout () {
            if (this.errors) {
                this.checkoutAnalyticsService.trackFormErrors();

                this.handleEventLogging('CheckoutNonFulfillableError');
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
        async handleUpdateCheckout (requestData) {
            try {
                await this.updateCheckout({
                    url: this.updateCheckoutUrl,
                    data: requestData,
                    timeout: this.checkoutTimeout
                }).then(headers => {
                    if (headers) {
                        this.checkoutAnalyticsService.trackLowValueOrderExperiment(headers);
                    }
                });

                await this.reloadAvailableFulfilmentTimesIfOutdated();

                this.handleEventLogging('CheckoutUpdateSuccess');
            } catch (e) {
                const statusCode = e?.response?.data?.statusCode || e?.response?.status;

                if (statusCode === 403) {
                    throw new UpdateCheckoutAccessForbiddenError(e);
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
                    customerNotes: this.placeOrderNotes,
                    referralState: this.getReferralState()
                };
                await this.placeOrder({
                    url: this.placeOrderUrl,
                    data,
                    timeout: this.checkoutTimeout
                });

                this.handleEventLogging('CheckoutPlaceOrderSuccess');
                this.handleEventLogging('CheckoutSuccess');
            } catch (e) {
                const errorCode = e?.response?.data?.errorCode;

                throw new PlaceOrderError(e.message, errorCode);
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

                this.handleEventLogging('CheckoutSetupGuestSuccess');
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

                this.handleEventLogging('CheckoutGetSuccess');
            } catch (error) {
                if (error?.response?.status === 403) {
                    this.handleErrorState(new GetCheckoutAccessForbiddenError(error.message));
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

                this.handleEventLogging('CheckoutBasketGetSuccess');
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
                    this.handleErrorState(new AvailableFulfilmentEmptyError('AvailableFulfilmentTimesEmpty'));
                } else {
                    this.handleEventLogging('CheckoutAvailableFulfilmentGetSuccess');
                }
            } catch (error) {
                this.handleErrorState(new AvailableFulfilmentGetError(error.message, error.response.status));
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

                this.handleEventLogging('CheckoutAddressGetSuccess');
            } catch (error) {
                this.handleEventLogging('CheckoutAddressGetFailure', error);
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
                this.handleEventLogging('CheckoutCustomerGetSuccess');
            } catch (error) {
                this.handleEventLogging('CheckoutCustomerGetFailure');
            }
        },

        /**
         * Look up the geo details for the customers address, skip on failure.
         *
         */
        async lookupGeoLocation () {
            if (this.isCheckoutMethodDelivery) {
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
                    this.handleEventLogging('CheckoutGeoLocationGetFailure', error);
                }
            }
        },

        /**
         * Emit, log and track the error based on the parameters
         * encapsulated within the 'error' class.
         * Set the `message` for the user to see.
         */
        handleErrorState (error) {
            const messageKey = this.$t(error.messageKey) || this.$t('errorMessages.genericServerError');

            const errorName = error.errorCode ? `${error.errorCode}-` : ''; // This appends the hyphen so it doesn't appear in the logs when the error name does not exist

            this.handleEventLogging((error.eventMessage || 'CheckoutFailure'), error);

            this.checkoutAnalyticsService.trackFormInteraction({ action: 'error', error: `error_${errorName}${error.message}` });

            this.updateCheckoutErrorMessage({
                messageKey,
                errorType: error.errorType || ERROR_TYPES.alert
            });

            if (this.checkoutErrorMessage?.errorType === ERROR_TYPES.alert) {
                this.$nextTick(() => {
                    this.scrollToElement(this.$refs.errorMessage.$el);
                });
            }
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

        onFormSubmit () {
            this.setSubmittingState(true);
            this.checkoutAnalyticsService.trackFormInteraction({ action: 'submit' });
            this.updateCheckoutErrorMessage();
        },

        /**
         * Fired when `isFormValid` returns falsey via ``CheckoutForm`.
         * 1. Emit `CheckoutValidationError` for consuming application.
         * 2. Process tracking with action type and error fields
         * 3. Log warn.
         *
         * */
        onInvalidCheckoutForm (validationState) {
            const invalidFields = mapAnalyticsNames(validationState.invalidFields);

            this.checkoutAnalyticsService.trackFormInteraction({
                action: 'inline_error',
                error: invalidFields
            });

            this.checkoutAnalyticsService.trackFormInteraction({
                action: 'error',
                error: ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE
            });

            const expandedData = {
                enteredPostcode: this.address?.postcode,
                location: this.$cookies.get('je-location'),
                locationUk: this.$cookies.get('je-location-uk'),
                changedFields: this.changedFields,
                isPostcodeChanged: this.changedFields.includes('addressPostcode')
            };

            this.handleEventLogging('CheckoutValidationError', validationState, { ...expandedData, validationState });
            this.setSubmittingState(false);
        },

        resetLoadingState () {
            this.isLoading = false;
            this.$parent.$emit(EventNames.StopLoadingSpinner); // We need to use `$this.$parent.$emit` here because checkout will be mounted as a slot in `f-spinner`.
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
            if (this.checkoutErrorMessage?.messageKey === ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE) {
                await this.loadAvailableFulfilment();
                this.availableFulfilmentTimesKey++;
            }
        },

        handleDialogCreation (event) {
            this.checkoutAnalyticsService.trackDialogEvent(event);
        },

        getMappedDataForUpdateCheckout () {
            const notes = this.getNotes();
            return mapUpdateCheckoutRequest({
                address: this.address,
                customer: this.customer,
                isCheckoutMethodDelivery: this.isCheckoutMethodDelivery,
                isCheckoutMethodDineIn: this.isCheckoutMethodDineIn,
                time: this.time,
                notes,
                geolocation: this.geolocation,
                asap: this.hasAsapSelected,
                tableIdentifier: this.dineIn.tableIdentifier
            });
        },

        async loadNotesConfiguration () {
            console.log('NOTE CONFIG URL', `${this.getNoteConfigUrl}/${this.restaurant.id}/checkout-note-types`);
            if (this.checkoutFeatures.isSplitNotesEnabled) {
                try {
                    await this.getNotesConfiguration({
                        url: `${this.getNoteConfigUrl}/${this.restaurant.id}/checkout-note-types`,
                        timeout: this.checkoutTimeout
                    });
                } catch (error) {
                    this.handleEventLogging('NotesConfigurationFailure');
                }
            }
        },

        getNotes () {
            return this.checkoutFeatures.isSplitNotesEnabled ? this.notes : [{ type: 'delivery', value: this.notes.order?.note }];
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout {
    @include media('<=narrow') {
        border: none;
        margin-top: 0;
        margin-bottom: 0;
    }
}

.c-checkout-submitButton--noBottomSpace {
    margin-bottom: 0;
}

.c-checkout-alert {
    width: $checkout-width;
    margin-left: auto;
    margin-right: auto;

    @include media('<=#{$checkout-width}') {
        width: calc(100% - #{spacing(x5)}); // Matches the margin of `f-card`
    }
}
</style>
