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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding-block: 0 f.spacing(d);
    padding-inline: f.spacing(b);

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus;
        position: absolute;

        &, &:after {
            inset-block-end: 0; // Prevent vertical scrollbar if it doesn't already exist
        }
    }
}

.reopen-link--greyBg {
    background-color: f.$color-container-strong;
}
</style>
