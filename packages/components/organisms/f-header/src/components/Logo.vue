<template>
    <a
        :aria-label="linkAltText"
        href="/"
        :class="$style['c-logo']"
        :data-trak='`{
            "trakEvent": "click",
            "category": "engagement",
            "action": "header",
            "label": "${logoGtmLabel}"
        }`'>
        <component
            :is="iconComponent"
            :class="[
                $style['c-logo-img'],
                iconClassName,
                { [$style['c-logo-img--alt']]: isAltLogo }
            ]"
            :data-theme-logo="iconClassName"
            data-test-id="header-logo" />
    </a>
</template>

<script>
import {
    LogoJusteatIcon as JeLogo,
    LogoMenulogIcon as MlLogo
} from '@justeat/f-vue-icons';

export default {
    components: {
        JeLogo,
        MlLogo
    },
    props: {
        theme: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        logoGtmLabel: {
            type: String,
            default: ''
        },
        headerBackgroundTheme: {
            type: String,
            default: 'white'
        },
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconComponent () {
            return `${this.theme}-logo`;
        },
        iconClassName () {
            return this.$style[`c-icon--${this.theme}`];
        },
        linkAltText () {
            return `Go to ${this.companyName} homepage`;
        },
        isAltLogo () {
            const isHighlight = this.headerBackgroundTheme === 'highlight';
            const isTransparent = this.headerBackgroundTheme === 'transparent' && !this.isOpen;

            return isHighlight || isTransparent;
        }
    }
};
</script>

<style lang="scss" module>
    // link with the logo
    .c-logo {
        display: block;
        display: flex;
        justify-content: center;
        height: $header-height--narrow;
        padding-top: 12px;

        @include theme(ml) {
            padding-top: 8px;
        }

        @include media('>mid') {
            justify-content: left;
            height: $header-height;
            padding-top: 20px;

            @include theme(ml) {
                padding-top: 16px;
            }
        }
    }

    .c-logo-img {
        // default logo image height and width (as should be an inline SVG)
        width: 98px;
        height: 24px;
        margin-left: -10.5px; //half of hamburger menu width

        @include media('>mid') {
            width: 163px;
            height: 40px;
            margin-left: 0;
        }

        // Menulog logo, as it has multiple fill values built in. We just hide the outline on transparent mode.
        @include theme(ml) {
            width: 120px;
            height: 32px;

            @include media('>mid') {
                width: 149px;
                height: 41px;
            }

            path:first-child {
                .c-header--transparent & {
                    display: none;
                }
            }
        }
    }

    .c-logo-img {
        & g,
        & path {
            fill: $header-logo-color;
        }
    }

    // White logo on highlights background
    .c-logo-img--alt {
            & g,
            & path {
                fill: $header-logo-color--alt;
            }
    }
</style>
