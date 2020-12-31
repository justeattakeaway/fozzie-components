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
            const times = this.availableFulfilment.isAsapAvailable
                ? [this.$t('asapFulfilmentOption')]
                : [];

            this.availableFulfilment.times.forEach(time => {
                const formattedTime = this.$d(new Date(time.from), 'short');

                times.push(formattedTime);
            });

            return times;
        }
    },

    watch: {
        'fulfilmentTimes' () {
            if (this.fulfilmentTimes.length > 0) {
                this.selectionChanged(this.fulfilmentTimes[0]);
            }
        }
    },

    methods: {
        /**
        * Update the selected available fulfilment time.
        *
        * @param {string} selectedFulfilmentTime The time emited when dropdown value is changed.
        **/
        selectionChanged (selectedFulfilmentTime) {
            this.selectedAvailableFulfilmentTime = selectedFulfilmentTime;
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-selector {
    margin-top: spacing(x2);
}
</style>

