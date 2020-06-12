<template>
    <card
        :data-theme-registration="theme"
        :card-heading="title"
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center">
        <p
            v-if="shouldShowLoginLink"
            :class="$style['c-loginLink']"
            data-test-id="create-account-login-link">
            {{ loginSettings.preLinkText }}<a :href="loginSettings.url"> {{ loginSettings.linkText }}</a>
        </p>
        <form
            type="post"
            :class="$style['o-form']"
            @submit.prevent="onFormSubmit"
        >
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
                label-style="inline">
                <template #error>
                    <p
                        v-if="shouldShowFirstNameRequiredError"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter your first name
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="lastName"
                name="lastName"
                data-test-id="input-last-name"
                label-text="Last name"
                input-type="text"
                label-style="inline">
                <template #error>
                    <p
                        v-if="shouldShowLastNameRequiredError"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter your last name
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="email"
                name="email"
                data-test-id="input-email"
                label-text="Email"
                input-type="email"
                label-style="inline">
                <!-- For when we want to add validation on blur of input - @blur="$v.email.$touch" -->
                <template #error>
                    <p
                        v-if="shouldShowEmailRequiredError"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter your email address
                    </p>
                    <p
                        v-else-if="shouldShowEmailInvalidError"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter a valid email address
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="password"
                name="password"
                data-test-id="input-password"
                label-text="Password"
                input-type="password"
                label-style="inline">
                <template #error>
                    <p
                        v-if="shouldShowPasswordRequiredError"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter a password
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
    </card>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { WarningIcon } from '@justeat/f-vue-icons';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FormButton from './Button.vue';
import tenantConfigs from '../tenants';
import RegistrationServiceApi from '../services/RegistrationServiceApi';
import EventNames from '../event-names';

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
            default: ''
        },
        tenant: { // TODO ACC2-506 Compute tenant value from local config instead of using this prop
            type: String,
            required: true
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
            genericErrorMessage: null
        };
    },

    computed: {
        // Returns true if required validation conditions are not met and if the field has been `touched` by a user
        shouldShowFirstNameRequiredError () {
            return (this.$v.firstName.$invalid && !this.$v.firstName.required) && this.$v.firstName.$dirty;
        },
        // Returns true if required validation conditions are not met and if the field has been `touched` by a user
        shouldShowLastNameRequiredError () {
            return (this.$v.lastName.$invalid && !this.$v.lastName.required) && this.$v.lastName.$dirty;
        },
        // Returns true if required validation conditions are not met and if the field has been `touched` by a user
        shouldShowEmailRequiredError () {
            return (this.$v.email.$invalid && !this.$v.email.required) && this.$v.email.$dirty;
        },
        // Returns true if email validation conditions are not met and if the field has been `touched` by a user
        shouldShowEmailInvalidError () {
            return (this.$v.email.$invalid && !this.$v.email.email) && this.$v.email.$dirty;
        },
        // Returns true if email validation conditions are not met and if the field has been `touched` by a user
        shouldShowPasswordRequiredError () {
            return (this.$v.password.$invalid && !this.$v.password.required) && this.$v.password.$dirty;
        },
        shouldShowLoginLink () {
            return this.loginSettings && this.loginSettings.linkText && this.loginSettings.url;
        }
    },

    validations: {
        firstName: {
            required
        },
        lastName: {
            required
        },
        email: {
            required,
            email
        },
        password: {
            required
        }
    },

    methods: {
        async onFormSubmit () {
            this.genericErrorMessage = null;
            if (this.isFormInvalid()) {
                return;
            }

            this.shouldDisableCreateAccountButton = true;
            try {
                const registrationData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                };
                await RegistrationServiceApi.createAccount(this.createAccountUrl, this.tenant, registrationData);
                this.$emit(EventNames.CreateAccountSuccess);
            } catch (error) {
                this.genericErrorMessage = error;
                this.$emit(EventNames.CreateAccountFailure, error);
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
</style>
