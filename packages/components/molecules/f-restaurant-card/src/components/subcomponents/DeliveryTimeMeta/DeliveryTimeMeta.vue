<template>
    <div :class="[$style['c-deliveryTimeMeta']]">
        <icon-text
            v-if="eta"
            :text="eta"
            :is-bold="true"
            color="colorSupportPositive"
            :hide-icon-in-tile-view="true"
            data-test-id="restaurant-eta"
            :class="[$style['c-deliveryTimeMeta-iconText']]">
            <clock-small-icon data-test-id="restaurant-eta-icon" />
        </icon-text>

        <icon-text
            v-else-if="distance"
            :text="distance"
            :is-bold="true"
            :hide-icon-in-tile-view="true"
            data-test-id="restaurant-location">
            <map-pin-icon data-test-id="restaurant-distance-icon" />
        </icon-text>

        <icon-text
            v-else-if="address"
            :text="address"
            data-test-id="restaurant-location">
            <map-pin-icon data-test-id="restaurant-address-icon" />
        </icon-text>
    </div>
</template>

<script>
import { MapPinIcon, ClockSmallIcon } from '@justeat/f-vue-icons';
import IconText from '../IconText.vue';

export default {
    name: 'DeliveryTimeMeta',
    components: {
        IconText,
        MapPinIcon,
        ClockSmallIcon
    },
    inject: {
        performanceTracker: {
            default: null
        }
    },
    props: {
        address: {
            type: String,
            default: null
        },
        distance: {
            type: String,
            default: null
        },
        eta: {
            type: String,
            default: null
        }
    },
    mounted () {
        if (this.performanceTracker) {
            this.$nextTick(() => {
                // Hard coding temporarily. We can eventually configure this
                this.performanceTracker.time('tier-3');
            });
        }
    }
};
</script>

<style lang="scss" module>
.c-deliveryTimeMeta-iconText {
    margin-right: spacing(b);
}
</style>
