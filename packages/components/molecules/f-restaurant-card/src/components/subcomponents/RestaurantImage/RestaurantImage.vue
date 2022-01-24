<template>
    <div
        :class="[$style['c-restaurantCard-img']]"
        :style="`${imgUrl ? `background-image: url(${imgUrl});` : null}`"
        role="presentation">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'RestaurantImage',
    props: {
        imgUrl: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss" module>
$img-borderRadius : $radius-rounded-c;

.c-restaurantCard-img {
  background-color: $color-grey-30;
  background-size: cover;
  background-position: center;
  border-radius: $img-borderRadius;
  position: relative;
}
</style>
