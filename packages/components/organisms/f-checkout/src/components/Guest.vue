<template>
    <div
        data-test-id="guest-component"
        :class="$style['c-guest']">
        <checkout-form-field
            field-name="firstName"
            field-type="customer" />

        <checkout-form-field
            field-name="lastName"
            field-type="customer" />

        <checkout-form-field
            field-name="email"
            field-type="customer"
            input-type="email"
            max-length="50"
            should-validate-on-blur />
    </div>
</template>

<script>
import CheckoutFormField from './CheckoutFormField.vue';

export default {
    components: { CheckoutFormField }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(x2);
}
</style>
