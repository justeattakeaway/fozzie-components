<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
            v-if="!showErrorPage"
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
                        :class="$style['c-mfa-submitButton']"
                        :disabled="isSubmitButtonDisabled"
                        action-type="submit"
                        :is-loading="isSubmitting"
                        data-test-id="mfa-submit-button">
                        {{ $t('verificationPage.submitButtonText') }}
                    </f-button>
                </form>

                <f-button
                    :class="$style['c-mfa-need-help-link']"
                    button-type="link"
                    data-test-id="mfa-need-help-link"
                    @click="onShowHelpInfo">
                    {{ $t('verificationPage.helpModalLinkText') }}
                </f-button>
            </div>
        </f-card>

        <f-card-with-content
            v-else
            data-test-id="mfa-error-page"
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
import tenantConfigs from '../tenants';
// import {
//     EMAIL_HTML5_REGEX,
//     MFA_CODE_REGEX,
//     RETURN_URL_REGEX
// } from '../constants';

const standardLogTags = ['account-pages', 'mfa'];

export default {
    name: 'VMfa',

    components: {
        FAlert,
        FCard,
        FCardWithContent,
        ErrorMessage,
        FormField,
        FButton,
        BagSurfBgIcon,
        BagSadBgIcon
    },

    mixins: [VueGlobalisationMixin],

    props: {
        smartGatewayBaseUrl: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            otp: '',
            mfa: '',
            email: '',
            tenantConfigs,
            isSubmitting: false,
            showErrorPage: false,
            returnUrl: '/',
            hasSubmitError: false,
            showValidationError: false,
            accountWebApi: new AccountWebApi({
                httpClient: this.$http,
                cookies: this.$cookies,
                baseUrl: this.smartGatewayBaseUrl
            })
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
        * TODO
        */
        initialise () {
            this.showErrorPage = false;
            // this.processQueryString('returnUrl', 'returnUrl', RETURN_URL_REGEX);
            // this.processQueryString('email', 'email', EMAIL_HTML5_REGEX);
            // this.processQueryString('code', 'mfa', MFA_CODE_REGEX);
        },

        /**
        * TODO
        */
        async onFormSubmit () {
            this.isSubmitting = true;
            this.hasSubmitError = false;

            try {
                const isOtpValid = this.validateOtp();
                this.showValidationError = !isOtpValid;

                if (isOtpValid) {
                    this.accountWebApi.postValidateMfaToken({ mfa_token: this.mfa, otp: this.otp }); // eslint-disable-line camelcase
                    this.redirect(this.returnUrl); // Completed successfully, redirect to returnUrl
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

        /**
        * TODO
        */
        onShowHelpInfo () {
            console.log('DEBUG - onShowHelpInfo'); // eslint-disable-line no-console
        },

        /**
        * TODO
        */
        processQueryString (key, field, regex) {
            // Only validate query string if clientside
            if (typeof (window) !== 'undefined') {
                let err = new Error(`Missing or Failed Regex [${key}]`);
                try {
                    const urlParams = new URLSearchParams(window.location.search);
                    if (!urlParams.has(key)) {
                        const param = decodeURI(urlParams.get(key)).trim();
                        if (regex.test(param)) {
                            this[field] = param;
                        } else {
                            this.showErrorPage = true;
                        }
                    } else {
                        this.showErrorPage = true;
                    }
                } catch (error) {
                    this.showErrorPage = true;
                    err = error;
                } finally {
                    if (this.showErrorPage) {
                        this.$log.warn(`Error validating mfa(${key}) querystring data`, err, standardLogTags);
                    }
                }
            }
        },

        /**
        * Redirect to url
        * (check/tidy up the path due to unknown source)
        */
        redirect (url) {
            const pathRaw = url.trim();
            const path = `${pathRaw.charAt(0) === '/' ? pathRaw : `/${pathRaw}`}`;
            window.location.href = path; // Perform redirect
        },

        validateOtp () {
            // TODO
            return true;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-mfa {
    margin: auto;
    max-width: 600px;
}

.c-mfa-heading {
    margin-top: 0;
}

.c-mfa-heading,
.c-mfa-description {
    text-align: center;
}

.c-mfa-icon {
    transform: translate(10%);
    margin: -#{f.spacing(g)} 0 -#{f.spacing(d)};
    width: 212px;
}

.c-mfa-card {
    @include f.media('>=narrow') {
        box-shadow: f.$elevation-01;
    }
}

.c-mfa-card-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 392px;
    margin: 0 auto;
}

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

.c-mfa-submitButton {
    margin: f.spacing(f) 0;
}

.c-mfa-submit-error {
    width: 100%;
    margin-top: f.spacing(f);
}

.c-mfa-need-help-link {
    margin-bottom: f.spacing(d);
}
</style>
