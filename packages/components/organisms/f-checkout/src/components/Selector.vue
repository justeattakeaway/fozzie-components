<template>
    <form-dropdown
        id="time-selection"
        name="order-time"
        :class="$style['c-checkout-selector']"
        input-type="dropdown"
        :label-text="orderMethod"
        :dropdown-options="fulfilmentTimes"
        @input="selectionChanged">
        <template #error>
            <alert
                v-if="shouldShowPreOrderWarning"
                type="warning"
                :heading="$t('warningMessages.preOrder.title')"
                data-test-id="warning-pre-order">
                {{ $t('warningMessages.preOrder.body') }}
            </alert>
        </template>
    </form-dropdown>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FormDropdown from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { CHECKOUT_METHOD_DELIVERY, VUEX_CHECKOUT_ANALYTICS_MODULE, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: {
        Alert,
        FormDropdown
    },

    data () {
        return {
            selectedAvailableFulfilmentTime: ''
        };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
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
                this.updateHasAsapSelected(true);
            }

            return times;
        },

        /*
         * Returns true if ASAP is not available
         */
        shouldShowPreOrderWarning () {
            return !this.availableFulfilment.isAsapAvailable;
        }
    },

    watch: {
        fulfilmentTimes (newFulfilmentTimes) {
            this.selectionChanged(newFulfilmentTimes[0] && newFulfilmentTimes[0].value);
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateFulfilmentTime',
            'updateHasAsapSelected'
        ]),

        ...mapActions(VUEX_CHECKOUT_ANALYTICS_MODULE, [
            'updateChangedField'
        ]),

        /**
        * Update the selected available fulfilment time.
        *
        * @param {string} selectedFulfilmentTime The time emited when dropdown value is changed.
        **/
        selectionChanged (selectedFulfilmentTime) {
            this.selectedAvailableFulfilmentTime = selectedFulfilmentTime;
            this.updateChangedField('orderTime');
            this.updateHasAsapSelected(false);

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
