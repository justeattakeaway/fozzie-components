<template>
    <div :class="$style['c-loyaltyHeader']">
        <div :class="$style['c-loyaltyHeader-container']">
            <bread-crumbs
                :links="links"
                :router-links="true" />
            <media-element
                :class="$style['c-loyaltyHeader-media']"
                :text-size="fontSize"
                :title="$t('header.title')"
                :text="$t('header.text')"
                :image-url="getImageBasedOnScreenSize"
                image-align="center"
                :flex="flexLayout"
                :alt="$t('header.alt')"
            />
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '@justeat/f-breadcrumbs';
import MediaElement from '@justeat/f-media-element';
import '@justeat/f-media-element/dist/f-media-element.css';
import '@justeat/f-breadcrumbs/dist/f-breadcrumbs.css';
import debounce from 'lodash.debounce';
import { FONT_SIZE } from '@justeat/f-media-element/src/constants';

const REQUIRED_WINDOW_WIDTH = 600;
const TEMP_IMG_PATH = 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/';

export default {
    name: 'StampcardsHeader',

    components: {
        BreadCrumbs,
        MediaElement
    },

    data: () => ({
        links:  [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'For You',
                url: '/offers'
            },
            {
                name: 'StampCards',
                url: '/offers/stamp-cards'
            }
        ],
        fontSize: FONT_SIZE.LG,
        windowWidth: REQUIRED_WINDOW_WIDTH
    }),

    computed: {
        /**
         * Returns the image based on the current window size
         * @returns {string}
         */
        getImageBasedOnScreenSize () {
            return this.windowWidth >= REQUIRED_WINDOW_WIDTH
                ? `${TEMP_IMG_PATH}stampcards-header-${this.$t('percentage')}.svg`
                : `${TEMP_IMG_PATH}stampcards-header-small.svg`;
        },

        /**
         * Sets the media element font size based on the current screen size
         * @returns {string}
         */
        getFontSizeBasedOnScreenSize () {
            return this.windowWidth >= REQUIRED_WINDOW_WIDTH
                ? 'xl' : 'md';
        },

        flexLayout () {
            return {
                default: {
                    column: false,
                    reverse: false
                }
            };
        }
    },

    destroyed () {
        if (process.browser) window.removeEventListener('resize', this.handleResize);
    },

    mounted () {
        if (process.browser) window.addEventListener('resize', debounce(this.handleResize, 300));
        this.handleResize();
    },

    methods: {
        /**
         * Handles the window resize callback
         */
        handleResize () {
            this.windowWidth = process.browser && window.innerWidth;
        }
    }
};
</script>

<style lang="scss" module>

$responsive-mobileViewBreakpoint: '<=narrowMid';

.c-loyaltyHeader-container {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: 0 auto;
    padding: #{$layout-margin}px;

    @include media('<mid') {
        padding: #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding: #{$layout-margin--narrow}px;
    }
}

.c-loyaltyHeader {
    padding: spacing() 0 spacing(x6) 0;
    background-color: $color-container-default;
    border-bottom: 1px solid $color-grey-20;
}

.c-loyaltyHeader-media {
    @include media($responsive-mobileViewBreakpoint) {
        margin-top: spacing();
    }
}
</style>
