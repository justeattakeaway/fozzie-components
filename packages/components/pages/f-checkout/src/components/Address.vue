<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-address-group']">
            <legend
                :class="$style['c-address-label']"
                @click="addFocus">
                {{ $t('labels.addressGroup') }}
            </legend>

            <checkout-form-field
                v-for="field in groupedAddressFields"
                :key="field"
                :field-name="field"
                :field-type="fieldType"
                :class="$style['c-address-formField']"
                is-grouped />
        </fieldset>

        <checkout-form-field
            v-for="field in unGroupedAddressFields"
            :key="field"
            :field-name="field"
            :field-type="fieldType"
            :max-length="fieldLength" />
    </div>
</template>

<script>
import CheckoutFormField from './CheckoutFormField.vue';

export default {
    name: 'CheckoutAddress',

    components: { CheckoutFormField },

    data () {
        return {
            fieldType: 'address',
            fieldLength: '50'
        };
    },

    computed: {
        groupedAddressFields () {
            const addressFields = this.$t('formFields.address');

            return Object.keys(addressFields).filter(field => addressFields[field].isGrouped);
        },

        unGroupedAddressFields () {
            const addressFields = this.$t('formFields.address');

            return Object.keys(addressFields).filter(field => !addressFields[field].isGrouped);
        }
    },

    methods: {
        addFocus () {
            document.getElementById('formField-line-1').focus();
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$address-colour          : f.$color-content-default;
$address-fontSize        : 'body-s';
$address-weight-bold     : f.$font-weight-bold;

.c-address-label {
    color: $address-colour;
    @include f.font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: f.spacing(d) 0 f.spacing();
}

.c-address-group {
    margin: f.spacing(d) 0;
    padding: 0;
    border: none;
    @include f.font-size($address-fontSize);

    .c-address-formField {
        &:focus-within,
        &:active {
            z-index: f.zIndex(high);
            position: relative;
        }
    }
}
</style>
