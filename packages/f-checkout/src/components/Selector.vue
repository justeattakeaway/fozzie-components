<template>
    <form-dropdown
        id="time-selection"
        data-test-id="form-select"
        :class="$style['c-checkout-selector']"
        input-type="dropdown"
        :label-text="orderMethod"
        :dropdown-options="fulfillmentTimes"
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
            'fulfillment',
            'serviceType'
        ]),

        orderMethod () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY
                ? this.$t('labels.deliveryOrderMethod')
                : this.$t('labels.collectionOrderMethod');
        },

        /*
        * Create an array from fulfillment times labels to
        * display as options in dropdown
        */
        fulfillmentTimes () {
            return this.fulfillment.times.map(time => time.label.text);
        }
    },

    methods: {
        /**
        * Update all fulfillment.times.selected to false
        * Update chosen fulfillment.times.selected to true
        *
        * @param {string} selectedTime The time emited when dropdown value is changed.
        **/
        selectionChanged (selectedTime) {
            this.fulfillment.times.forEach(fulfillmentTime => {
                fulfillmentTime.selected = fulfillmentTime.label.text === selectedTime;
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

