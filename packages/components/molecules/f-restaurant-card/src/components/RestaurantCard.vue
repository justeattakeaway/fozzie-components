<template>
    <component
        :is="componentVersion"
        :data="data"
        :flags="flags" />
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
        }
    },
    computed: {
        componentVersion () {
            return restaurantCardVersions.components[this.version];
        }
    }
};
</script>
