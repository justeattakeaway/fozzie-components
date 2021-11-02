<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-address-group']">
            <legend
                :class="$style['c-address-label']">
                {{ $t('labels.addressGroup') }}
            </legend>

            <checkout-form-field
                field-name="line1"
                field-type="address"
                is-grouped />

            <checkout-form-field
                field-name="line2"
                field-type="address"
                is-grouped />
        </fieldset>

        <checkout-form-field
            field-name="locality"
            field-type="address"
            max-length="50" />

        <checkout-form-field
            v-if="shouldShowAdministrativeArea"
            field-name="administrativeArea"
            field-type="address"
            max-length="50" />

        <checkout-form-field
            field-name="postcode"
            field-type="address"
            max-length="50"
            should-blur />
    </div>
</template>

<script>
import CheckoutFormField from './CheckoutFormField.vue';

export default {
    components: { CheckoutFormField },

    props: {
        shouldShowAdministrativeArea: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" module>
$address-colour          : $color-content-default;
$address-fontSize        : 'body-s';
$address-weight-bold     : $font-weight-bold;

.c-address-label {
    color: $address-colour;
    @include font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: spacing(x2) 0 spacing();
}

.c-address-group {
    margin: spacing(x2) 0;
    padding: 0;
    border: none;
    @include font-size($address-fontSize);
}
</style>
