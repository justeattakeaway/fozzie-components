<template>
    <a
        v-bind="$attrs"
        :data-trak="JSON.stringify(dataTrak)"
        :href="href"
        :class="[{
            [$style['c-navLink']]: !isPopoverLink,
            [$style['c-navLink--popoverLink']]: isPopoverLink,
            [$style['c-nav-list-link--alt']]: isAltColour,
            [$style['c-navLink--condensed']]: isCondensed,
            [$style['c-navLink--hoverWithWhiteBackground']]: backgroundTheme === 'white',
            [$style['c-nav-list-link--transparent']]: backgroundTheme === 'transparent'
        }]"
        @blur="onBlur"
        @focus="onFocus">
        <div
            v-if="hasIcon"
            :class="[$style['c-navLink-icon'], { [$style['u-hideOnMid']]: isCondensed }]">
            <slot name="icon" />
        </div>
        <span
            :class="[{
                [$style['c-navLink-text']]: !isPopoverLink,
                [$style['c-navLink-text--noIcon']]: !hasIcon,
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

        isPopoverLink: {
            type: Boolean,
            default: false
        },

        isCondensed: {
            type: Boolean,
            default: false
        },

        backgroundTheme: {
            type: String,
            default: 'white'
        },

        onBlur: {
            type: Function,
            default: () => {}
        },

        onFocus: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        // adds extra margin when link does not have an icon
        hasIcon () {
            return this.$slots.icon && this.$slots.icon.length;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-navLink {
    text-decoration: none;
    color: common.$nav-text-color;
    @include f.font-size(common.$nav-text-size);

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus;

        &, &:after {
            border-radius: 0;

            @include f.media('>mid') {
                border-radius: common.$nav-focus-borderRadius;
            }
        }
    }

    @include f.media('<=mid') {
        display: flex;
        width: 100%;

        &:hover {
            background: f.$color-container-subtle;
        }

        &:active {
            background: f.$color-container-strong;
        }
    }

    @include f.media('>mid') {
        font-weight: common.$nav-text-weight;
        margin: f.spacing(d) 0;
        padding: f.spacing(c) f.spacing(c);
        display: flex;
    }
}

.c-navLink-text {
    @include f.media('<=mid') {
        width: 100vw;
        padding: f.spacing(c) f.spacing(d) f.spacing(c) 0;
    }
}

.c-navLink-text--noIcon {
    @include f.media('<=mid') {
        margin-left: f.spacing(h);
    }
}

.c-navLink-text--borderTopBelowMid {
    @include f.media('<=mid') {
        border-top: 1px solid f.$color-border-default;
    }
}

.c-navLink-text--borderBottomBelowMid {
    @include f.media('<=mid') {
        border-bottom: 1px solid f.$color-border-default;
    }
}

.c-navLink--hoverWithWhiteBackground {
    @include f.media('>mid') {
        &:hover {
            background: f.$color-container-subtle;
            border-radius: common.$nav-focus-borderRadius;
        }

        &:active {
            background: f.$color-container-strong;
            border-radius: common.$nav-focus-borderRadius;
        }
    }
}

.c-navLink--popoverLink {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: f.spacing(c) f.spacing(d) f.spacing(c) 0;

    @include f.media('<=mid') {
        margin-left: 0;
    }

    @include f.media('>mid') {
        float: center;
        font-weight: f.$font-weight-regular;
    }

    &:hover {
        background: f.$color-container-subtle;
        border-radius: 0;
    }

    &:active {
        background: f.$color-container-strong;
        border-radius: 0;
    }

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus;

        &, &:after {
            border-radius: 0;
        }
    }
}

.c-navLink-icon {
    display: flex;
}

.c-navLink--condensed {
    $navLinkTweakpointMid: f.em(830);
    $navLinkTweakpointWide: f.em(1130);

    @include f.media('>mid', '<#{$navLinkTweakpointWide}') {
        padding-left: f.spacing(b);
        padding-right: f.spacing(b);
        margin-right: f.spacing(a);
    }
    @include f.media('>mid', '<#{$navLinkTweakpointMid}') {
        margin-right: 0;
    }
}
</style>
