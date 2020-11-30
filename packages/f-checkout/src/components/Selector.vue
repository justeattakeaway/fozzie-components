<template>
    <form-field
        id="time-selection"
        data-test-id="form-select"
        :class="$style['o-form-select']"
        input-type="dropdown"
        :label-text="orderMethod"
        :dropdown-options="fulfilmentTimes"
        @input="selectionChanged" />
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

        fulfilmentTimes () {
            const times = this.fulfillment.times.map(time => time.label.text);
            return times;
        }
    },

    methods: {
        selectionChanged (e) {
            this.fulfillment.times.forEach(el => { el.selected = false; });
            const newSelected = this.fulfillment.times.find(time => time.label.text === e);
            if (newSelected) {
                newSelected.selected = true;
            }
        }
    }
};
</script>

<style lang="scss" module>
.o-form-select {
    margin-top: spacing(x2);
}
</style>
