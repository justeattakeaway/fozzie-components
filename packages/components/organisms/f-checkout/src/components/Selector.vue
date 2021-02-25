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
import { mapActions, mapState } from 'vuex';
import FormDropdown from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { CHECKOUT_METHOD_DELIVERY } from '../constants';

export default {
    components: { FormDropdown },

    data () {
        return {
            selectedAvailableFulfilmentTime: ''
        };
    },

    computed: {
        ...mapState('checkout', [
            'availableFulfilment',
            'serviceType'
        ]),

        orderMethod () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY
                ? this.$t('labels.deliveryOrderMethod')
                : this.$t('labels.collectionOrderMethod');
        },

        /*
        * Returns an array of formatted dates to display as options in a dropdown
        */
        fulfilmentTimes () {
            const times = [];
            this.availableFulfilment.times.forEach(time => {
                const formattedTime = this.$d(new Date(time.from), 'short');

                times.push({
                    text: formattedTime,
                    value: time.from
                });
            });

            if (this.availableFulfilment.isAsapAvailable && times.length) {
                times[0].text = this.$t('asapFulfilmentOption');
            }

            return times;
        }
    },

    watch: {
        fulfilmentTimes (newFulfilmentTimes) {
            this.selectionChanged(newFulfilmentTimes[0] && newFulfilmentTimes[0].value);
        }
    },

    methods: {
        ...mapActions('checkout', [
            'updateFulfilmentTime'
        ]),

        ...mapActions('analytics', [
            'updateChangedFields'
        ]),

        /**
        * Update the selected available fulfilment time.
        *
        * @param {string} selectedFulfilmentTime The time emited when dropdown value is changed.
        **/
        selectionChanged (selectedFulfilmentTime) {
            this.selectedAvailableFulfilmentTime = selectedFulfilmentTime;
            this.updateChangedFields('orderTime');

            // TODO - Update to use different from/to times when the API supports it
            this.updateFulfilmentTime({
                from: selectedFulfilmentTime,
                to: selectedFulfilmentTime
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
