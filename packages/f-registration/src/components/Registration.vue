<template>
    <card
        :data-theme-registration="theme"
        :card-heading="title"
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        data-test-id="registration-component">
        <p
            v-if="shouldShowLoginLink"
            :class="$style['c-loginLink']"
            data-test-id="create-account-login-link">
            {{ loginSettings.preLinkText }} <a :href="loginSettings.url">{{ loginSettings.linkText }}</a>
        </p>
        <form
            type="post"
            :class="$style['o-form']"
            @submit.prevent="onFormSubmit"
        >
            <!-- TODO WCB-1031 - Extract error messages into a separate component -->
            <p
                v-if="genericErrorMessage"
                :class="$style['o-form-error']">
                <warning-icon :class="$style['o-form-error-icon']" />
                {{ genericErrorMessage }}
            </p>
            <form-field
                v-model="firstName"
                name="firstName"
                data-test-id="input-first-name"
                label-text="First name"
                input-type="text"
                label-style="inline"
                @blur="$v.firstName.$touch">
                <template #error>
                    <p
                        v-if="shouldShowFirstNameRequiredError"
                        :class="$style['o-form-error']"
                        data-test-id='error-first-name-empty'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please include your first name
                    </p>
                    <p
                        v-if="shouldShowFirstNameMaxLengthError"
                        :class="$style['o-form-error']"
                        data-test-id='error-first-name-maxlength'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        First name exceeds 50 characters
                    </p>
                    <p
                        v-if="shouldShowFirstNameInvalidCharError"
                        :class="$style['o-form-error']"
                        data-test-id='error-first-name-invalid'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        First name should only contain letters, hyphens or apostrophes
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="lastName"
                name="lastName"
                data-test-id="input-last-name"
                label-text="Last name"
                input-type="text"
                label-style="inline"
                @blur="$v.lastName.$touch">
                <template #error>
                    <p
                        v-if="shouldShowLastNameRequiredError"
                        :class="$style['o-form-error']"
                        data-test-id='error-last-name-empty'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please include your last name
                    </p>
                    <p
                        v-if="shouldShowLastNameMaxLengthError"
                        :class="$style['o-form-error']"
                        data-test-id='error-last-name-maxlength'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Last name exceeds 50 characters
                    </p>
                    <p
                        v-if="shouldShowLastNameInvalidCharError"
                        :class="$style['o-form-error']"
                        data-test-id='error-last-name-invalid'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Last name should only contain letters, hyphens or apostrophes
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="email"
                name="email"
                data-test-id="input-email"
                label-text="Email"
                input-type="email"
                label-style="inline"
                @blur="$v.email.$touch">
                <template #error>
                    <p
                        v-if="shouldShowEmailRequiredError"
                        :class="$style['o-form-error']"
                        data-test-id='error-email-empty'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter your email address
                    </p>
                    <p
                        v-else-if="shouldShowEmailInvalidError"
                        :class="$style['o-form-error']"
                        data-test-id='error-email-invalid'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter a valid email address
                    </p>
                    <p
                        v-if="shouldShowEmailMaxLengthError"
                        :class="$style['o-form-error']"
                        data-test-id='error-email-maxlength'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Email exceeds 50 characters
                    </p>
                    <p
                        v-else-if="shouldShowEmailAlreadyExistsError"
                        :class="$style['o-form-error']"
                        data-test-id='error-email-exists'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Email address is already registered
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="password"
                name="password"
                data-test-id="input-password"
                label-text="Password"
                input-type="password"
                label-style="inline"
                @blur="$v.password.$touch">
                <template #error>
                    <p
                        v-if="shouldShowPasswordRequiredError"
                        :class="$style['o-form-error']"
                        data-test-id='error-password-empty'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter a password
                    </p>
                    <p
                        v-if="shouldShowPasswordMinLengthError"
                        :class="$style['o-form-error']"
                        data-test-id='error-password-minlength'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Password is less than four characters
                    </p>
                    <p
                        v-if="shouldShowPasswordMaxLengthError"
                        :class="$style['o-form-error']"
                        data-test-id='error-password-maxlength'>
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Password exceeds 50 characters
                    </p>
                </template>
            </form-field>

            <form-button
                data-test-id="create-account-submit-button"
                button-style="primary"
                is-full-width
                :disabled="shouldDisableCreateAccountButton">
                {{ buttonText }}
            </form-button>
        </form>
        <p :class="$style['c-legal-hyperlinks']">
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
    </card>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { validationMixin } from 'vuelidate';
import {
    required, email, minLength, maxLength
} from 'vuelidate/lib/validators';
import { WarningIcon } from '@justeat/f-vue-icons';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FormButton from './Button.vue';
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

export default {
    name: 'Registration',

    components: {
        Card,
        FormButton,
        FormField,
        WarningIcon
    },

    mixins: [validationMixin],

    props: {
        locale: {
            type: String,
            default: 'en-GB'
        },
        title: {
            type: String,
            default: 'Create Account'
        },
        buttonText: {
            type: String,
            default: 'Create Account'
        },
        createAccountUrl: {
            type: String,
            required: true
        },
        loginSettings: {
            type: Object,
            default: () => {}
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
            shouldShowEmailAlreadyExistsError: false
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
        shouldShowPasswordMaxLengthError () {
            return !this.$v.password.maxLength && this.$v.password.$dirty;
        },
        shouldShowLoginLink () {
            return this.loginSettings && this.loginSettings.linkText && this.loginSettings.url;
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
            minLength: minLength(4),
            maxLength: maxLength(50)
        }
    },

    methods: {
        async onFormSubmit () {
            this.genericErrorMessage = null;
            this.shouldShowEmailAlreadyExistsError = false;

            if (this.isFormInvalid()) {
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
                await RegistrationServiceApi.createAccount(this.createAccountUrl, this.tenant, registrationData);
                this.$emit(EventNames.CreateAccountSuccess);
            } catch (error) {
                let thrownErrors = error;
                if (error && error.response && error.response.data && error.response.data.errors) {
                    thrownErrors = error.response.data.errors;
                }

                if (Array.isArray(thrownErrors)) {
                    if (thrownErrors.some(thrownError => thrownError.errorCode === '409')) {
                        this.shouldShowEmailAlreadyExistsError = true;
                    } else {
                        this.genericErrorMessage = thrownErrors[0].description || 'Something went wrong, please try again later';
                    }
                } else {
                    this.genericErrorMessage = error;
                }
                this.$emit(EventNames.CreateAccountFailure, thrownErrors);
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

// Form styling

.o-form {
    @include font-size(base--scaleUp);
}

.o-form-error {
    display: flex;
    align-items: center;
    color: $red;
    @include font-size(base);
    margin-top: spacing();
}

.o-form-error-icon {
    width: 16px;
    height: 16px;
    margin-right: spacing(x0.5);
}

* + .o-form {
    margin-top: spacing(x2);
}

.c-loginLink {
    text-align: center;
    a {
        color: $blue;
        text-decoration: none;
    }
}

.c-legal-hyperlinks {
    a {
        color: $blue;
        text-decoration: none;
    }
}
</style>
