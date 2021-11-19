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
                action-type="submit">
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
import FormField from '@justeat/f-form-field';
import FLink from '@justeat/f-link';
import FButton from '@justeat/f-button';

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
            tenantConfigs
        };
    },

    methods: {
        onFormSubmit () {
            this.$log.info('Submitted Form', 'account-info');
        }
    }
};
</script>

<style lang="scss" module>
@import '@justeat/f-card/dist/f-card.css';
@import '@justeat/f-form-field/dist/f-form-field.css';
@import '@justeat/f-link/dist/f-link.css';
@import '@justeat/f-button/dist/f-button.css';

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
