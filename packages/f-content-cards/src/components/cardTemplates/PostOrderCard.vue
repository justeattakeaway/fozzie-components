<template>
    <div
        :data-test-id="testId"
        :class="['c-postOrderCard' , { 'c-postOrderCard--condensed': !image && icon }]">
        <h2
            v-if="title"
            class="c-postOrderCard-title"
            data-test-id="contentCard-postOrderCard-title"
        >
            {{ title }}
        </h2>
        <card-container
            :card="card"
            :container-title="containerTitle"
            :is-carousel="isCarousel"
            :data-test-id="containerTestId()">
            <span
                class="o-link--full o-link--bold u-color-link u-text-left"
                :data-test-id="cardContentTestId()">
                {{ ctaText }}
            </span>
        </card-container>
    </div>
</template>

<script>
import CardContainer from './CardContainer.vue';

export default {
    components: {
        CardContainer
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerTitle: {
            type: String,
            default: ''
        },
        isCarousel: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        testId: {
            type: String,
            default: null
        }
    },
    data () {
        const {
            extras = {},
            imageUrl,
            linkText
        } = this.card;
        const {
            button_1: button,
            custom_card_type: type,
            image_1: image,
            icon_1: icon
        } = extras;

        return {
            ctaText: button || linkText,
            icon,
            image: image || imageUrl,
            type
        };
    },

    methods: {
        cardContentTestId () {
            return this.testId && 'contentCard-postOrderCard-1';
        },
        containerTestId () {
            return this.testId && 'contentCard-link';
        }
    }
};
</script>

<style lang="scss" scoped>
    .c-postOrderCard {
        border: 1px solid $color-border;
        border-radius: $contentCardRadius;
        padding: spacing(x3);
        width: 100%;

        @include media ('<mid') {
            border: none;
            padding: 0;
        }

        .c-postOrderCard-title {
            @include font-size(large);

            margin-bottom: spacing(x2);

            @include media ('<mid') {
                margin: spacing(x2);
            }
        }

        /deep/ .c-contentCard-thumbnail {
            position: absolute;
            top: spacing(x2);
            left: spacing(x2);
            margin: 0;
            border: none;
        }

        /deep/ .c-contentCard-info {
            background: none;
            box-shadow: none;
            position: static;
            display: block;
            text-align: left;
            min-height: 0;
            padding: spacing(x3) 0 0 0;

            @include media ('<mid') {
                border: 1px solid $color-border;
                padding: spacing(x3);
                border-radius: 0 0 $contentCardRadius $contentCardRadius;
            }
        }

        /deep/ .c-contentCard-title {
            text-align: left;
            margin: 0 0 spacing(x2);
        }

        /deep/ .c-contentCard-subTitle {
            @include font-size(base);

            text-align: left;
            margin: 0;
        }

        /deep/ .c-contentCard {
            position: relative;
            margin: 0;
            padding: 0;
            max-width: 100%;
        }

        /deep/ .c-contentCard-bgImg {
            min-height: 250px;
            border-radius: $contentCardRadius;

            @include media ('<mid') {
                border-radius: $contentCardRadius $contentCardRadius 0 0;
            }
        }
    }

    .c-postOrderCard--condensed {
        /deep/ .c-contentCard-bgImg {
            display: none;
        }

        /deep/ .c-contentCard-thumbnail {
            left: 0;
            top: 0;

            @include media('<mid') {
                top: spacing(x2);
                left: spacing(x2);
            }
        }

        /deep/ .c-contentCard-info {
            padding: 0 0 0 spacing(x9);

            @include media('<mid') {
                position: relative;
                padding: spacing(x2) spacing(x2) spacing(x2) spacing(x9);
                border-radius: $contentCardRadius;
            }
        }
    }
</style>
