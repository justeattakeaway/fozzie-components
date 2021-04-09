<template>
    <div :class="$style['l-container--relative']">
        <page-banner
            :src-set-wide="`${getHeroImage}bg-hero-wide.jpg`"
            :src-set-mid="`${getHeroImage}bg-hero-mid.jpg`"
            :src-set-narrow="`${getHeroImage}bg-hero-narrow.jpg`" />

        <search-box
            :locale="locale"
            :copy-override="{
                headlineTitle: copy.statusBannerContent.searchboxHeading,
                headlineSubtitle: copy.statusBannerContent.searchboxSubHeading
            }"
            data-test-id="banner-search-box"
            :class="$style['c-search-wrapper']" />
    </div>
</template>

<script>
import SearchBox from '@justeat/f-searchbox';
import '@justeat/f-searchbox/dist/f-searchbox.css';
import {
    loadAnalyticsAccount,
    dataLayerPushPageData,
    trackMenuWebPageExperiment
} from '../services/analytics.service';
import PageBanner from './PageBanner.vue';

export default {
    components: {
        SearchBox,
        PageBanner
    },

    props: {
        locale: {
            type: String,
            default: ''
        },

        copy: {
            type: Object,
            default: () => {}
        },

        baseHeroUrl: {
            type: String,
            default: ''
        }
    },

    computed: {
        getHeroImage () {
            const localeToLowercase = this.locale.toLowerCase();

            return `${this.baseHeroUrl}${localeToLowercase}/`;
        }
    },

    mounted () {
        loadAnalyticsAccount();
        trackMenuWebPageExperiment();
        dataLayerPushPageData(this.locale);
    }
};
</script>

<style lang="scss" module>
@include media-context(('narrow-mid': 620px)) {
    .l-container--relative {
        position: relative;
        padding-bottom: 195px;
        margin-bottom: 20px;

        @include media('>=tiny') {
            padding-bottom: 185px;
        }

        @include media('>=narrow') {
            padding-bottom: 160px;
        }

        @include media('>=mid') {
            padding-bottom: 50px;
        }
    }

    .c-search-wrapper {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: translate(50%, 0);
        z-index: 1;
    }
}
</style>
