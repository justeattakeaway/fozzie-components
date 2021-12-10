<template>
    <f-card
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
                v-model="consumer.firstName"
                data-test-id="account-info-consumer-firstName"
                maxlength="50"
                :label-text="$t('consumer.firstNameLabel')"
                :placeholder="$t('consumer.firstNamePlaceholder')"
                @blur="onBlur('firstName')"
                @input="editConsumer('firstName', $event)">
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
                v-model="consumer.lastName"
                data-test-id="account-info-consumer-lastName"
                maxlength="50"
                :label-text="$t('consumer.lastNameLabel')"
                :placeholder="$t('consumer.lastNamePlaceholder')"
                @blur="onBlur('lastName')"
                @input="editConsumer('lastName', $event)">
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
                v-model="consumer.phoneNumber"
                maxlength="16"
                :label-text="$t('consumer.phoneNumberLabel')"
                :placeholder="$t('consumer.phoneNumberPlaceholder')"
                @blur="onBlur('phoneNumber')"
                @input="editConsumer('phoneNumber', $event)">
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
                v-model="consumer.line1"
                maxlength="50"
                :label-text="$t('consumer.addressLabel')"
                :placeholder="$t('consumer.line1Placeholder')"
                @blur="onBlur('line1')"
                @input="editConsumer('line1', $event)">
                <template
                    v-if="$v.consumer.line1.$invalid"
                    #error>
                    <f-error-message v-show="!$v.consumer.line1.required && $v.consumer.line1.$dirty">
                        {{ $t('validation.line1Required') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="consumer.line2"
                maxlength="50"
                :placeholder="$t('consumer.line2Placeholder')"
                @input="editConsumer('line2', $event)" />

            <form-field
                v-model="consumer.line3"
                maxlength="50"
                :placeholder="$t('consumer.line3Placeholder')"
                @input="editConsumer('line3', $event)" />

            <form-field
                v-model="consumer.locality"
                maxlength="50"
                :label-text="$t('consumer.localityLabel')"
                :placeholder="$t('consumer.localityPlaceholder')"
                @blur="onBlur('locality')"
                @input="editConsumer('locality', $event)">
                <template
                    v-if="$v.consumer.locality.$invalid"
                    #error>
                    <f-error-message v-show="!$v.consumer.locality.required && $v.consumer.locality.$dirty">
                        {{ $t('validation.localityRequired') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="consumer.postcode"
                maxlength="50"
                :label-text="$t('consumer.postcodeLabel')"
                :placeholder="$t('consumer.postcodePlaceholder')"
                @blur="onBlur('postcode')"
                @input="editConsumer('postcode', $event)">
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
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import FErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import EmailAddressField from './EmailAddressField.vue';
import DeleteAccount from './DeleteAccount.vue';
import AccountInfoValidationMixin from './AccountInfoValidationMixin.vue';
import tenantConfigs from '../tenants';
import ConsumerApi from '../services/providers/Consumer.api';
import fAccountInfoModule from '../store/accountInfo.module';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';

export default {
    components: {
        FCard,
        FormField,
        FButton,
        FErrorMessage,
        EmailAddressField,
        DeleteAccount
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
            hasFormUpdate: false
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

    created () {
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
                this.hasFormUpdate = false;
            } catch (error) {
                // TODO - to be added with next ticket
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
                this.$log.info('Submitted Form', ['account-info', 'account-pages']);
                this.hasFormUpdate = false;
            } catch (error) {
                // TODO - to be added with next ticket
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
        * @param {string} value - The new value the consumer field
        */
        editConsumer (field, value) {
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
