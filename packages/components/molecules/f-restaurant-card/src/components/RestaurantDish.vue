<template>
    <div :class="[$style['c-restaurantCard-dish']]">
        <span :class="[$style['c-restaurantCard-dishTitle']]">Based on your search</span>
        <span :class="[$style['c-restaurantCard-dishName']]">Half Chicken Roast Chicken</span>
        <span :class="[$style['c-restaurantCard-dishPrice']]">£5.99</span>
    </div>
</template>

<script>
export default {
    name: 'RestaurantDish'
};
</script>

<style lang="scss" module>
.c-restaurantCard-dish {
  background-color: $color-green-10;
  padding: spacing(x2);
  border-radius: $radius-rounded-b;
}

.c-restaurantCard-dishTitle {
    display: block;
}

.c-restaurantCard-dishTitle,
.c-restaurantCard-dishPrice
 {
    color: #04822C;
    font-size: 14px;
}

.c-restaurantCard-dishName {
    font-weight: $font-weight-extrabold;
    padding-right: spacing(x0.5);
}
</style>
