<template>
    <card
        :data-theme-registration="theme"
        :card-heading="title"
        is-rounded
        has-outline
        is-page-content-wrapper>
        <form
            type="post"
            :class="$style['o-form']"
            @submit="checkValidation"
        >
            <form-field
                v-model="firstName"
                name="firstName"
                data-test-id="input-first-name"
                label-text="First name"
                input-type="text"
                label-style="inline">
                <template #error>
                    <p
                        v-if="($v.firstName.$invalid && !$v.firstName.required) && $v.firstName.$dirty"
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
                        v-if="($v.lastName.$invalid && !$v.lastName.required) && $v.lastName.$dirty"
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
                        v-if="($v.email.$invalid && !$v.email.required) && $v.email.$dirty"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter your email address
                    </p>
                    <p
                        v-else-if="($v.email.$invalid && !$v.email.email) && $v.email.$dirty"
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
                        v-if="($v.password.$invalid && !$v.password.required) && $v.password.$dirty"
                        :class="$style['o-form-error']">
                        <warning-icon :class="$style['o-form-error-icon']" />
                        Please enter a password
                    </p>
                </template>
            </form-field>

            <form-button
                data-test-id="create-account-submit-button"
                button-style="primary"
                is-full-width>
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
        title: {
            type: String,
            default: 'Create Account'
        },
        buttonText: {
            type: String,
            default: 'Create Account'
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
            password: null
        };
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
        checkValidation (event) {
            this.$v.$touch();
            if (this.$v.$invalid) {
                event.preventDefault();
                return false;
            }
            return true;
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

</style>
