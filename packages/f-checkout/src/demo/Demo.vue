<template>
    <div>
        <div data-test-id="component-controls">
            <h1>Component Controls</h1>
            <label for="checkoutMethod">Checkout Method</label>
            <select
                v-model="controls.checkoutMethod"
                name="checkoutMethod"
                data-test-id="control-checkoutMethod"
                @change="updateCheckoutMethod">
                <option
                    name="delivery"
                    value="/checkout-delivery.json">
                    Delivery
                </option>
                <option
                    name="collection"
                    value="/checkout-collection.json">
                    Collection
                </option>
            </select>
        </div>
        <vue-checkout
            :checkout-url='controls.checkoutMethod' />
    </div>
</template>

<script>
import axios from 'axios';
import VueCheckout from '../components/Checkout.vue';
import CheckoutMock from './checkoutMock';

export default {
    components: { VueCheckout },
    data: () => ({
        controls: {
            checkoutMethod: '/checkout-delivery.json'
        }
    }),
    methods: {
        updateCheckoutMethod () {
            CheckoutMock.setupCheckoutMethod(this.controls.checkoutMethod);
            axios.get(this.controls.checkoutMethod);
        }
    }
};
</script>
