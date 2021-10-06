<template>
    <section
        :class="$style['c-restaurantCard']"
        data-test-id="restaurantCard-component">
        <a :href="data.restaurant.url">
            <p>{{ data.restaurant.id }}</p>
            <p>{{ data.restaurant.name }}</p>
        </a>

        <p v-if="flags.experimentalBadges">
            Using fancy new badges!
        </p>
    </section>
</template>

<script>

export default {
    name: 'RestaurantCard',
    components: {},
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
    }
};
</script>

<style lang="scss" module>

.c-restaurantCard {
    display: flex;
    justify-content: center;
    margin: auto;
    border: 1px solid purple;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
