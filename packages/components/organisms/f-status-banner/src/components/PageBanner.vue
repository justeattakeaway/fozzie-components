<template>
    <div
        :class="[
            [$style['c-pageBanner']],
            [$style['c-pageBanner--tall']]
        ]"
        data-test-id="banner-image">
        <picture>
            <source
                :srcset="srcSetWide"
                :class="$style['c-pageBanner-img']"
                media="(min-width: 860px)">
            <source
                :srcset="srcSetMid"
                :class="$style['c-pageBanner-img']"
                media="(min-width: 600px)">
            <img
                :srcset="srcSetNarrow"
                :class="$style['c-pageBanner-img']"
                alt="">
        </picture>
    </div>
</template>

<script>
export default {
    props: {
        srcSetWide: {
            type: String,
            default: ''
        },
        srcSetMid: {
            type: String,
            default: ''
        },
        srcSetNarrow: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>
@include pageBanner();
</style>
