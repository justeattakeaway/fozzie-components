<template>
    <div>
        <icon-text
            v-if="eta"
            :text="eta"
            :is-bold="true"
            :color="'colorSupportPositive'"
            :hide-icon-in-tile-view="true"
            data-test-id="delivery-meta-eta">
            <clock-small-icon data-test-id="delivery-meta-eta-icon" />
        </icon-text>

        <icon-text
            v-else-if="distance"
            :text="distance"
            :is-bold="true"
            :hide-icon-in-tile-view="true"
            data-test-id="delivery-meta-distance">
            <map-pin-icon data-test-id="delivery-meta-distance-icon" />
        </icon-text>

        <icon-text
            v-else-if="address"
            :text="address"
            data-test-id="delivery-meta-address">
            <map-pin-icon data-test-id="delivery-meta-address-icon" />
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
    }
};
</script>
