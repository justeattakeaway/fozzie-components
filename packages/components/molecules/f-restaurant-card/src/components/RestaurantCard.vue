<template>
    <component
        :is="componentVersion"
        v-bind="data"
        :flags="flags"
        :error-boundary="wrapper">
        <template
            v-for="(_, slotName) in $slots"
            v-slot:[slotName]>
            <slot :name="slotName" />
        </template>
    </component>
</template>

<script>
import restaurantCardVersions from './restaurantCardVersions';

export default {
    name: 'RestaurantCard',
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
        },
        // item wrapper
        wrapper: {
            type: [Object, String],
            default: 'div'
        }
    },
    computed: {
        componentVersion () {
            return restaurantCardVersions.components[this.version];
        }
    }
};
</script>
