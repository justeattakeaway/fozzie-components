<template>
    <div
        :class="$style['c-registration']">
        <card-component
            :data-theme-registration="theme"
            :card-heading="copy.labels.createAccountTitle"
            is-rounded
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
                <a :href="loginUrl">{{ copy.navLinks.login.text }}</a>
            </p>
            <form
                type="post"
                :class="$style['c-registration-form']"
                @click="formStart"
                @focus="formStart"
                @submit.prevent="onFormSubmit">
                <error-message
                    v-if="genericErrorMessage"
                    :class="$style['c-registration-genericError']">
                    {{ genericErrorMessage }}
                </error-message>
                <form-field
                    v-model="firstName"
                    name="firstName"
                    data-test-id="input-first-name"
                    :label-text="copy.labels.firstName"
                    input-type="text"
                    @blur="formFieldBlur('firstName')">
                    <template #error>
                        <error-message
                            v-if="shouldShowFirstNameRequiredError"
                            data-test-id='error-first-name-empty'>
                            {{ copy.validationMessages.firstName.requiredError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowFirstNameMaxLengthError"
                            data-test-id='error-first-name-maxlength'>
                            {{ copy.validationMessages.firstName.maxLengthError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowFirstNameInvalidCharError"
                            data-test-id='error-first-name-invalid'>
                            {{ copy.validationMessages.firstName.invalidCharError }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    v-model="lastName"
                    name="lastName"
                    data-test-id="input-last-name"
                    :label-text="copy.labels.lastName"
                    input-type="text"
                    @blur="formFieldBlur('lastName')">
                    <template #error>
                        <error-message
                            v-if="shouldShowLastNameRequiredError"
                            data-test-id='error-last-name-empty'>
                            {{ copy.validationMessages.lastName.requiredError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowLastNameMaxLengthError"
                            data-test-id='error-last-name-maxlength'>
                            {{ copy.validationMessages.lastName.maxLengthError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowLastNameInvalidCharError"
                            data-test-id='error-last-name-invalid'>
                            {{ copy.validationMessages.lastName.invalidCharError }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    v-model="email"
                    name="email"
                    data-test-id="input-email"
                    :label-text="copy.labels.email"
                    input-type="email"
                    @blur="formFieldBlur('email')">
                    <template #error>
                        <error-message
                            v-if="shouldShowEmailRequiredError"
                            data-test-id='error-email-empty'>
                            {{ copy.validationMessages.email.requiredError }}
                        </error-message>
                        <error-message
                            v-else-if="shouldShowEmailInvalidError"
                            data-test-id='error-email-invalid'>
                            {{ copy.validationMessages.email.invalidEmailError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowEmailMaxLengthError"
                            data-test-id='error-email-maxlength'>
                            {{ copy.validationMessages.email.maxLengthError }}
                        </error-message>
                        <error-message
                            v-else-if="shouldShowEmailAlreadyExistsError"
                            data-test-id='error-email-exists'>
                            {{ copy.validationMessages.email.alreadyExistsError }}
                        </error-message>
                    </template>
                </form-field>

                <form-field
                    v-model="password"
                    name="password"
                    data-test-id="input-password"
                    :label-text="copy.labels.password"
                    input-type="password"
                    @blur="formFieldBlur('password')">
                    <template #error>
                        <error-message
                            v-if="shouldShowPasswordRequiredError"
                            data-test-id='error-password-empty'>
                            {{ copy.validationMessages.password.requiredError }}
                        </error-message>
                        <error-message
                            v-if="shouldShowPasswordMinLengthError"
                            data-test-id='error-password-minlength'>
                            {{ copy.validationMessages.password.minLengthError }}
                        </error-message>
                    </template>
                </form-field>

                <button-component
                    :class="$style['c-registration-submit']"
                    data-test-id="create-account-submit-button"
                    button-type="primary"
                    button-size="large"
                    is-full-width
                    :disabled="shouldDisableCreateAccountButton">
                    {{ copy.labels.createAccountBtn }}
                </button-component>
            </form>
            <p :class="$style['c-registration-link']">
                {{ copy.navLinks.termsAndConditions.prefix }}
                <a
                    data-test-id="ts-and-cs-link"
                    :href="copy.navLinks.termsAndConditions.url"
                    target="_blank">{{ copy.navLinks.termsAndConditions.text }}</a>{{ copy.navLinks.termsAndConditions.suffix }}
                {{ copy.navLinks.privacyPolicy.prefix }}
                <a
                    data-test-id="privacy-policy-link"
                    :href="copy.navLinks.privacyPolicy.url"
                    target="_blank">{{ copy.navLinks.privacyPolicy.text }}</a>
                {{ copy.navLinks.cookiesPolicy.prefix }}
                <a
                    data-test-id="cookies-policy-link"
                    :href="copy.navLinks.cookiesPolicy.url"
                    target="_blank">{{ copy.navLinks.cookiesPolicy.text }}</a>{{ copy.navLinks.cookiesPolicy.suffix }}
            </p>
        </card-component>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { validationMixin } from 'vuelidate';
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators';
import { BagCelebrateIcon } from '@justeat/f-vue-icons';
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
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
    name: 'Registration',

    components: {
        ButtonComponent,
        CardComponent,
        FormField,
        BagCelebrateIcon,
        ErrorMessage
    },

    mixins: [validationMixin],

    props: {
        locale: {
            type: String,
            default: 'en-GB'
        },
        createAccountUrl: {
            type: String,
            required: true
        },
        createAccountTimeout: {
            type: Number,
            required: false,
            default: 1000
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
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            shouldDisableCreateAccountButton: false,
            genericErrorMessage: null,
            shouldShowEmailAlreadyExistsError: false,
            formStarted: false
        };
    },

    computed: {
        /*
         * Validation methods return true if the validation conditions
         * have not been met and the field has been `touched` by a user.
         * The $dirty boolean changes to true when the user has focused/lost
         * focus on the input field.
         */

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
            maxLength: maxLength(50)
        },
        password: {
            required,
            minLength: minLength(4)
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
            this.shouldShowEmailAlreadyExistsError = false;

            if (this.isFormInvalid()) {
                const validationState = formValidationState(this.$v);

                this.$emit(EventNames.CreateAccountFailure, validationState);

                return;
            }

            this.shouldDisableCreateAccountButton = true;
            try {
                const registrationData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    emailAddress: this.email,
                    password: this.password,
                    registrationSource: 'Native',
                    marketingPreferences: []
                };
                await RegistrationServiceApi.createAccount(this.createAccountUrl, this.tenant, registrationData, this.createAccountTimeout);
                this.$emit(EventNames.CreateAccountSuccess);
            } catch (error) {
                let thrownErrors = error;
                if (error && error.response && error.response.data && error.response.data.errors) {
                    thrownErrors = error.response.data.errors;
                }
                let shouldEmitCreateAccountFailure = true;

                if (Array.isArray(thrownErrors)) {
                    if (thrownErrors.some(thrownError => thrownError.errorCode === '409')) {
                        this.shouldShowEmailAlreadyExistsError = true;
                    } else if (thrownErrors.some(thrownError => thrownError.errorCode === 'FailedUserAuthentication')) {
                        this.$emit(EventNames.LoginBlocked);

                        shouldEmitCreateAccountFailure = false;
                    } else {
                        this.genericErrorMessage = thrownErrors[0].description || 'Something went wrong, please try again later';
                    }
                } else {
                    this.genericErrorMessage = error;
                }

                if (shouldEmitCreateAccountFailure) {
                    this.$emit(EventNames.CreateAccountFailure, thrownErrors);
                }
            } finally {
                this.shouldDisableCreateAccountButton = false;
            }
        },

        isFormInvalid () {
            this.$v.$touch();
            return this.$v.$invalid;
        }
    }
};

</script>

<style lang="scss" module>

$registration-topMargin           : spacing() * 14;
$registration-topMargin--narrow   : spacing(x9);
$registration-icon-width          : 97px;
$registration-icon-width--narrow  : 92px;
$registration-icon-height         : 78px;
$registration-icon-height--narrow : 74px;

// Form styling
.c-registration {
    margin-top: $registration-topMargin--narrow;

    @include media('>mid') {
        margin-top: $registration-topMargin;
    }
}

    .c-registration-card {
        position: relative;
        padding-top: spacing(x7);
        padding-bottom: spacing(x6);

        @include media('<mid') {
            padding-bottom: spacing(x4);
        }

        @include media('>=narrow') {
            // TODO: box shadow value will eventually come from PIE design tokens, but hard coding here for now
            box-shadow: 0 1px 1px 0 rgba($black, 0.03),
                    0 2px 1px -1px rgba($black, 0.07),
                    0 1px 3px 0 rgba($black, 0.06);
        }
    }

    .c-registration-icon {
        width: $registration-icon-width;
        height: $registration-icon-height;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translate(-35%);

        @include media('<mid') {
            width: $registration-icon-width--narrow;
            height: $registration-icon-height--narrow;
        }
    }

    .c-registration-form {
        margin-top: spacing(x3);
    }

    .c-registration-genericError {
        margin-top: 0;
        margin-bottom: spacing(x2);
    }

    .c-registration-submit {
        margin-top: spacing(x4);
        margin-bottom: spacing(x4);
    }

    .c-registration-link {
        text-align: center;

        a {
            // TODO: check default link styles in PIE and update fozzie // (should be able to remove these styles then)
            text-decoration: none;
            font-weight: $font-weight-bold;

            &:hover,
            &:focus {
                text-decoration: underline;
            }
        }
    }

        .c-registration-link--subtitle {
            margin-top: - spacing(); // shift the subtitle link closer to the main title
        }

</style>
