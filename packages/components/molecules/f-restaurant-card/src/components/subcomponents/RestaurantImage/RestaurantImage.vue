<template>
    <div
        :class="[$style['c-restaurantCard-img']]"
        :style="`background-image: url(${imgUrl});`"
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
            required: true
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
