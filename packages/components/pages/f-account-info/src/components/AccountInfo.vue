<template>
    <div>
        <f-card
            v-if="!shouldShowErrorPage"
            :card-heading="$t('accountDetails')"
            data-test-id="account-info"
            has-outline
            is-page-content-wrapper>
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
                    data-test-id="account-info-consumer-firstName"
                    maxlength="50"
                    :label-text="$t('consumer.firstNameLabel')"
                    :placeholder="$t('consumer.firstNamePlaceholder')"
                    @blur="onBlur('firstName')"
                    @input="onEditConsumer('firstName', $event)">
                    <template
                        v-if="$v.consumer.firstName.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.firstName.required && $v.consumer.firstName.$dirty">
                            {{ $t('validation.firstNameRequired') }}
                        </f-error-message>
                        <f-error-message v-show="!$v.consumer.firstName.isValidName">
                            {{ $t('validation.firstNameInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.lastName"
                    data-test-id="account-info-consumer-lastName"
                    maxlength="50"
                    :label-text="$t('consumer.lastNameLabel')"
                    :placeholder="$t('consumer.lastNamePlaceholder')"
                    @blur="onBlur('lastName')"
                    @input="onEditConsumer('lastName', $event)">
                    <template
                        v-if="$v.consumer.lastName.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.lastName.required && $v.consumer.lastName.$dirty">
                            {{ $t('validation.lastNameRequired') }}
                        </f-error-message>
                        <f-error-message v-show="!$v.consumer.lastName.isValidName">
                            {{ $t('validation.lastNameInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.phoneNumber"
                    maxlength="16"
                    :label-text="$t('consumer.phoneNumberLabel')"
                    :placeholder="$t('consumer.phoneNumberPlaceholder')"
                    @blur="onBlur('phoneNumber')"
                    @input="onEditConsumer('phoneNumber', $event)">
                    <template
                        v-if="$v.consumer.phoneNumber.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.phoneNumber.required && $v.consumer.phoneNumber.$dirty">
                            {{ $t('validation.phoneNumberRequired') }}
                        </f-error-message>
                        <f-error-message v-show="!$v.consumer.phoneNumber.isValidPhoneNumber && $v.consumer.phoneNumber.required && $v.consumer.phoneNumber.$dirty">
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
                    maxlength="50"
                    :label-text="$t('consumer.addressLabel')"
                    :placeholder="$t('consumer.line1Placeholder')"
                    @blur="onBlur('line1')"
                    @input="onEditConsumer('line1', $event)">
                    <template
                        v-if="$v.consumer.line1.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.line1.required && $v.consumer.line1.$dirty">
                            {{ $t('validation.line1Required') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.line2"
                    maxlength="50"
                    :placeholder="$t('consumer.line2Placeholder')"
                    @input="onEditConsumer('line2', $event)" />

                <form-field
                    :value="consumer.line3"
                    maxlength="50"
                    :placeholder="$t('consumer.line3Placeholder')"
                    @input="onEditConsumer('line3', $event)" />

                <form-field
                    :value="consumer.locality"
                    maxlength="50"
                    :label-text="$t('consumer.localityLabel')"
                    :placeholder="$t('consumer.localityPlaceholder')"
                    @blur="onBlur('locality')"
                    @input="onEditConsumer('locality', $event)">
                    <template
                        v-if="$v.consumer.locality.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.locality.required && $v.consumer.locality.$dirty">
                            {{ $t('validation.localityRequired') }}
                        </f-error-message>
                    </template>
                </form-field>

                <form-field
                    :value="consumer.postcode"
                    maxlength="50"
                    :label-text="$t('consumer.postcodeLabel')"
                    :placeholder="$t('consumer.postcodePlaceholder')"
                    @blur="onBlur('postcode')"
                    @input="onEditConsumer('postcode', $event)">
                    <template
                        v-if="$v.consumer.postcode.$invalid"
                        #error>
                        <f-error-message v-show="!$v.consumer.postcode.required && $v.consumer.postcode.$dirty">
                            {{ $t('validation.postcodeRequired') }}
                        </f-error-message>
                        <f-error-message v-show="!$v.consumer.postcode.isValidPostcode && $v.consumer.postcode.required">
                            {{ $t('validation.postcodeInvalid') }}
                        </f-error-message>
                    </template>
                </form-field>

                <f-button
                    :class="[$style['c-accountInfo-submitButton']]"
                    data-test-id="account-info-submit-button"
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
                data-test-id="account-info-submit-button"
                button-type="secondary"
                href="/change-password?returnurl=/account/info"
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
            :card-heading="$t('errorMessages.errorHeading')"
            :card-description="$t(error.messageKey)">
            <template #icon>
                <bag-sad-bg-icon />
            </template>
        </f-card-with-content>
    </div>
</template>

<script>
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
import tenantConfigs from '../tenants';
import ConsumerApi from '../services/providers/Consumer.api';
import fAccountInfoModule from '../store/accountInfo.module';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';
import { AccountInfoError } from '../exceptions';

export default {
    components: {
        FCard,
        FCardWithContent,
        FormField,
        FButton,
        FErrorMessage,
        EmailAddressField,
        DeleteAccount,
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
            shouldShowErrorPage: false,
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
            immediate: true,
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

    async mounted () {
        if (this.isAuthFinished) {
            await this.initialise();
        }
    },

    methods: {
        ...mapActions('fAccountInfoModule', [
            'loadConsumerDetails',
            'editConsumerDetails'
        ]),

        /**
        * Informs the template that we are in an Error State.
        * @param {object} Error - The error that has recently occurred
        */
        handleErrorState (error) {
            this.shouldShowErrorPage = true;
            this.error = error;
        },

        /**
        * Gets the form data (from the api) and assigns it to State
        * then lowers the isFormDirty flag as the form data is currently clean
        * then stops the on-screen spinner from showing
        *
        * If an error occurs then this is logged and the Template is
        * informed that it is in a state of error.
        */
        async initialise () {
            try {
                await this.loadConsumerDetails({ api: this.consumerApi, authToken: this.authToken });
                this.$log.info('Consumer details fetched successfully', ['account-pages', 'account-info']);
                this.hasFormUpdate = false;
            } catch (error) {
                this.$log.error('Error fetching consumer details', error, ['account-pages', 'account-info']);
                this.handleErrorState(new AccountInfoError(error.message, error?.response?.status));
            } finally {
                this.$nextTick(() => {
                    this.$parent.$emit(EVENT_SPINNER_STOP_LOADING);
                });
            }
        },

        onFormSubmit () {
            if (this.isFormInvalid()) {
                this.logValidationFailure();
                return;
            }

            if (!this.hasFormUpdate) {
                return;
            }

            this.setSubmittingState(true);

            try {
                // TODO - to be added with next ticket
                this.$log.info('Consumer details saved successfully', ['account-pages', 'account-info']);
                this.hasFormUpdate = false;
            } catch (error) {
                this.$log.error('Error saving consumer details', error, ['account-pages', 'account-info']);
                this.handleErrorState(new AccountInfoError(error.message, error?.response?.status));
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
        */
        onEditConsumer (field, value) {
            this.editConsumerDetails({ field, value });
            this.hasFormUpdate = true;
        }
    }
};
</script>

<style lang="scss" module>
.c-accountInfo-submitButton {
    margin-top: spacing(x4);
}

.c-accountInfo-changePasswordButton {
    margin-top: spacing(x2);
}
</style>
