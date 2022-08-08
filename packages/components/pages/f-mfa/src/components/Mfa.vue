<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
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
                        v-model="verificationCode"
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
                        button-size="large"
                        :is-loading="isSubmitting"
                        is-full-width
                        data-test-id="mfa-submit-button">
                        {{ $t('verificationPage.submitButtonText') }}
                    </f-button>
                </form>

                <f-button
                    :class="$style['c-mfa-need-help-link']"
                    button-type="link"
                    button-size="large"
                    data-test-id="mfa-need-help-link"
                    @click="onShowHelpInfo">
                    {{ $t('verificationPage.helpModalLinkText') }}
                </f-button>
            </div>
        </f-card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import {
    BagSurfBgIcon
} from '@justeat/f-vue-icons';
import tenantConfigs from '../tenants';

const standardLogTags = ['account-pages', 'mfa'];

export default {
    name: 'VMfa',

    components: {
        FAlert,
        FCard,
        ErrorMessage,
        FormField,
        FButton,
        BagSurfBgIcon
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
            verificationCode: '',
            email: '',
            tenantConfigs,
            isSubmitting: false,
            showErrorPage: false,
            hasSubmitError: false,
            showValidationError: false
        };
    },

    computed: {
        isSubmitButtonDisabled () {
            return this.verificationCode.length < 1;
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
            try {
                // TODO - Validate Querystring params - Invalid > raise showErrorPage flag
                // TODO - Assign to data model
                this.email = 'email@email.com';
                this.code = 'someCode123';
            } catch (error) {
                this.$log.error('Error validating mfa data', error, standardLogTags);
            }
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
                    this.postValidateMfaToken();
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

        // To be replaced by API call
        postValidateMfaToken () {
            const err = new Error('TEST - 400 error');
            err.response = {
                status: 400
            };
            throw err;
        },

        validateOtp () {
            // TODO
            return this.verificationCode.length >= 6;
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
