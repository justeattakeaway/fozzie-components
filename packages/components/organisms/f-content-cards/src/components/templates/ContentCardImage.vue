<template>
    <div :class="$style['c-content-cardImage--wrapper']">
        <img
            data-test-id="content-card-background-image"
            :class="$style['c-content-cardImage']"
            :src="backgroundImageUrl"
            alt="hey">
        <img
            data-test-id="content-card-restaurant-logo"
            :class="$style['c-content-cardLogo']"
            :src="restaurantLogoUrl"
            alt="">
    </div>
</template>

<script>
export default {
    props: {
        backgroundImageUrl: {
            type: String,
            required: true
        },
        restaurantLogoUrl: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$image-borderRadius: f.$radius-rounded-c;
$image-minHeight: 160px;
$image-logoWidth: 48px;

.c-content-cardImage--wrapper {
    overflow: hidden;
    position: relative;
}

.c-content-cardLogo {
    position: absolute;
    left: f.spacing(d);
    top: f.spacing(d);
    border-radius: $image-borderRadius;
    width: $image-logoWidth;
}

.c-content-cardImage {
    width: 100%;
    border-radius: $image-borderRadius;
    object-fit: cover;
    min-height: $image-minHeight;

    @include f.media('<=narrow') {
        border-radius: 0;
    }
}
</style>
