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
.reopen-link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 0 spacing() spacing(x2);
}

.reopen-link--greyBg {
    background-color: $color-container-strong;
}
</style>
