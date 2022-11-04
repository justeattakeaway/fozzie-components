<template>
    <div :class="$style['c-registration']">
        <card-component
            :data-theme-registration="theme"
            :card-heading="$t('labels.createAccountTitle')"
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="registration-component"
            :class="$style['c-registration-card']">
            <bag-celebrate-icon :class="$style['c-registration-icon']" />
            <p
                v-if="showLoginLink"
                :class="[
                    $style['c-registration-link'],
                    $style['c-registration-link--subtitle']
                ]"
                data-test-id="create-account-login-link"
                @click="visitLoginPage">
                <v-link
                    is-bold
                    is-distinct
                    :href="loginUrl">
                    {{ $t('navLinks.login.text') }}
                </v-link>
            </p>
            <form
                method="post"
                novalidate
                :class="$style['c-registration-form']"
                @click="formStart"
                @focus="formStart"
                @submit.prevent="onFormSubmit">
                <section
                    id="error-summary-container"
                    role="alert"
                    data-test-id="error-summary-container">
                    <error-message
                        v-show="genericErrorMessage"
                        :class="$style['c-registration-genericError']">
                        {{ genericErrorMessage }}
                    </error-message>
                </section>

                <form-field
                    ref="firstName"
                    v-model="firstName"
                    name="firstName"
                    required
                    :isVisuallyRequired=false
                    :label-text="$t('labels.firstName')"
                    input-type="text"
                    aria-describedby="error-message-firstname"
                    :aria-invalid="!!describeFirstnameErrorMessage"
                    @blur="formFieldBlur('firstName')">
                    <template
                        v-if="describeFirstnameErrorMessage"
                        #error>
                        <error-message
                            test-data-id="firstnameErrorMessage"
                            :class="$style['c-registration-genericError']">
                            {{ describeFirstnameErrorMessage }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    ref="lastName"
                    v-model="lastName"
                    name="lastName"
                    input-type="text"
                    :label-text="$t('labels.lastName')"
                    required
                    :isVisuallyRequired=false
                    aria-describedby="error-message-lastname"
                    :aria-invalid="!!describeLastnameErrorMessage"
                    data-test-id="input-last-name"
                    @blur="formFieldBlur('lastName')">
                    <template
                        v-if="describeLastnameErrorMessage"
                        #error>
                        <error-message
                            test-data-id="lastnameErrorMessage"
                            :class="$style['c-registration-genericError']">
                            {{ describeLastnameErrorMessage }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    ref="email"
                    v-model="email"
                    name="email"
                    input-type="email"
                    :label-text="$t('labels.email')"
                    required
                    :isVisuallyRequired=false
                    aria-describedby="error-message-email"
                    :aria-invalid="!!describeEmailErrorMessage"
                    @blur="formFieldBlur('email')">
                    <template
                        v-if="describeEmailErrorMessage"
                        #error>
                        <error-message
                            test-data-id="emailErrorMessage"
                            :class="$style['c-registration-genericError']">
                            {{ describeEmailErrorMessage }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    ref="password"
                    v-model="password"
                    name="password"
                    input-type="password"
                    :label-text="$t('labels.password')"
                    required
                    :isVisuallyRequired=false
                    aria-describedby="error-message-password"
                    :aria-invalid="!!describePasswordErrorMessage"
                    @blur="formFieldBlur('password')">
                    <template
                        v-if="describePasswordErrorMessage"
                        #error>
                        <error-message
                            test-data-id="passwordErrorMessage"
                            :class="$style['c-registration-genericError']">
                            {{ describePasswordErrorMessage }}
                        </error-message>
                    </template>
                </form-field>

                <f-button
                    :class="$style['c-registration-submit']"
                    data-test-id="create-account-submit-button"
                    button-type="primary"
                    button-size="large"
                    is-full-width
                    action-type="submit"
                    :disabled="shouldDisableCreateAccountButton">
                    {{ $t('labels.createAccountBtn') }}
                </f-button>
            </form>
            <p
                :class="[
                    $style['c-registration-link'],
                    $style['c-registration-link--bottomSpacing']]">
                {{ $t('navLinks.termsAndConditions.prefix') }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="ts-and-cs-link"
                    :href="$t('navLinks.termsAndConditions.url')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('navLinks.termsAndConditions.text') }}
                </v-link>{{ $t('navLinks.termsAndConditions.suffix') }}
                {{ $t('navLinks.privacyPolicy.prefix') }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="privacy-policy-link"
                    :href="$t('navLinks.privacyPolicy.url')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('navLinks.privacyPolicy.text') }}
                </v-link>
                {{ $t('navLinks.cookiesPolicy.prefix') }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="cookies-policy-link"
                    :href="$t('navLinks.cookiesPolicy.url')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('navLinks.cookiesPolicy.text') }}
                </v-link>{{ $t('navLinks.cookiesPolicy.suffix') }}
            </p>
        </card-component>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import { globalisationServices } from '@justeat/f-services';
import { validationMixin } from 'vuelidate';
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators';
import { BagCelebrateIcon } from '@justeat/f-vue-icons';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import VLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';
import tenantConfigs from '../tenants';
import RegistrationServiceApi from '../services/RegistrationServiceApi';
import EventNames from '../event-names';

/**
 * Tests for existence of valid chars only in a string.
 *
 * @param {string} value The string to test.
 * @return {boolean} True if there are no invalid chars in value, false otherwise.
 */
const meetsCharacterValidationRules = value => /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);

/**
 * Tests that the entered email address does not match the conflicted email address stored
 *
 * @param {string} value The email address to test.
 * @param {object} vm The Vue instance
 * @return {boolean} True if the email does not match the conflicted email address stored
 */
const isValidEmailAddress = (value, vm) => (value !== vm.conflictedEmailAddress);

const formValidationState = $v => {
    const fields = $v.$params;
    const invalidFields = [];
    const validFields = [];

    Object.keys(fields).forEach(key => {
        if ($v[key].$invalid) {
            invalidFields.push(key);
        } else {
            validFields.push(key);
        }
    });

    return {
        validFields,
        invalidFields
    };
};

export default {
    name: 'FRegistration',

    components: {
        FButton,
        CardComponent,
        FormField,
        BagCelebrateIcon,
        ErrorMessage,
        VLink
    },

    mixins: [
        validationMixin,
        VueGlobalisationMixin
    ],

    props: {
        locale: {
            type: String,
            default: ''
        },
        createAccountUrl: {
            type: String,
            required: true
        },
        showLoginLink: {
            type: Boolean,
            required: true
        },
        loginUrl: {
            type: String,
            required: true
        }
    },

    data () {
        const theme = globalisationServices.getTheme(this.locale);

        return {
            theme,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            shouldDisableCreateAccountButton: false,
            genericErrorMessage: null,
            formStarted: false,
            conflictedEmailAddress: '',
            tenantConfigs
        };
    },

    computed: {
        /*
         * Validation methods return true if the validation conditions
         * have not been met and the field has been `touched` by a user.
         * The $dirty boolean changes to true when the user has focused/lost
         * focus on the input field.
         */

        describeFirstnameErrorMessage () {
            if (this.$v.firstName.$dirty) {
                const textKeyPrefix = 'validationMessages.firstName.';

                if (!this.$v.firstName.required) {
                    return this.$t(`${textKeyPrefix}requiredError`);
                }
                if (!this.$v.firstName.maxLength) {
                    return this.$t(`${textKeyPrefix}maxLengthError`);
                }
                if (!this.$v.firstName.meetsCharacterValidationRules) {
                    return this.$t(`${textKeyPrefix}invalidCharError`);
                }
            }
            return '';
        },
        describeLastnameErrorMessage () {
            if (this.$v.lastName.$dirty) {
                const textKeyPrefix = 'validationMessages.lastName.';

                if (!this.$v.lastName.required) {
                    return this.$t(`${textKeyPrefix}requiredError`);
                }
                if (!this.$v.lastName.maxLength) {
                    return this.$t(`${textKeyPrefix}maxLengthError`);
                }
                if (!this.$v.lastName.meetsCharacterValidationRules) {
                    return this.$t(`${textKeyPrefix}invalidCharError`);
                }
            }
            return '';
        },
        describeEmailErrorMessage () {
            if (this.$v.email.$dirty) {
                const textKeyPrefix = 'validationMessages.email.';

                if (!this.$v.email.required) {
                    return this.$t(`${textKeyPrefix}requiredError`);
                }
                if (!this.$v.email.maxLength) {
                    return this.$t(`${textKeyPrefix}maxLengthError`);
                }
                if (!this.$v.email.email) {
                    return this.$t(`${textKeyPrefix}invalidEmailError`);
                }
                if (!this.$v.email.isValidEmailAddress) {
                    return this.$t(`${textKeyPrefix}alreadyExistsError`);
                }
            }
            return '';
        },
        describePasswordErrorMessage () {
            if (this.$v.password.$dirty) {
                const textKeyPrefix = 'validationMessages.password.';

                if (!this.$v.password.required) {
                    return this.$t(`${textKeyPrefix}requiredError`);
                }
                if (!this.$v.password.minLength) {
                    return this.$t(`${textKeyPrefix}minLengthError`);
                }
            }
            return '';
        },

        shouldShowFirstNameRequiredError () {
            return !this.$v.firstName.required && this.$v.firstName.$dirty;
        },
        shouldShowFirstNameMaxLengthError () {
            return !this.$v.firstName.maxLength && this.$v.firstName.$dirty;
        },
        shouldShowFirstNameInvalidCharError () {
            return !this.$v.firstName.meetsCharacterValidationRules && this.$v.firstName.$dirty;
        },
        shouldShowLastNameRequiredError () {
            return !this.$v.lastName.required && this.$v.lastName.$dirty;
        },
        shouldShowLastNameMaxLengthError () {
            return !this.$v.lastName.maxLength && this.$v.lastName.$dirty;
        },
        shouldShowLastNameInvalidCharError () {
            return !this.$v.lastName.meetsCharacterValidationRules && this.$v.lastName.$dirty;
        },
        shouldShowEmailRequiredError () {
            return !this.$v.email.required && this.$v.email.$dirty;
        },
        shouldShowEmailMaxLengthError () {
            return !this.$v.email.maxLength && this.$v.email.$dirty;
        },
        shouldShowEmailInvalidError () {
            return !this.$v.email.email && this.$v.email.$dirty;
        },
        shouldShowPasswordRequiredError () {
            return !this.$v.password.required && this.$v.password.$dirty;
        },
        shouldShowPasswordMinLengthError () {
            return !this.$v.password.minLength && this.$v.password.$dirty;
        },
        tenant () {
            return {
                'en-GB': 'uk',
                'en-AU': 'au',
                'en-NZ': 'nz',
                'da-DK': 'dk',
                'es-ES': 'es',
                'en-IE': 'ie',
                'it-IT': 'it',
                'nb-NO': 'no'
            }[this.locale];
        }
    },

    validations: {
        firstName: {
            required,
            maxLength: maxLength(50),
            meetsCharacterValidationRules
        },
        lastName: {
            required,
            maxLength: maxLength(50),
            meetsCharacterValidationRules
        },
        email: {
            required,
            email,
            maxLength: maxLength(50),
            isValidEmailAddress
        },
        password: {
            required,
            minLength: minLength(10)
        }
    },

    methods: {
        formStart () {
            if (!this.formStarted) {
                this.$emit(EventNames.CreateAccountStart);
                this.formStarted = true;
            }
        },

        visitLoginPage () {
            this.$emit(EventNames.VisitLoginPage);
        },

        formFieldBlur (field) {
            const fieldValidation = this.$v[field];
            if (fieldValidation) {
                fieldValidation.$touch();

                if (fieldValidation.$invalid) {
                    this.$emit(EventNames.CreateAccountInlineError, field);
                }
            }
        },

        async onFormSubmit () {
            this.genericErrorMessage = null;

            if (this.isFormInvalid()) {
                const validationState = formValidationState(this.$v);

                this.$emit(EventNames.CreateAccountFailure, validationState);

                return;
            }

            this.shouldDisableCreateAccountButton = true;
            this.conflictedEmailAddress = '';

            try {
                const registrationData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    emailAddress: this.email,
                    password: this.password,
                    registrationSource: 'Native',
                    marketingPreferences: []
                };

                this.$cookies.remove('je-oidc');

                await RegistrationServiceApi.createAccount(this.$http, this.createAccountUrl, registrationData, this.tenant);
                this.$emit(EventNames.CreateAccountSuccess);
            } catch (error) {
                if (error.response && error.response.status) {
                    const { status } = error.response;

                    if (status === 409) {
                        this.conflictedEmailAddress = this.email;
                        this.$emit(EventNames.CreateAccountWarning, error);
                        return;
                    }

                    if (status === 400) {
                        this.genericErrorMessage = error.response.data.errors[0].description;
                        this.$emit(EventNames.CreateAccountFailure, error);
                        return;
                    }

                    if (status === 401) {
                        this.$emit(EventNames.LoginBlocked);
                        return;
                    }

                    if (status === 403) {
                        this.$emit(EventNames.MfaChallengeIssued, {
                            mfaToken: error.response.data.mfa_token,
                            mfaTarget: error.response.data.mfa_target
                        });

                        return;
                    }

                    if (status === 429) {
                        this.$emit(EventNames.RateLimitExceeded);
                        return;
                    }
                }

                this.genericErrorMessage = this.$t('genericErrorMessage');
                this.$emit(EventNames.CreateAccountFailure, this.genericErrorMessage);
            } finally {
                this.shouldDisableCreateAccountButton = false;
            }
        },

        isFormInvalid () {
            const v = this.$v;
            function countErrors () {
                return [
                    v.firstName.$anyError,
                    v.lastName.$anyError,
                    v.email.$anyError,
                    v.password.$anyError
                ].filter(x => x)
                    .length;
            }
            v.firstName.$touch();
            v.lastName.$touch();
            v.email.$touch();
            v.password.$touch();
            if (v.$invalid) {
                const errorCount = countErrors();

                this.genericErrorMessage = errorCount === 1
                    ? this.$t('validationMessages.singleFieldError')
                    : this.$t('validationMessages.multipleFieldErrors', { errorCount });

                return true;
            }
            this.genericErrorMessage = '';
            return false;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$registration-topMargin           : f.spacing() * 14;
$registration-topMargin--narrow   : f.spacing(i);
$registration-icon-width          : 97px;
$registration-icon-width--narrow  : 92px;
$registration-icon-height         : 78px;
$registration-icon-height--narrow : 74px;

// Form styling
.c-registration {
    margin-top: $registration-topMargin--narrow;

    @include f.media('>mid') {
        margin-top: $registration-topMargin;
    }
}

    .c-registration-card {
        position: relative;

        @include f.media('>=narrow') {
            // TODO: box shadow value will eventually come from PIE design tokens, but hard coding here for now
            box-shadow: 0 1px 1px 0 rgba(f.$color-black, 0.03),
                    0 2px 1px -1px rgba(f.$color-black, 0.07),
                    0 1px 3px 0 rgba(f.$color-black, 0.06);
        }
    }

    .c-registration-icon {
        width: $registration-icon-width;
        height: $registration-icon-height;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translate(-35%);

        @include f.media('<mid') {
            width: $registration-icon-width--narrow;
            height: $registration-icon-height--narrow;
        }
    }

    .c-registration-form {
        margin-top: f.spacing(e);
    }

    .c-registration-genericError {
        margin-top: 0;
        margin-bottom: f.spacing(d);
    }

    .c-registration-submit {
        margin-top: f.spacing(f);
        margin-bottom: f.spacing(f);
    }

    .c-registration-link {
        text-align: center;
    }

        .c-registration-link--subtitle {
            margin-top: - f.spacing(); // shift the subtitle link closer to the main title
        }

        .c-registration-link--bottomSpacing {
            @include f.media('<narrow') {
                padding-bottom: f.spacing(f);
            }
        }
</style>
