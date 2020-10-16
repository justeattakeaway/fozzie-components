<template>
    <div>
        <card
            :data-theme-registration="theme"
            :card-heading="copy.labels.createAccountTitle"
            is-rounded
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="registration-component"
            :class="$style['c-card-padding']">
            <bag-celebrate-icon :class="$style['bag-icon']" />
            <p
                v-if="showLoginLink"
                :class="$style['c-loginLink']"
                data-test-id="create-account-login-link"
                @click="visitLoginPage">
                <a :href="copy.navLinks.login.url">{{ copy.navLinks.login.text }}</a>
            </p>
            <form
                type="post"
                :class="$style['o-form']"
                tabindex="0"
                @click="formStart"
                @focus="formStart"
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
                    :label-text="copy.labels.firstName"
                    input-type="text"
                    label-style="inlineNarrow"
                    @blur="formFieldBlur('firstName')">
                    <template #error>
                        <p
                            v-if="shouldShowFirstNameRequiredError"
                            :class="$style['o-form-error']"
                            data-test-id='error-first-name-empty'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.firstName.requiredError }}
                        </p>
                        <p
                            v-if="shouldShowFirstNameMaxLengthError"
                            :class="$style['o-form-error']"
                            data-test-id='error-first-name-maxlength'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.firstName.maxLengthError }}
                        </p>
                        <p
                            v-if="shouldShowFirstNameInvalidCharError"
                            :class="$style['o-form-error']"
                            data-test-id='error-first-name-invalid'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.firstName.invalidCharError }}
                        </p>
                    </template>
                </form-field>

                <form-field
                    v-model="lastName"
                    name="lastName"
                    data-test-id="input-last-name"
                    :label-text="copy.labels.lastName"
                    input-type="text"
                    label-style="inlineNarrow"
                    @blur="formFieldBlur('lastName')">
                    <template #error>
                        <p
                            v-if="shouldShowLastNameRequiredError"
                            :class="$style['o-form-error']"
                            data-test-id='error-last-name-empty'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.lastName.requiredError }}
                        </p>
                        <p
                            v-if="shouldShowLastNameMaxLengthError"
                            :class="$style['o-form-error']"
                            data-test-id='error-last-name-maxlength'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.lastName.maxLengthError }}
                        </p>
                        <p
                            v-if="shouldShowLastNameInvalidCharError"
                            :class="$style['o-form-error']"
                            data-test-id='error-last-name-invalid'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.lastName.invalidCharError }}
                        </p>
                    </template>
                </form-field>

                <form-field
                    v-model="email"
                    name="email"
                    data-test-id="input-email"
                    :label-text="copy.labels.email"
                    input-type="email"
                    label-style="inlineNarrow"
                    @blur="formFieldBlur('email')">
                    <template #error>
                        <p
                            v-if="shouldShowEmailRequiredError"
                            :class="$style['o-form-error']"
                            data-test-id='error-email-empty'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.email.requiredError }}
                        </p>
                        <p
                            v-else-if="shouldShowEmailInvalidError"
                            :class="$style['o-form-error']"
                            data-test-id='error-email-invalid'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.email.invalidEmailError }}
                        </p>
                        <p
                            v-if="shouldShowEmailMaxLengthError"
                            :class="$style['o-form-error']"
                            data-test-id='error-email-maxlength'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.email.maxLengthError }}
                        </p>
                        <p
                            v-else-if="shouldShowEmailAlreadyExistsError"
                            :class="$style['o-form-error']"
                            data-test-id='error-email-exists'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.email.alreadyExistsError }}
                        </p>
                    </template>
                </form-field>

                <form-field
                    v-model="password"
                    name="password"
                    data-test-id="input-password"
                    :label-text="copy.labels.password"
                    input-type="password"
                    label-style="inlineNarrow"
                    @blur="formFieldBlur('password')">
                    <template #error>
                        <p
                            v-if="shouldShowPasswordRequiredError"
                            :class="$style['o-form-error']"
                            data-test-id='error-password-empty'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.password.requiredError }}
                        </p>
                        <p
                            v-if="shouldShowPasswordMinLengthError"
                            :class="$style['o-form-error']"
                            data-test-id='error-password-minlength'>
                            <warning-icon :class="$style['o-form-error-icon']" />
                            {{ copy.validationMessages.password.minLengthError }}
                        </p>
                    </template>
                </form-field>

                <form-button
                    class="submit-button-padding"
                    data-test-id="create-account-submit-button"
                    button-style="primary"
                    is-full-width
                    :disabled="shouldDisableCreateAccountButton">
                    {{ copy.labels.createAccountBtn }}
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
import { WarningIcon, BagCelebrateIcon } from '@justeat/f-vue-icons';
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
        Card,
        FormButton,
        FormField,
        WarningIcon,
        BagCelebrateIcon
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
        showLoginLink: {
            type: Boolean,
            default: true
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
    @include font-size(body-l);
}

.o-form-error {
    display: flex;
    align-items: center;
    color: $red;
    @include font-size(body-s);
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

.c-loginLink,
.c-legal-hyperlinks {
    text-align: center;
    a {
        color: $blue;
        text-decoration: none;
        font-weight: $font-weight-bold;
    }
}

.c-card-padding {
    padding-top: spacing(x5);
    padding-bottom: spacing(x6);

    @include media('<mid') {
        padding-bottom: spacing(x4);
    }
}

.bag-icon {
    width: 97px;
    height: 78px;
    position: absolute;
    top: 56px;
    left: 50%;
    transform: translate(-35%);
    @include media('<mid') {
        width: 92px;
        height: 74px;
    }
}

</style>
