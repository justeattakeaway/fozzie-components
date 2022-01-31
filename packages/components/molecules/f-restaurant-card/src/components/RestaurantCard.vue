<template>
    <component
        :is="componentVersion"
        v-bind="data"
        :flags="flags"
        :error-boundary="errorBoundary">
        <template
            v-for="(_, slotName) in $slots"
            v-slot:[slotName]>
            <slot :name="slotName" />
        </template>
    </component>
</template>

<script>
import restaurantCardVersions from './restaurantCardVersions';
import errorBoundaryProp from '../assets/vue/mixins/errorBoundary.mixin';

export default {
    name: 'RestaurantCard',
    mixins: [errorBoundaryProp],
    props: {
        // restaurant & display data
        data: {
            type: Object,
            required: true
        },
        // feature flags
        flags: {
            type: Object,
            default: () => ({})
        },
        // component version
        version: {
            type: String,
            default: 'v1'
        }
    },
    computed: {
        componentVersion () {
            return restaurantCardVersions.components[this.version];
        }
    }
};
</script>
