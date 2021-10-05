<template>
    <div :class="$style['c-registration']">
        <card-component
            :data-theme-registration="theme"
            :card-heading="copy.labels.createAccountTitle"
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
                    {{ copy.navLinks.login.text }}
                </v-link>
            </p>
            <form
                method="post"
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
                    aria-required="true"
                    aria-describedby="error-message-firstname"
                    :aria-invalid="!!describeFirstnameErrorMessage"
                    name="firstName"
                    :label-text="copy.labels.firstName"
                    input-type="text"
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
                    data-test-id="input-last-name"
                    :label-text="copy.labels.lastName"
                    input-type="text"
                    aria-describedby="error-message-lastname"
                    :aria-invalid="!!describeLastnameErrorMessage"
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
                    aria-required="true"
                    name="email"
                    aria-describedby="error-message-email"
                    :aria-invalid="!!describeEmailErrorMessage"
                    :label-text="copy.labels.email"
                    input-type="email"
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
                    aria-required="true"
                    aria-describedby="error-message-password"
                    :aria-invalid="!!describePasswordErrorMessage"
                    name="password"
                    :label-text="copy.labels.password"
                    input-type="password"
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
                    {{ copy.labels.createAccountBtn }}
                </f-button>
            </form>
            <p
                :class="[
                    $style['c-registration-link'],
                    $style['c-registration-link--bottomSpacing']]">
                {{ copy.navLinks.termsAndConditions.prefix }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="ts-and-cs-link"
                    :href="copy.navLinks.termsAndConditions.url"
                    target="_blank">
                    {{ copy.navLinks.termsAndConditions.text }}
                </v-link>{{ copy.navLinks.termsAndConditions.suffix }}
                {{ copy.navLinks.privacyPolicy.prefix }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="privacy-policy-link"
                    :href="copy.navLinks.privacyPolicy.url"
                    target="_blank">
                    {{ copy.navLinks.privacyPolicy.text }}
                </v-link>
                {{ copy.navLinks.cookiesPolicy.prefix }}
                <v-link
                    is-bold
                    is-distinct
                    data-test-id="cookies-policy-link"
                    :href="copy.navLinks.cookiesPolicy.url"
                    target="_blank">
                    {{ copy.navLinks.cookiesPolicy.text }}
                </v-link>{{ copy.navLinks.cookiesPolicy.suffix }}
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
    name: 'Registration',

    components: {
        FButton,
        CardComponent,
        FormField,
        BagCelebrateIcon,
        ErrorMessage,
        VLink
    },

    mixins: [validationMixin],

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
            formStarted: false,
            conflictedEmailAddress: ''
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
                const messages = this.copy.validationMessages.firstName;

                if (!this.$v.firstName.required) {
                    return messages.requiredError;
                }
                if (!this.$v.firstName.maxLength) {
                    return messages.maxLengthError;
                }
                if (!this.$v.firstName.meetsCharacterValidationRules) {
                    return messages.invalidCharError;
                }
            }
            return '';
        },
        describeLastnameErrorMessage () {
            if (this.$v.lastName.$dirty) {
                const messages = this.copy.validationMessages.lastName;

                if (!this.$v.lastName.required) {
                    return messages.requiredError;
                }
                if (!this.$v.lastName.maxLength) {
                    return messages.maxLengthError;
                }
                if (!this.$v.lastName.meetsCharacterValidationRules) {
                    return messages.invalidCharError;
                }
            }
            return '';
        },
        describeEmailErrorMessage () {
            if (this.$v.email.$dirty) {
                const messages = this.copy.validationMessages.email;

                if (!this.$v.email.required) {
                    return messages.requiredError;
                }
                if (!this.$v.email.maxLength) {
                    return messages.maxLengthError;
                }
                if (!this.$v.email.email) {
                    return messages.invalidEmailError;
                }
                if (!this.$v.email.isValidEmailAddress) {
                    return messages.alreadyExistsError;
                }
            }
            return '';
        },
        describePasswordErrorMessage () {
            if (this.$v.password.$dirty) {
                const messages = this.copy.validationMessages.password;

                if (!this.$v.password.required) {
                    return messages.requiredError;
                }
                if (!this.$v.password.minLength) {
                    return messages.minLengthError;
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

                    if (status === 403) {
                        this.$emit(EventNames.LoginBlocked);
                        return;
                    }
                }

                this.genericErrorMessage = this.copy.genericErrorMessage;
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
                this.genericErrorMessage = `There are ${countErrors()} errors in the form.`;
                return true;
            }
            this.genericErrorMessage = '';
            return false;
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

        @include media('>=narrow') {
            // TODO: box shadow value will eventually come from PIE design tokens, but hard coding here for now
            box-shadow: 0 1px 1px 0 rgba($color-black, 0.03),
                    0 2px 1px -1px rgba($color-black, 0.07),
                    0 1px 3px 0 rgba($color-black, 0.06);
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
    }

        .c-registration-link--subtitle {
            margin-top: - spacing(); // shift the subtitle link closer to the main title
        }

        .c-registration-link--bottomSpacing {
            @include media('<narrow') {
                padding-bottom: spacing(x4);
            }
        }
</style>
