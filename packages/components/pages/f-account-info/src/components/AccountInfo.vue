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

        <email-address-field :email-address="values.emailAddress" />

        <form
            method="post"
            @submit.prevent="onFormSubmit"
            @change="editConsumerDetails($event)">
            <form-field
                v-model="fields.firstName"
                maxlength="50"
                data-js-fieldKey="firstName"
                :label-text="$t('fields.firstNameLabel')"
                :placeholder="$t('fields.firstNamePlaceholder')"
                @blur="onBlur('firstName')">
                <template
                    v-if="$v.fields.firstName.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.firstName.required && $v.fields.firstName.$dirty">
                        {{ $t('validation.firstNameRequired') }}
                    </f-error-message>
                    <f-error-message v-show="!$v.fields.firstName.isValidName">
                        {{ $t('validation.firstNameInvalid') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="fields.lastName"
                maxlength="50"
                data-js-fieldKey="lastName"
                :label-text="$t('fields.lastNameLabel')"
                :placeholder="$t('fields.lastNamePlaceholder')"
                @blur="onBlur('lastName')">
                <template
                    v-if="$v.fields.lastName.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.lastName.required && $v.fields.lastName.$dirty">
                        {{ $t('validation.lastNameRequired') }}
                    </f-error-message>
                    <f-error-message v-show="!$v.fields.lastName.isValidName">
                        {{ $t('validation.lastNameInvalid') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="fields.phoneNumber"
                maxlength="16"
                data-js-fieldKey="phoneNumber"
                :label-text="$t('fields.phoneNumberLabel')"
                :placeholder="$t('fields.phoneNumberPlaceholder')"
                @blur="onBlur('phoneNumber')">
                <template
                    v-if="$v.fields.phoneNumber.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.phoneNumber.required && $v.fields.phoneNumber.$dirty">
                        {{ $t('validation.phoneNumberRequired') }}
                    </f-error-message>
                    <f-error-message v-show="!$v.fields.phoneNumber.isValidPhoneNumber && $v.fields.phoneNumber.required && $v.fields.phoneNumber.$dirty">
                        {{ $t('validation.phoneNumberInvalid') }}
                    </f-error-message>
                </template>
            </form-field>

            <h2
                class="u-spacingBottom--large">
                {{ $t('deliveryAddress') }}
            </h2>

            <form-field
                v-model="fields.line1"
                maxlength="50"
                data-js-fieldKey="line1"
                :label-text="$t('fields.addressLabel')"
                :placeholder="$t('fields.line1Placeholder')"
                @blur="onBlur('line1')">
                <template
                    v-if="$v.fields.line1.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.line1.required && $v.fields.line1.$dirty">
                        {{ $t('validation.line1Required') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="fields.line2"
                maxlength="50"
                data-js-fieldKey="line2"
                :placeholder="$t('fields.line2Placeholder')" />

            <form-field
                v-model="fields.line3"
                maxlength="50"
                data-js-fieldKey="line3"
                :placeholder="$t('fields.line3Placeholder')" />

            <form-field
                v-model="fields.locality"
                maxlength="50"
                data-js-fieldKey="locality"
                :label-text="$t('fields.localityLabel')"
                :placeholder="$t('fields.localityPlaceholder')"
                @blur="onBlur('locality')">
                <template
                    v-if="$v.fields.locality.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.locality.required && $v.fields.locality.$dirty">
                        {{ $t('validation.localityRequired') }}
                    </f-error-message>
                </template>
            </form-field>

            <form-field
                v-model="fields.postcode"
                maxlength="50"
                data-js-fieldKey="postcode"
                :label-text="$t('fields.postcodeLabel')"
                :placeholder="$t('fields.postcodePlaceholder')"
                @blur="onBlur('postcode')">
                <template
                    v-if="$v.fields.postcode.$invalid"
                    #error>
                    <f-error-message v-show="!$v.fields.postcode.required && $v.fields.postcode.$dirty">
                        {{ $t('validation.postcodeRequired') }}
                    </f-error-message>
                    <f-error-message v-show="!$v.fields.postcode.isValidPostcode && $v.fields.postcode.required">
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
            fields: {
                firstName: null,
                lastName: null,
                phoneNumber: null,
                line1: null,
                line2: null,
                line3: null,
                locality: null,
                postcode: null
            },
            values: {
                emailAddress: null
            },
            tenantConfigs,
            isFormSubmitting: false,
            isFormDirty: false
        };
    },

    watch: {
        isAuthFinished: {
            immediate: true,
            handler (value) {
                if (value) {
                    this.initialise();
                }
            }
        }
    },

    mounted () {
        if (this.isAuthFinished) {
            this.initialise();
        }
    },

    methods: {
        initialise () {
            try {
                // TODO - Dummy data to be replaced with next ticket
                this.values = {
                    emailAddress: 'mr.jazz@town.com'
                };

                this.fields = {
                    firstName: 'Max',
                    lastName: 'Legend',
                    phoneNumber: 1234567890,
                    line1: '1 Wardour Street',
                    line2: undefined,
                    line3: null,
                    locality: 'Strange Town',
                    postcode: 'JZ1 1AA'
                };

                this.isFormDirty = false;
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

            if (!this.isFormDirty) {
                return;
            }

            this.setSubmittingState(true);

            try {
                this.isFormDirty = false;
                // TODO - to be added with next ticket
                this.$log.info('Submitted Form', ['account-info', 'account-pages']);
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
         * Send through the field & value that has been edited.
         *
         * @TODO store in vuex store once that is wired up.
         *
         * @param field
         * @param value
         */
        // eslint-disable no-unused-vars
        editConsumerDetails ($event) {
            // Values to be passed to vuex store in a later ticket.
            const eventTarget = $event.target;
            const field = eventTarget.dataset.jsFieldkey;
            const value = eventTarget.value;

            this.isFormDirty = true;
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
