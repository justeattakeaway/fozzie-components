<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-addressGroup']">
            <form-field
                v-model="value.line1"
                :class="$style['c-addressGroup-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="passed.copy.labels.line1"
                label-style="inline">
                <template #error>
                    <error-message
                        v-if="isAddressLine1Invalid"
                        data-test-id='error-address-line1-empty'>
                        {{ passed.copy.validationMessages.addressLine1.requiredError }}
                    </error-message>
                </template>
            </form-field>

            <form-field
                v-model="value.line2"
                :class="$style['c-addressGroup-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="passed.copy.labels.line2"
                label-style="inline" />

            <form-field
                v-model="value.city"
                :class="$style['c-addressGroup-formField']"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="passed.copy.labels.city"
                label-style="inline">
                <template #error>
                    <error-message
                        v-if="isAddressCityInvalid"
                        data-test-id='error-address-city-empty'>
                        {{ passed.copy.validationMessages.city.requiredError }}
                    </error-message>
                </template>
            </form-field>
        </fieldset>
        <form-field
            v-model="value.postcode"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="passed.copy.labels.postcode"
            label-style="inline">
            <template #error>
                <error-message
                    v-if="isAddressPostcodeInvalid"
                    data-test-id='error-address-postcode-empty'>
                    {{ passed.copy.validationMessages.postcode.requiredError }}
                </error-message>
                <error-message
                    v-else-if="isAddressPostcodeIncorrectType"
                    data-test-id='error-address-postcode-type-error'>
                    {{ passed.copy.validationMessages.postcode.invalidCharError }}
                </error-message>
            </template>
        </form-field>
    </div>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: { FormField, ErrorMessage },

    inject: ['passed'],

    props: {
        value: {
            type: Object,
            required: true
        }
    },

    computed: {
        isAddressLine1Invalid () {
            return this.passed.$v.address.line1.$dirty && !this.passed.$v.address.line1.required;
        },

        isAddressCityInvalid () {
            return this.passed.$v.address.city.$dirty && !this.passed.$v.address.city.required;
        },

        isAddressPostcodeInvalid () {
            return this.passed.$v.address.postcode.$dirty && !this.passed.$v.address.postcode.required;
        },

        isAddressPostcodeIncorrectType () {
            return this.passed.$v.address.postcode.$dirty && !this.passed.$v.address.postcode.isValidPostcode;
        }
    }
};
</script>

<style lang="scss" module>

.c-addressGroup {
    margin: spacing(x2) 0 spacing(x4) 0;
    padding: 0;
    border: none;
    @include font-size(body-s);

    .c-addressGroup-formField {
        margin-bottom: -17px;
    }
}
</style>
