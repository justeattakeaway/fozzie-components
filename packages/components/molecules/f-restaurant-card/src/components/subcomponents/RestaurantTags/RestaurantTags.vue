<template>
    <div
        :class="[$style['c-restaurantTags']]"
        :data-test-id="`restaurant-${testIdPosition}-tags`">
        <p
            v-for="(tag, index) in tags"
            :key="index"
            :class="[$style['c-restaurantTags-tag']]">
            <restaurant-tag v-bind="tag" />
        </p>
    </div>
</template>

<script>
import RestaurantTag from './RestaurantTag.vue';

export default {
    name: 'RestaurantTags',
    components: {
        RestaurantTag
    },
    props: {
        tags: {
            type: Array,
            required: true
        },
        // used for test ID - represents where the tags are being positioned on the restaurant card component i.e. the image, inner-content
        testIdPosition: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
.c-RestaurantTags {
    margin: 0;
    padding: 0;
}

.c-RestaurantTags-tag {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-right: spacing(x0.5);
    display: inline-block;

    &:last-of-type {
        margin-right: 0;
    }
}
</style>
