<template>
    <div>
        <slot name="icon" />
        <a
            v-bind="$attrs"
            :data-trak="JSON.stringify(dataTrak)"
            :href="href"
            :class="[
                $style['c-navLink'],
                { [$style['c-navLink-borderBottom']]: hasBorderBottom },
                { [$style['c-navLink-borderTop']]: hasBorderTop },
                { [$style['c-navLink-country-link']]: isCountryLink },
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

        isCountryLink: {
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

.c-navLink {
    text-decoration: none;
    color: $nav-text-color;
    font-size: $nav-text-size;

    @include media('<=mid') {
        display: flex;
        margin-left: spacing(h);
        padding: spacing(c) spacing(d) spacing(c) 0;
    }

    @include media('>mid') {
        font-weight: $nav-text-weight;
        margin: 0;
        padding: 0;
    }

    &:hover,
    &:focus,
    &:active {
        text-decoration: none;

        @include media('<=mid') {
            font-weight: $font-weight-bold;
        }

        @include media('>mid') {
            color: $nav-text-color--hover;
            text-decoration: underline;

            .c-header--transparent .c-nav-popoverList & {
                color: inherit;
            }
        }
    }
}

.c-navLink-borderTop {
    @include media('<=mid') {
        border-top: 1px solid $color-border-default;
    }
}

.c-navLink-borderBottom {
    @include media('<=mid') {
        border-bottom: 1px solid $color-border-default;
    }
}

.c-navLink-country-link {
    @include media('>mid') {
        text-decoration: none;
        display: flex;
        float: center;
        margin-left: spacing(h);
        padding: spacing(c) spacing(d) spacing(c) 0;
        @include font-size($nav-text-size);
        font-weight: $font-weight-regular;
    }
    &:hover {
        text-decoration: none;
        font-weight: $font-weight-regular;
    }
}
</style>
