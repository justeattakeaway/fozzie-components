<template>
    <div>
        <icon-text
            v-if="eta"
            :text="eta"
            :is-bold="true"
            :color="'green'"
            :hide-icon-in-tile-view="true"
            data-test-id="eta-icon-text">
            <clock-icon />
        </icon-text>

        <icon-text
            v-else-if="distance"
            :text="distance"
            :is-bold="true"
            :hide-icon-in-tile-view="true"
            data-test-id="distance-icon-text">
            <map-pin-icon />
        </icon-text>

        <icon-text
            v-else-if="address"
            :text="address"
            data-test-id="address-icon-text">
            <map-pin-icon />
        </icon-text>
    </div>
</template>

<script>
import { MapPinIcon, ClockIcon } from '@justeat/f-vue-icons';
import IconText from '../IconText.vue';

export default {
    name: 'DeliveryTimeMeta',
    components: {
        IconText,
        MapPinIcon,
        ClockIcon
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
