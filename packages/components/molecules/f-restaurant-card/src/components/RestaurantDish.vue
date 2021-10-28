<template>
    <div :class="[$style['c-restaurantCard-dish']]">
        <span :class="[$style['c-restaurantCard-dishTitle']]">
            Based on your search
        </span>
        <span :class="[$style['c-restaurantCard-dishName']]">
            Sausage And Egg Mcmuffin®
        </span>
        <span :class="[$style['c-restaurantCard-dishPrice']]">
            £2.79
        </span>
    </div>
</template>

<script>
export default {
    name: 'RestaurantDish'
};
</script>

<style lang="scss" module>
$dish-fontSize:      $font-body-s-paragraph * 1px;

.c-restaurantCard-dish {
  background-color: $color-green-10;
  padding: spacing(x2);
  border-radius: $radius-rounded-b;
}

.c-restaurantCard-dishTitle {
    display: block;
}

.c-restaurantCard-dishTitle,
.c-restaurantCard-dishPrice {
    color: $color-green-60;
    font-size: $dish-fontSize;
}

.c-restaurantCard-dishName {
    font-weight: $font-weight-extrabold;
    padding-right: spacing(x0.5);
}
</style>
