<template>
    <div
        data-test-id="guest-component"
        :class="$style['c-guest']">
        <checkout-form-field
            field-name="firstName"
            :field-type="fieldType" />

        <checkout-form-field
            field-name="lastName"
            :field-type="fieldType" />

        <checkout-form-field
            field-name="email"
            :field-type="fieldType"
            max-length="50" />
    </div>
</template>

<script>
import CheckoutFormField from './CheckoutFormField.vue';

export default {
    name: 'GuestCheckout',
    components: { CheckoutFormField },

    data () {
        return {
            fieldType: 'customer'
        };
    }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(d);
}
</style>
