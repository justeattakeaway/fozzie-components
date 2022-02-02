<template>
    <div :class="$style['c-offerHeader-wrapper']">
        <div :class="$style['c-offerHeader-bg']" />
        <div :class="$style['c-offersHeader-container']">
            <media-element
                :class="$style['c-offersHeader-media']"
                :text-size="fontSize"
                :title="title"
                :text="subtitle"
                image-url="https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/oi_header-image_v2.svg"
                :image-align="imageAlign"
                :flex="flexLayout"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MediaElement from '@justeat/f-media-element';
import '@justeat/f-media-element/dist/f-media-element.css';
import { ALIGN, FONT_SIZE } from '@justeat/f-media-element/src/constants';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../store/types';

export default {
    name: 'OffersHeader',

    components: {
        MediaElement
    },

    data: () => ({
        fontSize: FONT_SIZE.LG,
        imageAlign: ALIGN.RIGHT
    }),

    computed: {
        ...mapGetters(VUEX_MODULE_NAMESPACE_OFFERS, [
            'isAuthenticated',
            'friendlyName'
        ]),

        flexLayout () {
            return {
                default: {
                    column: false,
                    reverse: false
                },
                modifier: {
                    rule: [
                        '<',
                        this.isAuthenticated ? 'narrowMid' : 'mid'
                    ],
                    column: true,
                    reverse: true
                }
            };
        },

        title () {
            if (this.isAuthenticated) {
                return this.friendlyName ? `${this.friendlyName},\n ${this.$t('authenticated.header.title')}` :
                    this.$t('authenticated.header.title');
            }
            return this.$t('unauthenticated.header.title');
        },

        subtitle () {
            return this.isAuthenticated ? this.$t('authenticated.header.subtitle')
                : this.$t('unauthenticated.header.subtitle');
        }
    }
};
</script>

<style lang="scss" module>

$header-height: 275px;

.c-offerHeader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    overflow: hidden;
    height: $header-height;
    background-color: $color-support-brand-02;

    & :global(.c-mediaElement-img--override) {
        width: 200px;
        position: absolute;
        top: -30px;

        @include media('<mid') {
            top: -35px;
            right: -10px;
        }

        @include media('>=mid') {
            width: auto;
            position: relative;
        }

        @include media('>=wide') {
            width: auto;
            position: relative;
            top: -5px;
        }
    }
}

.c-offerHeader-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background-color: $color-content-brand;
    transform: skewY(4.5deg);
    transform-origin: top right;

    @include media('>=narrow') {
        height: 45%;
    }

    @include media('>=narrowMid') {
        height: 47.5%;
    }

    @include media('>=mid') {
        height: 55%;
    }

    @include media('>=wide') {
        height: 70%;
    }

    @include media('>=huge') {
        height: 75%;
    }
}

.c-offersHeader-media {
    padding-top: spacing(j);
    position: relative;
    z-index: 1;
    top: 0;
}

.c-offersHeader-container {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: 0 auto;
    padding-left: #{$layout-margin}px;
    padding-right: #{$layout-margin}px;

    @include media('<mid') {
        padding-left: #{$layout-margin--mid}px;
        padding-right: #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding-left: #{$layout-margin--narrow}px;
        padding-right: #{$layout-margin--narrow}px;
    }
}
</style>
