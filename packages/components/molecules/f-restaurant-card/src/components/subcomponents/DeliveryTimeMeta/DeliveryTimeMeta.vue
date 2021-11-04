<template>
    <div>
        <icon-text
            v-if="eta"
            :text="eta"
            :accessible-text="etaForScreenReaders"
            :is-bold="true"
            :color="$options.PieTokens.theme.jet.color.global.green"
            :hide-icon-in-tile-view="true"
            :data-test-id="'eta-icon-text'">
            <clock-icon />
        </icon-text>

        <icon-text
            v-else-if="distance"
            :text="distance"
            :accessible-text="distanceForScreenReaders"
            :is-bold="true"
            :hide-icon-in-tile-view="true"
            :data-test-id="'distance-icon-text'">
            <map-pin-icon />
        </icon-text>

        <icon-text
            v-else-if="address"
            :text="address"
            :accessible-text="addressForScreenReaders"
            :data-test-id="'address-icon-text'">
            <map-pin-icon />
        </icon-text>
    </div>
</template>

<script>
import { MapPinIcon, ClockIcon } from '@justeat/f-vue-icons';
import PIE_TOKENS from '@justeat/pie-design-tokens/dist/tokens.json';
import IconText from '../IconText.vue';

export default {
    PieTokens: PIE_TOKENS,
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
        addressForScreenReaders: {
            type: String,
            default: null
        },
        distance: {
            type: String,
            default: null
        },
        distanceForScreenReaders: {
            type: String,
            default: null
        },
        eta: {
            type: String,
            default: null
        },
        etaForScreenReaders: {
            type: String,
            default: null
        }
    }
};
</script>
