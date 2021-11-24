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
                :label-text="$t('fields.emailAddressLabel')"
                disabled
                :placeholder="$t('fields.emailAddressPlaceholder')"
                class="u-spacingBottom--large"
                :value="fields.emailAddress" />

            <f-link
                is-distinct
                :class="$style['c-accountInfo-customerCareLink']"
                href="/help"
                target="_blank">
                {{ $t('contactCustomerCareTeam') }}
            </f-link>

            <form-field
                :label-text="$t('fields.firstNameLabel')"
                :placeholder="$t('fields.firstNamePlaceholder')"
                :value="fields.firstName" />

            <form-field
                :label-text="$t('fields.lastNameLabel')"
                :placeholder="$t('fields.lastNamePlaceholder')"
                :value="fields.lastName" />

            <h2
                class="u-spacingBottom--large">
                {{ $t('deliveryAddress') }}
            </h2>

            <form-field
                :label-text="$t('fields.addressLabel')"
                :placeholder="$t('fields.line1Placeholder')"
                :value="fields.line1" />

            <form-field
                :placeholder="$t('fields.line2Placeholder')"
                :value="fields.line2" />

            <form-field
                :placeholder="$t('fields.line3Placeholder')"
                :value="fields.line3" />

            <form-field
                :label-text="$t('fields.cityLabel')"
                :placeholder="$t('fields.cityPlaceholder')"
                :value="fields.city" />

            <form-field
                :label-text="$t('fields.postcodeLabel')"
                :placeholder="$t('fields.postcodePlaceholder')"
                :value="fields.postcode" />

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
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import FLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import tenantConfigs from '../tenants';

export default {
    components: {
        Card,
        FormField,
        FLink,
        FButton
    },

    mixins: [
        VueGlobalisationMixin
    ],

    props: {
        locale: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            fields: {
                emailAddress: null,
                firstName: null,
                lastName: null,
                line1: null,
                line2: null,
                line3: null,
                city: null,
                postcode: null
            },
            tenantConfigs,
            isFormSubmitting: false
        };
    },

    async mounted () {
        await this.initialise();
    },

    methods: {
        async initialise () {
            try {
                // TODO - Dummy data to be replaced with next ticket
                this.fields = {
                    emailAddress: 'mr.jazz@town.com',
                    firstName: 'Max',
                    lastName: 'Legend',
                    line1: '1 Wardour Street',
                    line2: undefined,
                    line3: null,
                    city: 'Strange Town',
                    postcode: 'JZ1 1AA'
                };
            } catch (error) {
                // TODO - to be added with next ticket
            } finally {
                // TODO - Stop auth spinner to be added with next ticket
            }
        },

        onFormSubmit () {
            this.setSubmittingState(true);

            try {
                // TODO - to be added with next ticket
                this.$log.info('Submitted Form', 'account-info');
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
