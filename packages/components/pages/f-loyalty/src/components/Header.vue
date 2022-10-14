<template>
    <div :class="$style['c-loyaltyHeader']">
        <div :class="$style['c-loyaltyHeader-container']">
            <bread-crumbs :links="links" />
            <media-element
                :class="$style['c-loyaltyHeader-media']"
                :text-size="getFontSizeBasedOnScreenSize"
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

// this is used to define point at which image is swapped
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
                url: '/',
                routerLink: false
            },
            {
                name: 'For You',
                url: '/offers',
                routerLink: true
            },
            {
                name: 'StampCards',
                url: '/offers/stamp-cards',
                routerLink: true
            }
        ],
        fontSize: 'lg',
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-loyaltyHeader-container {
    width: 100%;
    max-width: #{f.$layout-max-width}px;
    margin: 0 auto;
    padding: 0 #{f.$layout-margin}px;

    @include f.media('<mid') {
        padding: #{f.$layout-margin--mid}px;
    }

    @include f.media('<narrow') {
        padding: #{f.$layout-margin--narrow}px;
    }
}

.c-loyaltyHeader {
    padding: f.spacing() 0 f.spacing(h) 0;
    background-color: f.$color-container-default;
    border-bottom: 1px solid f.$color-border-subtle;
}

.c-loyaltyHeader-media {
    @include f.media('<=narrowMid') {
        margin-top: f.spacing();
    }
}
</style>
