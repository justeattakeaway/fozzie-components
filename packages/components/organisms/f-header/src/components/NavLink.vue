<template>
    <a
        v-bind="$attrs"
        :data-trak="JSON.stringify(dataTrak)"
        :href="href"
        :class="[{
            [$style['c-navLink']]: !isCountryLink,
            [$style['c-navLink--countryLink']]: isCountryLink,
            [$style['c-nav-list-link--alt']]: isAltColour,
            [$style['c-navLink--hoverWithWhiteBackground']]: isBackgroundThemeWhite,
            [$style['c-nav-list-link--transparent']]: isBackgroundThemeTransparent
        }]">
        <slot name="icon" />
        <span
            :class="[{
                [$style['c-navLink-text']]: !isCountryLink,
                [$style['c-navLink-text--withoutIcon']]: !hasIcon,
                [$style['c-navLink-text--borderBottomBelowMid']]: hasBorderBottom,
                [$style['c-navLink-text--borderTopBelowMid']]: hasBorderTop
            }]">
            {{ text }}
        </span>
    </a>
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

        isCountryLink: {
            type: Boolean,
            default: false
        },

        backgroundTheme: {
            type: String,
            default: 'white'
        }
    },
    computed: {
        // adds extra margin when link does not have an icon
        hasIcon () {
            return this.$slots.icon && this.$slots.icon.length;
        },

        isBackgroundThemeTransparent () {
            return this.backgroundTheme === 'transparent';
        },

        isBackgroundThemeWhite () {
            return this.backgroundTheme === 'white';
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

.c-navLink {
    text-decoration: none;
    color: $nav-text-color;
    font-size: $nav-text-size;

    @include media('<=mid'){
        display: flex;
        width: 100%;

        &:focus {
            outline-color: $nav-link-focus-color;
            border-radius: 0;
        }

        &:hover {
            background: $color-container-subtle;
        }

        &:active {
            background: $color-container-strong;
        }
    }

    @include media('>mid') {
        font-weight: $nav-text-weight;
        margin-top: spacing(d);
        margin-bottom: spacing(d);
        padding: spacing(c) spacing(c);
        display: flex;

        &:focus {
            outline-color: $nav-link-focus-color;
            border-radius: $nav-focus-borderRadius;
        }
    }
}

.c-navLink-text {
    @include media('<=mid') {
        width: 100vw;
        padding: spacing(c) spacing(d) spacing(c) 0;
        margin-left: spacing(c);
    }
}

.c-navLink-text--withoutIcon {
    @include media('<=mid') {
        margin-left: spacing(h);
    }
}

.c-navLink-text--borderTopBelowMid {
    @include media('<=mid') {
        border-top: 1px solid $color-border-default;
    }
}

.c-navLink-text--borderBottomBelowMid {
    @include media('<=mid') {
        border-bottom: 1px solid $color-border-default;
    }
}

.c-navLink--countryLink {
    display: block;
    text-decoration: none;
    padding: spacing(c) spacing(d) spacing(c) 0;

    @include media('<=mid') {
        margin-left: 0;
    }
    @include media('>mid') {
        float: center;
        font-weight: $font-weight-regular;
    }

    &:hover {
        background: $color-container-subtle;
    }

    &:active {
        background: $color-container-strong;
    }

    &:focus {
        outline-color: $color-focus;
        border-radius: 0;
    }
}

.c-navLink--hoverWithWhiteBackground {
    @include media('>mid') {
        &:hover {
            background: $color-container-subtle;
            border-radius: $nav-focus-borderRadius;
        }

        &:active {
            background: $color-container-strong;
            border-radius: $nav-focus-borderRadius;
        }
    }
}
</style>
