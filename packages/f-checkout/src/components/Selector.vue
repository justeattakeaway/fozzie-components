<template>
    <div>
        <form-field
            id="time-selection"
            data-test-id="form-select"
            :class="$style['o-form-select']"
            input-type="dropdown"
            :label-text="orderMethod"
            :dropdown-options="fulfillmentTimes"
            @input="selectionChanged" />
        <form-field
            id="time-selection"
            data-test-id="form-select"
            :class="$style['o-form-select']"
            input-type="dropdown"
            :label-text="orderMethod"
            :dropdown-options="fulfillment.times"
            @input="selectionChanged" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import { CHECKOUT_METHOD_DELIVERY } from '../constants';

export default {
    components: { FormField },

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

        fulfillmentTimes () {
            /*
            * Create an array from fulfillment times labels to
            * display as options in dropdown
            */
            return this.fulfillment.times.map(time => time.label.text);
        }
    },

    methods: {
        selectionChanged (e) {
            /*
            * Update all fulfillment.times.selected to false
            * Update chosen fulfillment.times.selected to true
            */
            this.fulfillment.times.find(time => {
                time.label.text === e ? time.selected = true : time.selected = false;
            });
        }
    }
};
</script>

<style lang="scss" module>
.o-form-select {
    margin-top: spacing(x2);
}
</style>

