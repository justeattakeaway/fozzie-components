<template>
    <div :class="[$style['c-restaurantCard-fees']]">
        <icon-text
            v-if="deliveryFeeText"
            :class="[$style['c-restaurantCard-fees-item']]"
            :text="deliveryFeeText"
            :hide-icon-in-tile-view="true"
            data-test-id="restaurant-fees-delivery">
            <cash-small-icon data-test-id="restaurant-fees-delivery-icon" />
        </icon-text>

        <icon-text
            v-if="minOrderText"
            :class="[$style['c-restaurantCard-fees-item']]"
            :text="minOrderText"
            data-test-id="restaurant-fees-min-order" />
    </div>
</template>

<script>
import { CashSmallIcon } from '@justeat/f-vue-icons';
import IconText from '../IconText.vue';

export default {
    name: 'RestaurantFees',
    components: {
        IconText,
        CashSmallIcon
    },
    props: {
        deliveryFeeText: {
            type: String,
            default: null
        },
        minOrderText: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-fees {
    display: flex;
    align-items: center;
}

.c-restaurantCard-fees-item {
    position: relative;
    padding-right: spacing();
    margin-right: spacing(x0.5);
    white-space: nowrap;
    font-size: $font-body-s-paragraph * 1px;

    &:before {
        display: none;
    }

    &:after {
        content: '\2022';
        color: $color-content-subdued;
        position: absolute;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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
