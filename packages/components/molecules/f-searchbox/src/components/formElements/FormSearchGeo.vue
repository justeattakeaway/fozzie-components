<template>
    <button
        :class="$style['c-geo-locator']"
        type="button"
        data-test-id="geo-locator-tip"
        @click="getSuggestions"
        @keypress.enter="getSuggestions">
        <span :class="$style['c-geo-locator-tip']">{{ copy.geoTip }}</span>

        <geo-fill-icon
            v-if="hasGeoSuggestionsResults"
            :class="$style['c-geo-fill-icon']" />

        <geo-outline-icon
            v-else
            :class="$style['c-geo-outline-icon']" />
    </button>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { GeoOutlineIcon, GeoFillIcon } from '@justeat/f-vue-icons';
import { VUEX_MODULE_NAMESPACE } from '../../services/constants';

export default {
    components: {
        GeoOutlineIcon,
        GeoFillIcon
    },

    props: {
        copy: {
            type: Object,
            default:  () => ({})
        },

        service: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE, [
            'suggestions'
        ]),

        /**
         * Check if suggestions are populated, if they are we use this to toggle
         * between the two different icons (geo fill & geo outline) to indicate to the user
         * results are available.
         *
         * */
        hasGeoSuggestionsResults () {
            return this.suggestions.length;
        }
    },

    methods: {
        ...mapActions(VUEX_MODULE_NAMESPACE, [
            'setSuggestions',
            'setIsDirty'
        ]),

        /**
         * Check if suggestions exist in state, if not we attempt to return results
         * via `getLocationFromGeo` which will resolve via our `setSuggestions` action.
         * If we return any errors then we will resolve with the rejection error.
         *
         */
        getSuggestions () {
            if (this.suggestions.length) {
                this.setSuggestions(Promise.resolve(this.suggestions));
            } else {
                this.setSuggestions(this.service.getLocationFromGeo());
            }
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-geo-locator {
    width: 35px;
    height: 35px;
    display: inline-block;
    background: transparent;
    padding: f.spacing();
    vertical-align: middle;
    border: none;
    position: relative;
    top: -10px;

    @include f.media('>=narrowMid') {
        display: none;
    }

    &:hover {
        cursor: pointer;
    }
}
.c-geo-locator-tip {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
}

.c-geo-fill-icon,
.c-geo-outline-icon {
    path {
        fill: f.$color-interactive-primary;
    }
}
</style>
