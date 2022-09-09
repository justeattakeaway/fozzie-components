<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
            v-if="!showErrorPage && !showHelpInfo"
            :class="$style['c-mfa-card']"
            has-inner-spacing-large
            has-outline
            data-test-id="v-mfa-verification-component">
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
                        :is-visually-required="false"
                        data-test-id="mfa-verification-code-textbox"
                        maxlength="10"
                        autocomplete="off" />

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
            :return-url="validatedReturnUrl"
            @primary-button-click="onHideHelpInfo" />

        <f-card-with-content
            v-else
            data-test-id="v-mfa-error-component"
            :card-heading="$t('errorMessages.loading.heading')"
            :card-description="$t('errorMessages.loading.message')"
            :primary-button="errorPrimaryButton"
            @primary-button-click="recordAnalytics">
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
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import {
    BagSurfBgIcon,
    BagSadBgIcon
} from '@justeat/f-vue-icons';
import AccountWebApi from '../services/AccountWeb.api';
import {
    buildEvent,
    ERROR_BACK,
    ERROR_VISIBLE,
    HELP_HIDDEN,
    HELP_VISIBLE,
    MFA_ERROR,
    MFA_SUCCESS,
    MFA_VISIBLE
} from '../services/EventBuilder';

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
        FAlert,
        FButton,
        FCard,
        FCardWithContent,
        FormField,
        HelpInfo
    },

    mixins: [VueGlobalisationMixin],

    props: {
        validateUrl: {
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
        // Please use the computed property validatedReturnUrl
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
            tenantConfigs
        };
    },

    computed: {
        isSubmitButtonDisabled () {
            return this.otp.length < 1;
        },

        errorPrimaryButton () {
            return {
                href: this.validatedReturnUrl,
                text: this.$t('errorMessages.loading.primaryButtonText')
            };
        },

        validatedReturnUrl () {
            const isReturnUrlValid = this.isPropertyValid(this.returnUrl, 'returnUrl', RETURN_URL_REGEX);
            if (!isReturnUrlValid) {
                return '/';
            }

            const trimmedReturnUrl = this.returnUrl.trim();
            return trimmedReturnUrl.charAt(0) === '/' ? trimmedReturnUrl : `/${trimmedReturnUrl}`;
        }
    },

    created () {
        // Query string validation should happen during SSR to prevent reflecting malicious input
        const isEmailValid = this.isPropertyValid(this.email?.toLowerCase(), 'email', EMAIL_RFC5322_REGEX);
        const isCodeValid = this.isPropertyValid(this.code, 'code', MFA_CODE_REGEX);

        if (isEmailValid && isCodeValid) {
            this.$log.info('MFA page loaded successfully');
            this.$gtm.pushEvent(buildEvent(MFA_VISIBLE));
        } else {
            this.showErrorPage = true;
            this.$log.warn('Error loading MFA page');
            this.$gtm.pushEvent(buildEvent(ERROR_VISIBLE));
        }
    },

    methods: {
        /**
        * Raises the isSubmitting flag which disables the Submit button.
        * If the flag is already raised, do nothing.
        * Sets the hasSubmitError flag to false, so it is clean before we start.
        * Posts the form data to the api.
        * Then upon success emits an event to the parent component to redirect to the supplied returnUrl.
        * If the post fails, lowers the isSubmitting flag and it sets the hasSubmitError flag to
        * true, which displays the alert message below the form field plus logs the issue.
        */
        async onFormSubmit () {
            if (this.isSubmitting) {
                return; // Prevents multiple requests, especially on slow networks
            }

            this.isSubmitting = true;
            this.hasSubmitError = false;

            try {
                await (new AccountWebApi({
                    httpClient: this.$http,
                    cookies: this.$cookies,
                    validateUrl: this.validateUrl
                })).postValidateMfaToken({ mfa_token: this.code, otp: this.otp.toUpperCase() }); // eslint-disable-line camelcase
                this.$gtm.pushEvent(buildEvent(MFA_SUCCESS));
                this.$emit(REDIRECT_URL_EVENT_NAME, this.validatedReturnUrl);
            } catch (error) {
                this.hasSubmitError = true;
                if (error.response && error.response.status) {
                    const { status } = error.response;

                    this.$gtm.pushEvent(buildEvent(MFA_ERROR, `http error status : ${status}`));

                    // Bad request
                    if (status === 400) {
                        this.$log.warn('Bad request when submitting MFA', error, standardLogTags);
                        return;
                    }

                    // Too many requests
                    if (status === 429) {
                        this.$log.warn('Throttled when submitting MFA', error, standardLogTags);
                        return;
                    }

                    this.$log.error(`Unexpected ${status} response when submitting MFA`, error, standardLogTags);
                }
            } finally {
                this.isSubmitting = false;
            }
        },

        onHideHelpInfo () {
            this.$gtm.pushEvent(buildEvent(HELP_HIDDEN));
            this.showHelpInfo = false;
        },

        onShowHelpInfo () {
            this.$gtm.pushEvent(buildEvent(HELP_VISIBLE));
            this.showHelpInfo = true;
        },

        /**
        * Validates the given property based on the regex provided.
        * If the value is not valid, the a warning is logged.
        *
        * @param {string} value - The prop value to validate.
        * @param {string} propertyName - The name of the property to validate, to be included in the log.
        * @param {object} regex - The regular expression for validation.
        * @returns {boolean} Whether or not the property's value is valid.
        */
        isPropertyValid (value, propertyName, regex) {
            if (!value || !regex.test(value)) {
                this.$log.warn(`Error validating mfa property '${propertyName}' - Regex Failed`, standardLogTags);
                return false;
            }
            return true;
        },

        recordAnalytics () {
            this.$gtm.pushEvent(buildEvent(ERROR_BACK));
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
