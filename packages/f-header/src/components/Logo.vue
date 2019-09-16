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
            :class="[iconClassName, isTransparent && iconComponent === 'je-logo' ? 'c-icon-je--transparentBg' : '']"
            class="c-logo-img"
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
        isTransparent: {
            type: Boolean,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        logoGtmLabel: {
            type: String,
            default: ''
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
        }
    }
};
</script>

<style lang="scss">
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

    .c-icon-je--transparentBg g {
        fill: $header-logo-color--transparent;
    }
</style>
