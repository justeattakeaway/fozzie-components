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
@import '../../../src/assets/scss/card-styles';

.c-stampCardPromotion1 {
    @include card-container;

    position: relative;
    border: none;

    @include media('>narrowMid') {
        max-width: 344px;
        border-radius: 2px;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.03),
            0px 3px 1px -2px rgba(0, 0, 0, 0.07),
            0px 1px 5px 0px rgba(0, 0, 0, 0.06);
    }

    @include media('>mid') {
        max-width: 392px;
    }
}

.c-stampCardPromotion1-body {
    flex-grow: 1;
}

.c-stampCardPromotion1-bgImg {
    @include card-bg-image;
}

.c-stampCardPromotion1-img {
    display: block;
    width: 100%;
    border-radius: $border-radius $border-radius 0 0;
}

.c-stampCardPromotion1-icon {
    position: absolute;
    top: spacing(x2);
    left: spacing(x2);
    margin: 0;
    border-radius: $border-radius;
    border: 0.5px solid $grey--light;

    @include media('>narrowMid') {
        top: spacing(x1.5) - 2px;
    }
}

.c-stampCardPromotion1-info {
    padding: spacing(x2);
    background-color: $white;
    position: static;
    display: block;
    text-align: left;
    min-height: 0;

    margin-top: - spacing(x3);
    margin-left: spacing(x2);
    margin-right: spacing(x2) - 1px;
    border-radius: $border-radius;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.03),
    0px 3px 1px -2px rgba(0, 0, 0, 0.07),
    0px 1px 5px 0px rgba(0, 0, 0, 0.06);

    @include media ('>narrowMid') {
        margin: 0 0 0 0;
        box-shadow: none;
    }
}

.c-stampCardPromotion1-title {
     @include font-size(subheading-s, false, narrow);

     @include media ('>narrowMid') {
         @include font-size(subheading-s, false);
     }
}

.c-stampCardPromotion1-statusText {
    @include font-size(body-s);

    margin-top: spacing(x0.5);

    @include media ('>narrowMid') {
        @include font-size('body-l', false);
    }
}

.c-stampCardPromotion1-link {
    @include font-size('body-l', false);
    text-decoration: none;
    font-weight: $font-weight-bold;
    margin-top: spacing();

    & {
        color: $color-link-default;
    }

    &:hover, &:focus {
        color: $color-link-hover;
    }

    &:active {
        color: $color-link-active;
    }
}

</style>
