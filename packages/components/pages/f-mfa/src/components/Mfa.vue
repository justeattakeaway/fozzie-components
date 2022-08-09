<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
            v-if="!showErrorPage && !showHelpInfo"
            :class="$style['c-mfa-card']"
            has-inner-spacing-large
            has-outline
            data-test-id="f-mfa-verification-card">
            <div :class="$style['c-mfa-card-content']">
                <bag-surf-bg-icon
                    :class="$style['c-mfa-icon']" />

                <h2 :class="$style['c-mfa-heading']">
                    {{ $t('verificationPage.subTitle') }}
                </h2>

                <i18n
                    path="verificationPage.instructionsPrimaryText"
                    tag="p"
                    :class="$style['c-mfa-description']">
                    <strong>{{ email }}</strong>
                </i18n>

                <p :class="$style['c-mfa-description']">
                    {{ $t('verificationPage.instructionsSecondaryText') }}
                </p>

                <form
                    method="post"
                    novalidate
                    :class="$style['c-mfa-form']"
                    @submit.prevent="onFormSubmit">
                    <form-field
                        v-model="otp"
                        :class="$style['c-mfa-formField']"
                        :label-text="$t('verificationPage.formField.labelText')"
                        :placeholder="$t('verificationPage.formField.placeholderText')"
                        required
                        :has-error="showValidationError"
                        :is-visually-required="false"
                        data-test-id="mfa-verification-code-textbox"
                        maxlength="10">
                        <template
                            v-if="showValidationError"
                            #error>
                            <error-message
                                data-test-id="mfa-form-validation-error">
                                {{ $t('errorMessages.validation') }}
                            </error-message>
                        </template>
                    </form-field>

                    <f-alert
                        v-if="hasSubmitError"
                        data-test-id="mfa-submit-error-alert"
                        type="danger"
                        :class="$style['c-mfa-submit-error']"
                        :heading="$t('errorMessages.submitMfa.heading')">
                        {{ $t('errorMessages.submitMfa.description') }}
                    </f-alert>

                    <f-button
                        :class="$style['c-mfa-primaryButton']"
                        :disabled="isSubmitButtonDisabled"
                        action-type="submit"
                        button-size="large"
                        :is-loading="isSubmitting"
                        is-full-width
                        data-test-id="mfa-submit-button">
                        {{ $t('verificationPage.primaryButtonText') }}
                    </f-button>
                </form>

                <f-button
                    :class="$style['c-mfa-secondaryButton']"
                    button-type="link"
                    button-size="large"
                    data-test-id="mfa-need-help-link"
                    @click="onShowHelpInfo">
                    {{ $t('verificationPage.secondaryButtonText') }}
                </f-button>
            </div>
        </f-card>

        <help-info
            v-else-if="showHelpInfo"
            :email="email"
            @primary-button-click="onHideHelpInfo" />

        <f-card-with-content
            v-else
            data-test-id="v-mfa-error-component"
            :card-heading="$t('errorMessages.loading.heading')"
            :card-description="$t('errorMessages.loading.message')">
            <template #icon>
                <bag-sad-bg-icon />
            </template>
        </f-card-with-content>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FCardWithContent from '@justeat/f-card-with-content';
import '@justeat/f-card-with-content/dist/f-card-with-content.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import {
    BagSurfBgIcon,
    BagSadBgIcon
} from '@justeat/f-vue-icons';
import AccountWebApi from '../services/AccountWeb.api';

import HelpInfo from './Help.vue';
import tenantConfigs from '../tenants';
import {
    EMAIL_RFC5322_REGEX,
    MFA_CODE_REGEX,
    RETURN_URL_REGEX,
    REDIRECT_URL_EVENT_NAME
} from '../constants';

const standardLogTags = ['account-pages', 'mfa'];

