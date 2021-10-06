<template>
    <component
        :is="componentVersion"
        :data="data" />
</template>

<script>
import RestaurantCardV1 from './RestaurantCard.v1.vue';

const componentVersions = {
    v1: RestaurantCardV1
};

export default {
    name: 'RestaurantCard',
    components: {
        RestaurantCardV1
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        version: {
            type: String,
            default: 'v1'
        }
    },
    computed: {
        componentVersion () {
            return componentVersions[this.version];
        }
    }
};
</script>
