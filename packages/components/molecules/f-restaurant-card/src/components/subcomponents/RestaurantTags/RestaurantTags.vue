<template>
    <ul
        :class="[$style['c-restaurantTags']]"
        :data-test-id="`restaurant-${testIdPosition}-tags`">
        <li
            v-for="(tag, index) in tags"
            :key="index"
            :class="[$style['c-restaurantTags-tag']]">
            <restaurant-tag v-bind="tag" />
        </li>
    </ul>
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantTags {
    margin-top: 0;
    margin-left: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.c-restaurantTags-tag {
    list-style-type: none;
    margin: 0 f.spacing(a) f.spacing(a) 0;
}
</style>