export default {
    name: 'VMfa',

    components: {
        BagSadBgIcon,
        BagSurfBgIcon,
        ErrorMessage,
        FAlert,
        FButton,
        FCard,
        FCardWithContent,
        FormField,
        HelpInfo
    },

    mixins: [VueGlobalisationMixin],

    props: {
        smartGatewayBaseUrl: {
            type: String,
            required: true
        },
        code: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        returnUrl: {
            type: String,
            default: '/'
        }
    },

    data () {
        return {
            otp: '',
            isSubmitting: false,
            showHelpInfo: false,
            showErrorPage: false,
            hasSubmitError: false,
            showValidationError: false,
            tenantConfigs
        };
    },

    computed: {
        isSubmitButtonDisabled () {
            return this.otp.length < 1;
        }
    },

    mounted () {
        this.initialise();
    },

    methods: {
        /**
        * Sets the showErrorPage flag to false, so it is clean before we start.
        * Validates the returnUrl, email & code properties.
        */
        initialise () {
            this.showErrorPage = false;
            this.validateProperty(this.returnUrl, 'returnUrl', RETURN_URL_REGEX);
            this.validateProperty(this.email.toLowerCase(), 'email', EMAIL_RFC5322_REGEX);
            this.validateProperty(this.code, 'code', MFA_CODE_REGEX);
        },

        /**
        * Raises the isSubmitting which disables the Submit button.
        * Sets the hasSubmitError flag to false, so it is clean before we start.
        * Validates the otp value and if valid, posts the form data to the api.
        * Then upon success emits an event to the parent component to redirect to the supplied returnUrl.
        * If the otp is invalid, lowers the isSubmitting flag and sets the showValidationError flag
        * to true, which displays the error message below the form field.
        * If the post fails, lowers the isSubmitting flag and it sets the hasSubmitError flag to
        * true, which displays the alert message below the form field plus logs the issue.
        */
        async onFormSubmit () {
            this.isSubmitting = true;
            this.hasSubmitError = false;

            try {
                const isOtpValid = this.isOtpValid();
                this.showValidationError = !isOtpValid;

                if (isOtpValid) {
                    (new AccountWebApi({
                        httpClient: this.$http,
                        cookies: this.$cookies,
                        baseUrl: this.smartGatewayBaseUrl
                    })).postValidateMfaToken({ mfa_token: this.code, otp: this.otp }); // eslint-disable-line camelcase
                    this.emitRedirectEvent(this.returnUrl); // Completed successfully, emit redirect return url
                }
            } catch (error) {
                if (error.response && error.response.status) {
                    const { status } = error.response;
                    this.hasSubmitError = true;

                    // Bad request
                    if (status === 400) {
                        this.$log.error('Bad request when submitting MFA', error, standardLogTags);
                        return;
                    }

                    // Too many requests
                    if (status === 429) {
                        this.$log.error('Throttled when submitting MFA', error, standardLogTags);
                        return;
                    }
                }
            } finally {
                this.isSubmitting = false;
            }
        },

        onHideHelpInfo () {
            this.showHelpInfo = false;
        },

        onShowHelpInfo () {
            this.showHelpInfo = true;
        },

        /**
        * If no error has already occurred it validates the props based on the regex provided.
        * If the prop value is not valid, the showErrorPage flag is raised and the issue is logged.
        *
        * @param {string} prop - The prop value to validate.
        * @param {object} regex - The regex to validate the value against.
        */
        validateProperty (value, propertyName, regex) {
            if (!regex.test(value)) {
                this.showErrorPage = true;
                this.$log.warn(`Error validating mfa properties [${propertyName}]`, new Error('The regex failed'), standardLogTags);
            }
        },

        /**
        * Emit Success Event
        *
        * @param {string} url - The return url
        */
        emitRedirectEvent (url) {
            const pathRaw = url.trim();
            const path = `${pathRaw.charAt(0) === '/' ? pathRaw : `/${pathRaw}`}`;
            this.$emit(REDIRECT_URL_EVENT_NAME, path);
        },

        /**
        * Validates the otp value is within acceptable bounds (currently 1-10 characters).
        */
        isOtpValid () {
            return this.otp.length > 0 && this.otp.length < 11;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-mfa-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.c-mfa-formField {
    width: 100%;
    margin-top: f.spacing(f);
}

.c-mfa-submit-error {
    width: 100%;
    margin-top: f.spacing(f);
}
</style>
