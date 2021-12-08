<template>
    <p :class="[$style['c-restaurantCard-dish']]">
        <span :class="[$style['c-restaurantCard-dish-name']]">
            {{ name }}
        </span>
        <span
            v-if="price !== null"
            :class="[$style['c-restaurantCard-dish-price']]">
            {{ price }}
        </span>
    </p>
</template>

<script>
export default {
    name: 'RestaurantDish',
    props: {
        /**
         * Name of the dish
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * String representation of how much the dish costs, including currency
         */
        price: {
            type: Number,
            default: null
        }
    }
};
</script>

<style lang="scss" module>
$dish-fontSize: $font-body-s-paragraph * 1px;

.c-restaurantCard-dish {
  background-color: $color-orange-10;
  padding: spacing(x2);
  border-radius: $radius-rounded-b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.c-restaurantCard-dish-name {
    margin-right: spacing();
}

.c-restaurantCard-dish-name,
.c-restaurantCard-dish-price {
    font-size: $dish-fontSize;
    font-weight: $font-weight-bold;
}
</style>
