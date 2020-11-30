<template>
    <div
        data-test-id="form-select"
        :class="$style['o-form-select']">
        <form-field
            id="time-selection"
            v-model="selectedTime"
            input-type="dropdown"
            :label-text="orderMethod"
            :dropdown-options="dropdownOptions"
            data-test-id="fulfillment-time"
            @input="selectionChanged" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import { CHECKOUT_METHOD_DELIVERY } from '../constants';

export default {
    components: { FormField },

    data () {
        return {
            selectedTime: null,
            dropdownOptions: []
        };
    },

    computed: {
        ...mapState('checkout', [
            'fulfillment',
            'serviceType'
        ]),

        orderMethod () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY
                ? this.$t('labels.deliveryOrderMethod')
                : this.$t('labels.collectionOrderMethod');
        }
    },

    watch: {
        'fulfillment.times' (newValue) {
            const selected = newValue.find(t => t.selected);
            if (selected) {
                this.selectedTime = selected.from;
            }
            this.createDropdownOptions();
        }
    },

    methods: {
        selectionChanged () {
            this.fulfillment.times.forEach(el => { el.selected = false; });
            const newSelected = this.fulfillment.times.find(t => t.label.text === this.selectedTime);
            if (newSelected) {
                newSelected.selected = true;
            }
        },

        createDropdownOptions () {
            this.fulfillment.times.forEach(time => {
                this.dropdownOptions.push(time.label.text);
            });
            this.selectedTime = this.fulfillment.times[0].label.text;
        }
    }
};
</script>

<style lang="scss" module>
.o-form-select {
    margin-top: spacing(x2);
}
</style>
