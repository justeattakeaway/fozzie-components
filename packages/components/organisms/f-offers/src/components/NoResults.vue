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
import '@justeat/f-card/dist/f-card.css';
import '@justeat/f-media-element/dist/f-media-element.css';
import { ALIGN, FONT_SIZE } from '@justeat/f-media-element/src/constants';

export default {
    name: 'OffersNoResults',

    components: {
        MediaElement,
        FButton
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
        padding: spacing(x2) 0;
    }

}
</style>
