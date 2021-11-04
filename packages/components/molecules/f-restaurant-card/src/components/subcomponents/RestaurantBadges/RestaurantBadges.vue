<template>
    <div
        :class="[$style['c-restaurantBadges']]"
        :data-test-id="`restaurant-${testIdPosition}-badges`">
        <p
            v-for="(badge, index) in badges"
            :key="index"
            :class="[$style['c-restaurantBadges-badge']]">
            <restaurant-badge v-bind="badge" />
        </p>
    </div>
</template>

<script>
import RestaurantBadge from './RestaurantBadge.vue';

export default {
    name: 'RestaurantBadges',
    components: {
        RestaurantBadge
    },
    props: {
        badges: {
            type: Array,
            required: true
        },
        // used for test ID - represents where the badges are being positioned on the restaurant card component i.e. the image, inner-content
        testIdPosition: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantBadges {
    margin: 0;
    padding: 0;
}

.c-restaurantBadges-badge {
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
