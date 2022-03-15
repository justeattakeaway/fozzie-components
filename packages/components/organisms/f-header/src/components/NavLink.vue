<template>
    <div>
        <slot name="icon" />
        <a
            v-bind="$attrs"
            :data-trak="JSON.stringify(dataTrak)"
            :href="href"
            :class="[
                $style['c-nav-list-link'],
                { [$style['c-nav-list-link--alt']]: isAltColour },
                { [$style['c-nav-list-link--transparent']]: backgroundTheme === 'transparent' }
            ]">

            {{ text }}
            <br>
            {{ subText }}
        </a>
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

        href: {
            type: String,
            required: true
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
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';
</style>
