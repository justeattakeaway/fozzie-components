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
                // TODO: - Replace with f-error-message
                <template #error>
                    <p
                        v-if="!isAddressLine1Valid"
                        :class="$style['o-form-error']"
                        data-test-id='error-address-line1-empty'>
                        {{ passed.copy.validationMessages.addressLine1.requiredError }}
                    </p>
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
                // TODO: - Replace with f-error-message
                <template #error>
                    <p
                        v-if="!isAddressCityValid"
                        :class="$style['o-form-error']"
                        data-test-id='error-address-city-empty'>
                        {{ passed.copy.validationMessages.city.requiredError }}
                    </p>
                </template>
            </form-field>
        </fieldset>

        <form-field
            v-model="value.postcode"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="passed.copy.labels.postcode"
            label-style="inline">
            // TODO: - Replace with f-error-message
            <template #error>
                <p
                    v-if="!isAddressPostcodeValid"
                    :class="$style['o-form-error']"
                    data-test-id='error-address-postcode-empty'>
                    {{ passed.copy.validationMessages.postcode.requiredError }}
                </p>
                <p
                    v-else-if="!isAddressPostcodeCorrectType"
                    :class="$style['o-form-error']"
                    data-test-id='error-address-postcode-type-error'>
                    {{ passed.copy.validationMessages.postcode.invalidCharError }}
                </p>
            </template>
        </form-field>
    </div>
</template>

<script>
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: { FormField },

    inject: ['passed'],

    props: {
        value: {
            type: Object,
            required: true
        }
    },

    computed: {
        isAddressLine1Valid () {
            return !this.passed.$v.address.line1.required && !this.passed.$v.address.line1.$dirty;
        },

        isAddressCityValid () {
            return !this.passed.$v.address.city.required && !this.passed.$v.address.city.$dirty;
        },

        isAddressPostcodeValid () {
            return !this.passed.$v.address.postcode.required && !this.passed.$v.address.postcode.$dirty;
        },

        isAddressPostcodeCorrectType () {
            return !this.passed.$v.address.postcode.isValidPostcode && !this.passed.$v.address.postcode.$dirty;
        }
    },

    watch: {
        value: {
            deep: true,

            handler () {
                console.log('changed');
            }
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

.o-form-error {
    display: flex;
    align-items: center;
    color: $color-text--danger;
    @include font-size(body-s);
    margin-top: spacing();
}
</style>
