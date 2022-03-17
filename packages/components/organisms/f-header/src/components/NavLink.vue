<template>
    <div>
        <slot name="icon" />
        <a
            v-bind="$attrs"
            :data-trak="JSON.stringify(dataTrak)"
            :href="href"
            :class="[
                $style['c-nav-list-link'],
                { [$style['c-nav-list-link-withBorderBottom']]: hasBorderBottom },
                { [$style['c-nav-list-link-withBorderTop']]: hasBorderTop },
                { [$style['c-nav-list-link--alt']]: isAltColour },
                { [$style['c-nav-list-link--transparent']]: backgroundTheme === 'transparent' }
            ]">

            {{ text }}
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

        hasBorderTop: {
            type: Boolean,
            default: false
        },

        hasBorderBottom: {
            type: Boolean,
            default: true
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
