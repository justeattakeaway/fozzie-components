<template>
    <form-dropdown
        id="time-selection"
        name="order-time"
        :class="$style['c-checkout-selector']"
        input-type="dropdown"
        :label-text="orderMethod"
        :dropdown-options="fulfilmentTimes"
        @input="selectionChanged" />
</template>

<script>
import { mapState } from 'vuex';
import FormDropdown from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { CHECKOUT_METHOD_DELIVERY } from '../constants';

export default {
    components: { FormDropdown },

    computed: {
        ...mapState('checkout', [
            'fulfilment',
            'serviceType'
        ]),

        orderMethod () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY
                ? this.$t('labels.deliveryOrderMethod')
                : this.$t('labels.collectionOrderMethod');
        },

        /*
        * Create an array from fulfilment times labels to
        * display as options in dropdown
        */
        fulfilmentTimes () {
            return this.fulfilment.times.map(time => time.label.text);
        }
    },

    methods: {
        /**
        * Update all fulfilment.times.selected to false
        * Update chosen fulfilment.times.selected to true
        *
        * @param {string} selectedTime The time emited when dropdown value is changed.
        **/
        selectionChanged (selectedTime) {
            this.fulfilment.times.forEach(fulfilmentTime => {
                fulfilmentTime.selected = fulfilmentTime.label.text === selectedTime;
            });
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-selector {
    margin-top: spacing(x2);
}
</style>

