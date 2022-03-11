<template>
    <div>
        <slot
            name="icon" />
        <button
            type="button"
            v-bind="$attrs"
            :data-trak="JSON.stringify(dataTrak)"
            :class="[
                $style['c-nav-list-link'],
                { [$style['c-nav-list-link--alt']]: isAltColour },
                { [$style['c-nav-list-link-with-border']]: hasBorderBottom },
                { [$style['c-nav-list-link--transparent']]: backgroundTheme === 'transparent' }
            ]">
            {{ text }}
            <br>
            {{ subText }}
        </button>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,

    props: {
        dataTrak: {
            type: Object,
            default: () => undefined
        },

        text: {
            type: String,
            required: true
        },

        subText: {
            type: String,
            required: false,
            default: null
        },

        leftPaddingBelowMid: {
            type: Boolean,
            default: false
        },

        isAltColour: {
            type: Boolean,
            default: false
        },

        backgroundTheme: {
            type: String,
            default: 'white'
        },

        hasBorderBottom: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';
    .u-showBelowMid {
        margin-left: 0px !important;
        padding-left: 0px !important;
        @include media('>mid') {
            display: none !important;
        }
    }
</style>
