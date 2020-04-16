<template>
    <a
        :aria-label="linkAltText"
        href="/"
        class="c-logo"
        :data-trak='`{
            "trakEvent": "click",
            "category": "engagement",
            "action": "header",
            "label": "${logoGtmLabel}"
        }`'>
        <component
            :is="iconComponent"
            :class="['c-logo-img',
                     iconClassName,
                     logoColourModifier]"
            :data-js-test="iconClassName" />
    </a>
</template>

<script>
import {
    JeLogoNoColourIcon as JeLogo,
    MlLogoIcon as MlLogo
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
        }
    },
    computed: {
        iconComponent () {
            return `${this.theme}-logo`;
        },
        iconClassName () {
            return `c-icon--${this.theme}`;
        },
        linkAltText () {
            return `Go to ${this.companyName} homepage`;
        },
        logoColourModifier () {
            return (this.headerBackgroundTheme === 'transparent' || this.headerBackgroundTheme === 'red') && this.theme === 'je' ? 'c-icon-je--alt' : '';
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

    // link with the logo
    .c-logo {
        display: block;
        display: flex;
        justify-content: center;
        height: $header-height--narrow;
        padding-top: 22px;


        @include theme(ml) {
            padding-top: 12px;
        }

        @include media('>=mid') {
            justify-content: left;
            height: $header-height;
            padding-top: 24px;

            @include theme(ml) {
                padding-top: 10px;
            }
        }
    }

    .c-logo-img {
        // default logo image height and width (as should be an inline SVG)
        width: 82px;
        height: 16px;

        @include media('>=mid') {
            width: 165px;
            height: 32px;
        }

        // Menulog logo, as it has multiple fill values built in. We just hide the outline on transparent mode.
        @include theme(ml) {
            width: 118px;
            height: 40px;
            margin-left: -10.5px; //half of hamburger menu width

            @include media('>=mid') {
                width: 180px;
                height: 61px;
                margin-left: 0;
            }

            path:first-child {
                .c-header--transparent & {
                    display: none;
                }
            }
        }
    }

    .c-icon--je g {
        fill: $header-logo-color;
    }

    .c-icon-je--alt g {
        fill: $header-logo-color--alt;
    }
</style>
