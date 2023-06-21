<template>
    <a
        href="#"
        :class="['o-link--bold', $style['reopen-link'], { [$style['reopen-link--greyBg']]: useGreyBackground }]"
        @click.prevent="reopenBanner">{{ message }}
    </a>
</template>

<script>
export default {
    name: 'ReopenBannerLink',
    props: {
        message: {
            type: String,
            default: ''
        },
        useGreyBackground: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        reopenBanner () {
            this.$emit('reopenBanner');
        }
    }
};
</script>

<style module lang="scss">
@use '@justeat/fozzie/src/scss/fozzie' as f;

.reopen-link {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 0 f.spacing(b) f.spacing(d);

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus--borderless;
        position: relative;

        &, &:after {
            // Prevent scrollbars from appearing if they don't already exist
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
}

.reopen-link--greyBg {
    background-color: f.$color-container-strong;
}
</style>
