<template>
    <img
        :src="logoUrl"
        alt=""
        width="50"
        height="50"
        loading="lazy"
        :class="$style['c-restaurantCard-logo']"
        data-test-id="restaurant_logo">
</template>

<script>
export default {
    name: 'RestaurantLogo',
    props: {
        logoUrl: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
$logo-borderRadius                        : $radius-rounded-b;
$logo-borderColor                         : $color-border-default;

.c-restaurantCard-logo {
  border: 1px solid $logo-borderColor;
  border-radius: $logo-borderRadius;
}
</style>
