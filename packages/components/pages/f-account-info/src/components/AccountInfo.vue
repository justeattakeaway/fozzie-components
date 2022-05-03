<template>
    <div>
        <f-card
            v-if="!shouldShowLoadErrorCard"
            :card-heading="$t('accountDetails')"
            data-test-id="account-info"
            has-inner-spacing-large
            card-size-custom="medium"
            has-outline>
            <h2
                class="u-spacingBottom--large">
                {{ $t('yourDetails') }}
            </h2>

            <email-address-field :email-address="consumer.emailAddress" />

            <form
                method="post"
                @submit.prevent="onFormSubmit">
                <form-field
                    :value="consumer.firstName"
                    name="account-info-consumer-firstName"
                    maxlength="50"
                    :label-text="$t('consumer.firstNameLabel')"
                    :placeholder="$t('consumer.firstNamePlaceholder')"
                    @blur="onBlur('firstName')"
                    @input="onEditConsumer('firstName', $event)">
                    <template
                        v-if="$v.consumer.firstName.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.firstName.required && $v.consumer.firstName.$dirty"
                            data-test-id="consumer-firstName-empty-error">
                            {{ $t('validation.firstNameRequired') }}
                        </f-error-message>
                        <f-error-message
                            v-show="!$v.consumer.firstName.isValidName"
                            data-test-id="consumer-firstName-invalid-error">
                            {{ $t('validation.firstNameInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.lastName"
                    name="account-info-consumer-lastName"
                    maxlength="50"
                    :label-text="$t('consumer.lastNameLabel')"
                    :placeholder="$t('consumer.lastNamePlaceholder')"
                    @blur="onBlur('lastName')"
                    @input="onEditConsumer('lastName', $event)">
                    <template
                        v-if="$v.consumer.lastName.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.lastName.required && $v.consumer.lastName.$dirty"
                            data-test-id="consumer-lastName-empty-error">
                            {{ $t('validation.lastNameRequired') }}
                        </f-error-message>
                        <f-error-message
                            v-show="!$v.consumer.lastName.isValidName"
                            data-test-id="consumer-lastName-invalid-error">
                            {{ $t('validation.lastNameInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.phoneNumber"
                    name="account-info-consumer-phoneNumber"
                    maxlength="16"
                    :label-text="$t('consumer.phoneNumberLabel')"
                    :placeholder="$t('consumer.phoneNumberPlaceholder')"
                    @blur="onBlur('phoneNumber')"
                    @input="onEditConsumer('phoneNumber', $event)">
                    <template
                        v-if="$v.consumer.phoneNumber.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.phoneNumber.required && $v.consumer.phoneNumber.$dirty"
                            data-test-id="consumer-phoneNumber-empty-error">
                            {{ $t('validation.phoneNumberRequired') }}
                        </f-error-message>
                        <f-error-message
                            v-show="!$v.consumer.phoneNumber.isValidPhoneNumber && $v.consumer.phoneNumber.required && $v.consumer.phoneNumber.$dirty"
                            data-test-id="consumer-phoneNumber-invalid-error">
                            {{ $t('validation.phoneNumberInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <h2
                    class="u-spacingBottom--large">
                    {{ $t('deliveryAddress') }}
                </h2>

                <form-field
                    :value="consumer.line1"
                    name="account-info-consumer-line1"
                    maxlength="50"
                    :label-text="$t('consumer.addressLabel')"
                    :placeholder="$t('consumer.line1Placeholder')"
                    @blur="onBlur('line1')"
                    @input="onEditConsumer('line1', $event, true)">
                    <template
                        v-if="$v.consumer.line1.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.line1.required && $v.consumer.line1.$dirty"
                            data-test-id="consumer-address-line1-empty-error">
                            {{ $t('validation.line1Required') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.line2"
                    name="account-info-consumer-line2"
                    maxlength="50"
                    :placeholder="$t('consumer.line2Placeholder')"
                    @input="onEditConsumer('line2', $event, true)" />

                <form-field
                    :value="consumer.line3"
                    name="account-info-consumer-line3"
                    maxlength="50"
                    :placeholder="$t('consumer.line3Placeholder')"
                    @input="onEditConsumer('line3', $event, true)" />

                <form-field
                    :value="consumer.locality"
                    name="account-info-consumer-locality"
                    maxlength="50"
                    :label-text="$t('consumer.localityLabel')"
                    :placeholder="$t('consumer.localityPlaceholder')"
                    @blur="onBlur('locality')"
                    @input="onEditConsumer('locality', $event, true)">
                    <template
                        v-if="$v.consumer.locality.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.locality.required && $v.consumer.locality.$dirty"
                            data-test-id="consumer-city-empty-error">
                            {{ $t('validation.localityRequired') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.postcode"
                    name="account-info-consumer-postcode"
                    maxlength="50"
                    :label-text="$t('consumer.postcodeLabel')"
                    :placeholder="$t('consumer.postcodePlaceholder')"
                    @blur="onBlur('postcode')"
                    @input="onEditConsumer('postcode', $event, true)">
                    <template
                        v-if="$v.consumer.postcode.$invalid"
                        #error>
                        <f-error-message
                            v-show="!$v.consumer.postcode.required && $v.consumer.postcode.$dirty"
                            data-test-id="consumer-postcode-empty-error">
                            {{ $t('validation.postcodeRequired') }}
                        </f-error-message>
                        <f-error-message
                            v-show="!$v.consumer.postcode.isValidPostcode && $v.consumer.postcode.required"
                            data-test-id="consumer-postcode-invalid-error">
                            {{ $t('validation.postcodeInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <notifications
                    :error-message-key="error.messageKey"
                    :show-save-error-alert="shouldShowSaveErrorAlert"
                    :show-successful-alert="shouldShowSuccessfulAlert" />

                <f-button
                    :class="[$style['c-accountInfo-submitButton']]"
                    data-test-id="account-info-save-changes-button"
                    button-type="primary"
                    button-size="large"
                    is-full-width
                    action-type="submit"
                    :is-loading="isFormSubmitting">
                    {{ $t('buttons.saveChanges') }}
                </f-button>
            </form>

            <f-button
                :class="[$style['c-accountInfo-changePasswordButton']]"
                data-test-id="account-info-change-password-button"
                button-type="secondary"
                href="/account/change-password?returnurl=/account/info"
                button-size="large"
                is-full-width
                action-type="submit">
                {{ $t('buttons.changePassword') }}
            </f-button>

            <delete-account />
        </f-card>

        <f-card-with-content
            v-else
            data-test-id="account-info-error-card"
            :card-heading="$t('errorMessages.loading.heading')"
            :card-description="$t(error.messageKey)">
            <template #icon>
                <bag-sad-bg-icon />
            </template>
        </f-card-with-content>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { mapActions, mapState } from 'vuex';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import FErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FCardWithContent from '@justeat/f-card-with-content';
import '@justeat/f-card-with-content/dist/f-card-with-content.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import {
    BagSadBgIcon
} from '@justeat/f-vue-icons';
import EmailAddressField from './EmailAddressField.vue';
import DeleteAccount from './DeleteAccount.vue';
import AccountInfoValidationMixin from './AccountInfoValidationMixin.vue';
import Notifications from './Notifications.vue';
import tenantConfigs from '../tenants';
import ConsumerApi from '../services/providers/Consumer.api';
import fAccountInfoModule from '../store/accountInfo.module';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';
import InfoPageError from '../exceptions/InfoPageError';

const standardLogTags = ['account-pages', 'account-info'];

export default {
    components: {
        FCard,
        FCardWithContent,
        FormField,
        FButton,
        FErrorMessage,
        EmailAddressField,
        DeleteAccount,
        Notifications,
        BagSadBgIcon
    },

    mixins: [
        VueGlobalisationMixin,
        AccountInfoValidationMixin
    ],

    props: {
        authToken: {
            type: String,
            default: null
        },
        isAuthFinished: {
            type: Boolean,
            required: true
        },
        smartGatewayBaseUrl: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            consumerApi: new ConsumerApi({
                httpClient: this.$http,
                cookies: this.$cookies,
                baseUrl: this.smartGatewayBaseUrl
            }),
            tenantConfigs,
            isFormSubmitting: false,
            hasFormUpdate: false,
            hasAddressBeenUpdated: false,
            shouldShowLoadErrorCard: false,
            shouldShowSaveErrorAlert: false,
            shouldShowSuccessfulAlert: false,
            error: {}
        };
    },

    computed: {
        ...mapState('fAccountInfoModule', [
            'consumer'
        ])
    },

    watch: {
        isAuthFinished: {
            immediate: true, // this prevents the need to call initialise() on mounted
            async handler (value) {
                if (value) {
                    await this.initialise();
                }
            }
        }
    },

    beforeCreate () {
        if (!this.$store.hasModule('fAccountInfoModule')) {
            this.$store.registerModule('fAccountInfoModule', fAccountInfoModule);
        }
    },

    methods: {
        ...mapActions('fAccountInfoModule', [
            'loadConsumerDetails',
            'editConsumerDetails',
            'saveConsumerDetails'
        ]),

        setFormUpdateState (isDirty, isAddressField) {
            this.hasFormUpdate = isDirty;
            this.shouldShowSaveErrorAlert = false;
            this.shouldShowSuccessfulAlert = !isDirty;

            if (isAddressField) {
                this.hasAddressBeenUpdated = true;
            }
        },

        /**
        * Informs the template that we are in an Error State.
        * @param {object} error - The error that has recently occurred
        */
        handleLoadErrorState (error) {
            this.shouldShowLoadErrorCard = true;
            this.error = new InfoPageError(error?.message, error?.response?.status, 'errorMessages.loading.description');
        },

        /**
        * Informs the template that we failed to save.
        * @param {object} error - The error that has recently occurred
        */
        handleSaveErrorState (error) {
            this.shouldShowSaveErrorAlert = true;
            this.error = new InfoPageError(error?.message, error?.response?.status, 'errorMessages.saving.description');
        },

        /**
        * Gets the form data (from the api) and assigns it to State
        * then lowers the hasFormUpdate + hasAddressBeenUpdated flag
        * as the form data is currently clean then stops the on-screen
        * spinner from showing
        *
        * If an error occurs then this is logged and the Template is
        * informed that it is in a state of error.
        */
        async initialise () {
            try {
                await this.loadConsumerDetails({ api: this.consumerApi, authToken: this.authToken });
                this.$log.info('Consumer details fetched successfully', standardLogTags);
            } catch (error) {
                // Debug - Temp logging - Check auth token state when GET fails
                let endpointAuthTokenExpired = 0;                
                try {
                    if (this.authToken) {
                        const { exp } = jwtDecode(this.authToken);
                        if (Date.now() >= exp * 1000) {
                            endpointAuthTokenExpired = 1;
                        }
                    } else {
                        endpointAuthTokenExpired = 1;
                    }
                } catch {
                    // noop
                    endpointAuthTokenExpired = -1;
                }
                // Debug ^
                this.$log.error('Error fetching consumer details', error, standardLogTags, { endpointAuthTokenExpired });
                this.handleLoadErrorState(error);
            } finally {
                this.$nextTick(() => {
                    this.$parent.$emit(EVENT_SPINNER_STOP_LOADING);
                });
            }
        },

        /**
        * If there are any form changes
        * then informs the Template that we are submitting the form
        * then Saves the State (via the api)
        * then lowers the hasFormUpdate flag as the form data is now currently clean again
        * then informs the Template that we are now not submitting the form
        *
        * If an error occurs then this is logged and the Template is
        * informed that it is in a state of error.
        */
        async onFormSubmit () {
            if (this.isFormInvalid()) {
                this.logValidationFailure();
                return;
            }

            if (!this.hasFormUpdate) {
                return;
            }

            this.setSubmittingState(true);

            try {
                await this.saveConsumerDetails({ api: this.consumerApi, authToken: this.authToken });
                this.$log.info('Consumer details saved successfully', standardLogTags);
                this.analyticsTrackFormSubmission(this.hasAddressBeenUpdated);
                this.setFormUpdateState(false, false);
            } catch (error) {
                this.$log.error('Error saving consumer details', error, standardLogTags);
                this.handleSaveErrorState(error);
            } finally {
                this.setSubmittingState(false);
            }
        },

        /**
        * Sets the flag to inform the Template of whether the form is currently submitting or not
        * @param {boolean} isFormSubmitting - True = Form is being submitted / False = Form is not being submitted
        */
        setSubmittingState (isFormSubmitting) {
            this.isFormSubmitting = isFormSubmitting;
        },

        /**
        * A generic method that updates the State (e.g. 'consumer.<field> = value')
        * @param {string} field - The field of the consumer that needs changing
        * @param {string} value - The new value of the consumer field
        * @param {Boolean} isAddressField - The field is part of the address.
        */
        onEditConsumer (field, value, isAddressField = false) {
            this.editConsumerDetails({ field, value });
            this.setFormUpdateState(true, isAddressField);
        },

        /**
        * Pushes `form` event to the dataLayer with correct data
        */
        analyticsTrackFormSubmission (hasAddressBeenUpdated) {
            this.$gtm.pushEvent({
                event: 'trackEvent',
                category: 'account',
                action: 'save_accountinfo_changes',
                label: 'submit'
            });

            if (hasAddressBeenUpdated) {
                this.$gtm.pushEvent({
                    event: 'trackEvent',
                    category: 'my account',
                    action: 'account info',
                    label: 'address change intent'
                });
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-accountInfo-submitButton {
    margin-top: spacing(f);
}

.c-accountInfo-changePasswordButton {
    margin-top: spacing(d);
}
</style>
