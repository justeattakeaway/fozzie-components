<template>
    <a
        v-bind="$attrs"
        :data-trak="JSON.stringify(dataTrak)"
        :href="href"
        :class="[
            { [$style['c-navLink']]: !isCountryLink },
            { [$style['c-navLink--countryLink']]: isCountryLink },
            { [$style['c-nav-list-link--alt']]: isAltColour },
            { [$style['c-navLink--whiteBackground']]: backgroundTheme === 'white' },
            { [$style['c-nav-list-link--transparent']]: backgroundTheme === 'transparent' },
            { [$style['c-navLink--countryLink']]: isCountryLink }
        ]">
        <slot name="icon" />
        <span
            :class="[
                { [$style['c-navLink--textWithIcon']]: slotPassed & !isCountryLink },
                { [$style['c-navLink--textWithoutIcon']]: !slotPassed },
                { [$style['c-navLink--borderBottomBelowMid']]: hasBorderBottom },
                { [$style['c-navLink--borderTopBelowMid']]: hasBorderTop }]">
            {{ text }}</span>
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
        // adds extra margin where icon is not passed
        slotPassed () {
            return this.$slots.icon && this.$slots.icon.length;
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
            outline-color: $color-focus;
            border-radius: 0;
        }
    }

    @include media('>mid') {
        font-weight: $nav-text-weight;
        margin-top: spacing(d);
        margin-bottom: spacing(d);
        padding: spacing(c) spacing(c);
        display: flex;

        &:focus {
            outline-color: $color-focus;
            border-radius: 800px;
        }
    }
}

.c-navLink--whiteBackground {
    @include media('<=mid') {
        &:hover {
            background: $color-container-subtle;
        }

        &:active {
            background: $color-container-strong;
        }
    }

    @include media('>mid') {
        &:hover {
            background: $color-container-subtle;
            border-radius: 800px;
            text-decoration: none;
        }

        &:active {
            background: $color-container-strong;
            border-radius: 800px;
            text-decoration: none;
        }
    }
}

.c-navLink--textWithIcon, .c-navLink--textWithoutIcon {
        @include media('<=mid') {
            width: 100vw;
            padding: spacing(c) spacing(d) spacing(c) 0;
        }
}

.c-navLink--textWithoutIcon {
    @include media('<=mid') {
        margin-left: spacing(h);
    }
}

.c-navLink--textWithIcon {
    @include media('<=mid') {
        margin-left: spacing(c);
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

.c-navLink--borderTopBelowMid {
    @include media('<=mid') {
        border-top: 1px solid $color-border-default;
    }
}

.c-navLink--borderBottomBelowMid {
    @include media('<=mid') {
        border-bottom: 1px solid $color-border-default;
    }
}
</style>
