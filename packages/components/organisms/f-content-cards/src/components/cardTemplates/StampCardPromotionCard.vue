<template>
    <card-case
        :card="card"
        :class="[$style['c-stampCardPromotion1']]"
        :data-test-id="testId">
        <div
            :class="[{ [$style['c-stampCardPromotion1-bgImg']]: !!card.image }]">
            <img
                :class="$style['c-stampCardPromotion1-img']"
                :src="card.image"
                alt=""> <!-- Alt-text not relevant for image - would repeat title text for screenreaders -->
        </div>
        <div :class="[$style['c-stampCardPromotion1-info']]">
            <img
                v-if="card.icon"
                :class="[$style['c-stampCardPromotion1-icon']]"
                :src="card.icon"
                :data-test-id="testIdForSection('icon')"
                alt=""> <!-- Alt-text not relevant for icon - would repeat title text for screenreaders -->
            <div :class="$style['c-stampCardPromotion1-body']">
                <h3
                    v-make-text-accessible
                    :class="[$style['c-stampCardPromotion1-title']]">
                    {{ card.title }}
                </h3>
                <p
                    v-make-text-accessible
                    :class="[$style['c-stampCardPromotion1-statusText']]"
                >
                    {{ card.subtitle }}
                </p>
                <p
                    v-if="card.url"
                    :class="[
                        'o-link--full',
                        'o-link--bold',
                        'u-color-link',
                        'u-text-left',
                        $style['c-stampCardPromotion1-link']
                    ]"
                    :data-test-id="testIdForSection('link')">
                    {{ card.ctaText }}
                </p>
            </div>
        </div>
    </card-case>
</template>

<script>
import CardCase from './CardCase.vue';
import makeTextAccessible from '../MakeTextAccessible';

export default {
    name: 'StampCardPromotionCard',

    components: {
        CardCase
    },

    directives: {
        makeTextAccessible
    },

    props: {
        card: {
            type: Object,
            required: true
        },

        testId: {
            type: String,
            default: null
        }
    },

    computed: {
        testIdForSection () {
            return section => this.testId && `${this.testId}-${section}`;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$stampCard-promo-shadow: f.$elevation-01;

.c-stampCardPromotion1 {
    @include common.card-container;

    position: relative;
    border: none;

    @include f.media('>narrowMid') {
        max-width: 344px;
        border-radius: f.$radius-rounded-c;
        box-shadow: $stampCard-promo-shadow;
    }

    @include f.media('>mid') {
        max-width: 392px;
    }
}

.c-stampCardPromotion1-body {
    flex-grow: 1;
}

.c-stampCardPromotion1-bgImg {
    @include common.card-bg-image;
}

.c-stampCardPromotion1-img {
    display: block;
    width: 100%;
    border-radius: f.$radius-rounded-c f.$radius-rounded-c 0 0;
}

.c-stampCardPromotion1-icon {
    position: absolute;
    top: f.spacing(d);
    left: f.spacing(d);
    margin: 0;
    border-radius: f.$radius-rounded-c;
    border: 0.5px solid f.$color-border-default;

    @include f.media('>narrowMid') {
        top: f.spacing(c) - 2px;
    }
}

.c-stampCardPromotion1-info {
    padding: f.spacing(d);
    background-color: f.$color-container-default;
    position: static;
    display: block;
    text-align: left;
    min-height: 0;

    margin-top: - f.spacing(e);
    margin-left: f.spacing(d);
    margin-right: f.spacing(d) - 1px;
    border-radius: f.$radius-rounded-c;
    box-shadow: $stampCard-promo-shadow;

    @include f.media ('>narrowMid') {
        margin: 0;
        box-shadow: none;
    }
}

.c-stampCardPromotion1-title {
     @include f.font-size(subheading-s, false, narrow);

     @include f.media ('>narrowMid') {
         @include f.font-size(subheading-s, false);
     }
}

.c-stampCardPromotion1-statusText {
    @include f.font-size(body-s);

    margin-top: f.spacing(a);

    @include f.media ('>narrowMid') {
        @include f.font-size('body-l', false);
    }
}

.c-stampCardPromotion1-link {
    @include f.font-size('body-l', false);
    text-decoration: none;
    font-weight: f.$font-weight-bold;
    margin-top: f.spacing();

    & {
        color: f.$color-content-link;
    }

    &:hover, &:focus {
        color: darken(f.$color-content-link, f.$color-hover-01);
    }

    &:active {
        color: darken(f.$color-content-link, f.$color-active-01);
    }
}
</style>
