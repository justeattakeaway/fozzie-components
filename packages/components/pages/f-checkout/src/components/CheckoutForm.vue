<template>
    <form
        method="post"
        :class="$style['c-checkout-form']"
        @submit.prevent="onFormSubmit">
        <section
            v-if="invalidFieldsSummary"
            class="is-visuallyHidden"
            role="alert"
            data-test-id="error-summary-container">
            {{ invalidFieldsSummary }}
        </section>

        <guest-block v-if="!isLoggedIn" />

        <checkout-form-field
            field-name="mobileNumber"
            field-type="customer"
            max-length="16" />

        <checkout-form-field
            v-if="isCheckoutMethodDineIn"
            field-name="tableIdentifier"
            field-type="dineIn"
            max-length="12" />

        <address-block
            v-if="isCheckoutMethodDelivery"
            data-test-id="address-block"
            :should-show-administrative-area="shouldShowAddressAdministrativeArea" />

        <form-selector :key="availableFulfilmentTimesKey" />

        <checkout-notes />

        <f-button
            :class="[
                $style['c-checkout-submitButton'], {
                    [$style['c-checkout-submitButton--noBottomSpace']]: !isLoggedIn
                }]"
            button-type="primary"
            button-size="large"
            is-full-width
            action-type="submit"
            data-test-id="confirm-payment-submit-button"
            :is-loading="isFormSubmitting">
            {{ $t('buttonText') }}
        </f-button>
    </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
    required, email, requiredIf
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { validations } from '@justeat/f-services';
import CheckoutNotes from './Notes.vue';
import '@justeat/f-form-field/dist/f-form-field.css';
import EventNames from '../event-names';
import AddressBlock from './Address.vue';
import CheckoutFormField from './CheckoutFormField.vue';
import FormSelector from './Selector.vue';
import GuestBlock from './Guest.vue';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: {
        AddressBlock,
        FButton,
        CheckoutFormField,
        CheckoutNotes,
        FormSelector,
        GuestBlock
    },

    mixins: [
        validationMixin
    ],

    props: {
        tenant: {
            type: String,
            required: true
        },

        isCheckoutMethodDelivery: {
            type: Boolean,
            required: true
        },

        isCheckoutMethodDineIn: {
            type: Boolean,
            required: true
        },

        scrollToElement: {
            type: Function,
            required: true
        },

        availableFulfilmentTimesKey: {
            type: Number,
            required: true
        },

        isFormSubmitting: {
            type: Boolean,
            required: true
        }
    },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    provide () {
        const $v = {};

        Object.defineProperty($v, VALIDATIONS.address, {
            enumerable: true,
            get: () => this.$v.address
        });

        Object.defineProperty($v, VALIDATIONS.customer, {
            enumerable: true,
            get: () => this.$v.customer
        });

        Object.defineProperty($v, VALIDATIONS.dineIn, {
            enumerable: true,
            get: () => this.$v.dineIn
        });

        return { $v };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'address',
            'customer',
            'isLoggedIn',
            'serviceType',
            'dineIn',
            'time',
            'notes'
        ]),

        invalidFieldsSummary () {
            const invalidFieldCount = this.$v.$dirty
                && validations.getFormValidationState(this.$v).invalidFields.length;

            if (!invalidFieldCount) return null;

            return invalidFieldCount === 1 ?
                this.$t('errorMessages.singleFieldError') :
                this.$t('errorMessages.multipleFieldErrors', { errorCount: invalidFieldCount });
        },

        shouldShowAddressAdministrativeArea () {
            return this.tenant === 'au';
        }
    },

    methods: {

        /**
         * Scroll to the first inline error, no matter which one it is.
         */
        scrollToFirstInlineError () {
            this.$nextTick(() => {
                const firstInlineError = document.querySelector('[data-js-error-message]');

                this.scrollToElement(firstInlineError, { offset: -100 });
            });
        },

        /**
         * Check to see if there are any `Vuelidate` validation errors
         */
        isFormValid () {
            this.$v.$touch();
            return !this.$v.$invalid;
        },

        /**
         * 1. Sets `SubmittingState`.
         * 2. If the form is validemit success event.
         * 2. If the form is invalid scroll to error and submit failure event.
         * 4. Sets `SubmittingState`.
         */
        onFormSubmit () {
            this.$emit(EventNames.FormSubmitting);

            if (this.isFormValid()) {
                this.$emit(EventNames.FormValid);
            } else {
                const validationState = validations.getFormValidationState(this.$v);
                this.scrollToFirstInlineError();

                this.$emit(EventNames.FormInvalid, validationState);
            }
        },

        /**
         * Use phone validation in `f-services` to check if customer number is
         * valid in current locale
         */
        isValidPhoneNumber () {
            return validations.isValidPhoneNumber(this.customer.mobileNumber, this.$i18n.locale);
        },

        /**
         * Use postcode validation in `f-services` to check if customer postcode is
         * valid in current locale
         */
        isValidPostcode () {
            return validations.isValidPostcode(this.address.postcode, this.$i18n.locale);
        }
    },

    validations () {
        const validationProperties = {
            customer: {
                mobileNumber: {
                    required,
                    mobileNumber: this.isValidPhoneNumber
                }
            }
        };

        if (!this.isLoggedIn) {
            validationProperties.customer = {
                ...validationProperties.customer,
                firstName: {
                    required
                },
                lastName: {
                    required
                },
                email: {
                    required,
                    email
                }
            };
        }

        if (this.isCheckoutMethodDelivery) {
            validationProperties.address = {
                line1: {
                    required
                },
                locality: {
                    required
                },
                administrativeArea: {
                    required: requiredIf(() => this.shouldShowAddressAdministrativeArea)
                },
                postcode: {
                    required,
                    postcode: this.isValidPostcode
                }
            };
        }

        if (this.isCheckoutMethodDineIn) {
            validationProperties.dineIn = {
                tableIdentifier: {
                    required
                }
            };
        }

        return validationProperties;
    }
};
</script>

<style lang="scss" module>
.c-checkout-form {
    margin-top: spacing(d);
}

/* If these stay the same then just rename the class to something more generic */
.c-checkout-submitButton {
    margin: spacing(f) 0;

    @include media('>=#{$checkout-width}') {
        margin: spacing(f) 0 0;
    }
}

.c-checkout-submitButton--noBottomSpace {
    margin-bottom: 0;
}
</style>
