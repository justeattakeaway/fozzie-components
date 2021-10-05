<template>
    <div
        :class="$style['c-restaurantCard']"
        data-test-id="restaurantCard-component">
        I am a RestaurantCard Component (GB)
    </div>
</template>

<script>

export default {
    name: 'RestaurantCard',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-restaurantCard {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
