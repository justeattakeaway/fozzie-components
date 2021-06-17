<template>
    <div
        :class="$style['c-noResults-wrapper']"
    >
        <media-element
            :title="$t('noResults.title')"
            :text="$t('noResults.subtitle')"
            image-url="https://d30v2pzvrfyzpo.cloudfront.net/a/hw/img/decoration/oi_no-results-image.svg"
            :image-align="imageAlign"
            :text-size="textSize"
        >
            <search-box :class="$style['c-noResults-searchBox']" />
            <f-button
                :class="$style['c-noResults-link']"
                button-type="link"
                button-size="xsmall"
                :href="$t('termsAndConditionsLinkUrl')"
            >
                {{ $t('termsAndConditionsLinkText') }}
            </f-button>
        </media-element>
    </div>
</template>

<script>
import MediaElement from '@justeat/f-media-element';
import FButton from '@justeat/f-button';
import '@justeat/f-media-element/dist/f-media-element.css';
import { ALIGN, FONT_SIZE } from '@justeat/f-media-element/src/constants';
import SearchBox from './SearchBox.vue';

export default {
    name: 'OffersNoResults',

    components: {
        MediaElement,
        FButton,
        SearchBox
    },

    data: () => ({
        imageAlign: ALIGN.RIGHT,
        textSize: FONT_SIZE.LG
    })
};
</script>

<style lang="scss" module>
.c-noResults-wrapper {
    width: 100%;
    background: $color-grey-20;
    padding: spacing(x4) spacing(x5);

    & .c-noResults-link {
        padding: 0;
    }

    & .c-noResults-searchBox {
        padding-top: spacing(x2);
        & input {
            background-color: $color-white;
        }
    }

}
</style>
