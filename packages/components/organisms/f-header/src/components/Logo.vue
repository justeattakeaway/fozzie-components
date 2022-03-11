<template>
    <component
        :is="wrapperComponent"
        :class="$style['c-logo']"
        v-bind="linkProperties">
        <component
            :is="iconComponent"
            :class="[
                $style['c-logo-img'],
                { [$style['c-logo-img--alt']]: isAltLogo }
            ]"
            :data-theme-logo="iconComponent"
            data-test-id="header-logo" />
    </component>
</template>

<script>
import {
    LogoJusteatIcon as JeLogo,
    LogoMenulogIcon as MlLogo,
    LogoJetHorizontalIcon as JetLogo
} from '@justeat/f-vue-icons';

export default {
    name: 'HeaderLogo',
    components: {
        JeLogo,
        MlLogo,
        JetLogo
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
        isLogoDisabled: {
            type: Boolean,
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
        linkAltText () {
            return `Go to ${this.companyName} homepage`;
        },
        linkProperties () {
            return this.isLogoDisabled ? {
                'data-test-id': 'disabled-wrapper-element'
            } : {
                'data-test-id': 'wrapper-element',
                'aria-label': this.linkAltText,
                href: '/',
                'data-trak': `{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${this.logoGtmLabel}"
                }`
            };
        },
        isAltLogo () {
            const isHighlight = this.headerBackgroundTheme === 'highlight';
            const isTransparent = this.headerBackgroundTheme === 'transparent';

            return isHighlight || (isTransparent && !this.isOpen);
        },
        wrapperComponent () {
            return this.isLogoDisabled ? 'span' : 'a';
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
        padding: spacing(d) 0;

        @include media('>mid') {
            justify-content: left;
            height: $header-height;
            padding: 20px 0;
        }
    }

    .c-logo-img {
        // default logo image height (as should be an inline SVG)
        width: auto;
        height: 24px;
        margin-left: -10.5px; //half of hamburger menu width

        @include media('>mid') {
            height: 40px;
            margin-left: 0;
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
