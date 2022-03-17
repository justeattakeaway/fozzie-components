<template>
    <ul
        :class="[$style['c-restaurantCard-cuisines']]"
        data-test-id="restaurant-cuisines">
        <li
            v-for="(cuisine, index) in cuisines"
            :key="index"
            :class="[$style['c-restaurantCard-cuisines-item']]">
            {{ cuisine }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'RestaurantCuisines',
    props: {
        cuisines: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-cuisines {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    margin: 0 0 4px 0;
    padding: 0;
    list-style: none;
    // list-style-image: none;

    & + & {
        margin-top: 0;
    }
}

.c-restaurantCard-cuisines-item {
    position: relative;
    padding-right: spacing();
    margin: 0 spacing(a) 0 0;
    white-space: nowrap;
    @include font-size($font-body-s-paragraph);

    &:before {
        display: none;
    }

    &:after {
        content: '\2022';
        color: $color-content-subdued;
        position: absolute;
        right: 0;
    }

    &:last-of-type {
        padding-right: 0;
        margin-right: 0;

        &:after {
            display: none;
        }
    }
}
</style>
