<template>
    <component
        :is="wrapperComponent"
        :class="$style['c-logo']"
        v-bind="linkProperties">
        <component
            :is="iconComponent"
            :class="[
                $style['c-logo-img'],
                { [$style['c-logo-img--jet']]: theme === 'jet' && shouldResizeLogo },
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

import analyticsMixin from '../mixins/analytics.mixin';

export default {
    name: 'HeaderLogo',
    components: {
        JeLogo,
        MlLogo,
        JetLogo
    },

    mixins: [analyticsMixin],

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
        },
        shouldResizeLogo: {
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
                'data-trak': JSON.stringify({
                    trakEvent: 'click',
                    category: 'engagement',
                    action: 'header',
                    label: this.logoGtmLabel,
                    ...(this.globalTrackingContexts.length ? {
                        context: this.globalTrackingContexts
                    } : {})
                })
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

// link with the logo
    .c-logo {
        display: block;
        display: flex;
        justify-content: center;
        height: common.$header-height--narrow;
        padding: f.spacing(d) 0;

        &:focus,
        &:focus-visible {
            @extend %u-elementFocus;

            &, &:after {
                @include f.media('>mid') {
                    border-radius: common.$header-buttonFocus-borderRadius;
                }
            }
        }

        @include f.media('>mid') {
            justify-content: left;
            height: common.$header-height;
            padding: f.spacing(d) f.spacing(b);
        }
    }

    .c-logo-img {
        // default logo image height (as should be an inline SVG)
        width: auto;
        height: 24px;
        margin-left: -10.5px; //half of hamburger menu width

        @include f.media('>mid') {
            margin-left: 0;
            height: 40px;
        }
    }

    // resizes takeaway logo for tablets if delivery link and country selector are also visible
    .c-logo-img--jet {
        @include f.media('>mid') {
            @include f.media('<wide') {
                height: 35px;
            }

            // tablet
            @media screen and (max-width: 833px) {
                height: 25px;
                margin-top: f.spacing(b);
            }

            @include f.media('>wide') {
                height: 40px;
            }
        }
    }

    .c-logo-img {
        & g,
        & path {
            fill: common.$header-logo-color;
        }
    }

    // White logo on highlights background
    .c-logo-img--alt {
            & g,
            & path {
                fill: common.$header-logo-color--alt;
            }
    }
</style>
