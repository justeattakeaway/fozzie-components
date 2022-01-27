<template>
    <component
        :is="componentVersion"
        v-bind="data"
        :flags="flags"
        :wrapper-components="wrapperComponents"
        :data-point-wrappers="dataPointWrappers">
        <template
            v-for="(_, slotName) in $slots"
            v-slot:[slotName]>
            <slot :name="slotName" />
        </template>
    </component>
</template>

<script>
import restaurantCardVersions from './restaurantCardVersions';
import wrapperComponents from '../assets/vue/mixins/wrapperComponents.mixin';

export default {
    name: 'RestaurantCard',
    mixins: [wrapperComponents],
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
