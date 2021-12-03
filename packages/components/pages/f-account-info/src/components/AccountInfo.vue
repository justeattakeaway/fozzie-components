<template>
    <card
        :card-heading="$t('accountDetails')"
        data-test-id="account-info"
        has-outline
        is-page-content-wrapper>
        <h2
            class="u-spacingBottom--large">
            {{ $t('yourDetails') }}
        </h2>

        <form
            method="post"
            @submit.prevent="onFormSubmit">
            <form-field
                :label-text="$t('consumer.emailAddressLabel')"
                disabled
                :placeholder="$t('consumer.emailAddressPlaceholder')"
                class="u-spacingBottom--large"
                :value="consumer.emailAddress" />

            <f-link
                is-distinct
                :class="$style['c-accountInfo-customerCareLink']"
                href="/help"
                target="_blank">
                {{ $t('contactCustomerCareTeam') }}
            </f-link>

            <form-field
                :label-text="$t('consumer.firstNameLabel')"
                :placeholder="$t('consumer.firstNamePlaceholder')"
                :value="consumer.firstName"
                @change="editConsumerDetailsValue('firstName', $event.target.value)" />

            <form-field
                :label-text="$t('consumer.lastNameLabel')"
                :placeholder="$t('consumer.lastNamePlaceholder')"
                :value="consumer.lastName" />

            <h2
                class="u-spacingBottom--large">
                {{ $t('deliveryAddress') }}
            </h2>

            <form-field
                :label-text="$t('consumer.addressLabel')"
                :placeholder="$t('consumer.line1Placeholder')"
                :value="consumer.line1" />

            <form-field
                :placeholder="$t('consumer.line2Placeholder')"
                :value="consumer.line2" />

            <form-field
                :placeholder="$t('consumer.line3Placeholder')"
                :value="consumer.line3" />

            <form-field
                :label-text="$t('consumer.cityLabel')"
                :placeholder="$t('consumer.cityPlaceholder')"
                :value="consumer.city" />

            <form-field
                :label-text="$t('consumer.postcodeLabel')"
                :placeholder="$t('consumer.postcodePlaceholder')"
                :value="consumer.postcode" />

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
            button-size="large"
            is-full-width
            action-type="submit">
            {{ $t('buttons.changePassword') }}
        </f-button>

        <hr>

        <p>{{ $t('deleteAccountMessage') }}</p>

        <f-link
            is-distinct
            href="/help"
            target="_blank">
            {{ $t('deleteAccountLink') }}
        </f-link>
    </card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import FLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import AccountInfoApi from '../services/providers/AccountInfo.api';
import fAccountInfoModule from '../store/accountInfo.module';
import tenantConfigs from '../tenants';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';

export default {
    components: {
        Card,
        FormField,
        FLink,
        FButton
    },

    mixins: [VueGlobalisationMixin],

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
            tenantConfigs,
            accountInfoApi: new AccountInfoApi({
                httpClient: this.$http,
                cookies: this.$cookies,
                baseUrl: this.smartGatewayBaseUrl
            }),
            isFormSubmitting: false
        };
    },

    computed: {
        ...mapState('fAccountInfoModule', [
            'consumer'
        ])
    },

    watch: {
        immediate: true,
        async isAuthFinished () {
            if (this.isAuthFinished) {
                await this.initialise();
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
            'saveConsumerDetails',
            'editConsumerDetails'
        ]),

        async initialise () {
            try {
                await this.loadConsumerDetails({ api: this.accountInfoApi, authToken: this.authToken });
            } catch (error) {
                // TODO - to be added with next ticket
            } finally {
                this.$nextTick(() => {
                    this.$parent.$emit(EVENT_SPINNER_STOP_LOADING);
                });
            }
        },

        onFormSubmit () {
            this.setSubmittingState(true);

            try {
                // TODO - to be added with next ticket
            } catch (error) {
                // TODO - to be added with next ticket
            } finally {
                this.setSubmittingState(false);
            }
        },

        /**
        * A generic method that updates the State (e.g. 'consumer[field] = value')
        * @param {string} field - The field of the preference that needs changing
        * @param {string} value - The new value the preference field
        */
        editConsumerDetailsValue (field, value) {
            this.editConsumerDetails({ field, value });
        },

        /**
        * Sets the flag to inform the Template of whether the form is currently submitting or not
        * @param {boolean} isFormSubmitting - True = Form is being submitted / False = Form is not being submitted
        */
        setSubmittingState (isFormSubmitting) {
            this.isFormSubmitting = isFormSubmitting;
        }
    }
};
</script>

<style lang="scss" module>
.c-accountInfo-customerCareLink {
    display: block;
    margin-bottom: spacing(x4);
}

.c-accountInfo-submitButton {
    margin-top: spacing(x4);
}

.c-accountInfo-changePasswordButton {
    margin-top: spacing(x2);
}
</style>
