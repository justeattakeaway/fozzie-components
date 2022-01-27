<template>
    <img
        :src="logoUrl"
        alt=""
        role="presentation"
        width="50"
        height="50"
        loading="lazy"
        :class="{
            [$style['c-restaurantCard-logo']]: true,
            [$style['c-restaurantCard-logo--hidden']]: hidden
        }"
        data-test-id="restaurant_logo"
        @error="hideSelf">
</template>

<script>
export default {
    name: 'RestaurantLogo',
    props: {
        logoUrl: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            hidden: false
        };
    },
    methods: {
        // We'd prefer to complete hide this element in the event that an image fails to load
        hideSelf () {
            this.hidden = true;
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

.c-restaurantCard-logo--hidden {
  // as this is a purely presentational image, there's no harm in simply using display: nones
  display: none;
}
</style>
