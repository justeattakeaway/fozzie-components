<template>
    <div>
        <h2 :class="$style['c-howItWorks-title']">
            {{ $t('howItWorks.title') }}
        </h2>

        <p :class="$style['c-howItWorks-text']">
            {{ $t('howItWorks.text') }}
        </p>

        <h3 :class="$style['c-howItWorks-exampleTitle']">
            {{ $t('howItWorks.exampleSection.title') }}
        </h3>

        <f-card
            :aria-label="$t('howItWorks.exampleSection.accessibilityText')"
            role="img"
            has-outline>
            <div
                :class="$style['c-howItWorks-example']">
                <div :class="$style['c-howItWorks-example-explanation']">
                    <div :class="$style['c-howItWorks-example-orders']">
                        <h3 :class="$style['c-howItWorks-example-orders-title']">
                            {{ $t('howItWorks.exampleSection.orders') }}
                        </h3>
                        <div :class="$style['c-howItWorks-example-orders-contentWrapper']">
                            <div
                                v-for="{ number, image } in bags"
                                :key="number"
                                :class="$style['c-howItWorks-example-order']">
                                <div :class="$style['c-howItWorks-example-order-number']">
                                    {{ number }}
                                </div>
                                <img
                                    :class="$style['c-howItWorks-example-order-image']"
                                    :src="image"
                                    alt="">
                            </div>
                        </div>
                    </div>
                    <div :class="$style['c-howItWorks-example-percentages']">
                        <h3 :class="$style['c-howItWorks-example-percentages-title']">
                            {{ $t('howItWorks.exampleSection.percentage') }}
                        </h3>
                        <div :class="$style['c-howItWorks-example-percentages-wrapper']">
                            <template v-for="({ value }, i) in bags">
                                <p
                                    :key="`${i}_percent`"
                                    :class="$style['c-howItWorks-example-percentages-value']">
                                    {{ value }}
                                </p>
                                <p
                                    v-if="i < (bags.length - 1)"
                                    :key="`${i}_percent_icon_plus`"
                                    :class="$style['c-howItWorks-example-percentages-icon']">
                                    +
                                </p>
                                <p
                                    v-else
                                    :key="`${i}_percent_icon_equals`"
                                    :class="$style['c-howItWorks-example-percentages-icon']">
                                    =
                                </p>
                            </template>
                        </div>
                    </div>
                </div>
                <div :class="$style['c-howItWorks-example-total']">
                    <p :class="$style['c-howItWorks-example-total-text']">
                        {{ $t('howItWorks.exampleSection.total') }}
                    </p>
                    <h3 :class="$style['c-howItWorks-example-total-price']">
                        {{ total }}
                    </h3>
                </div>
            </div>
        </f-card>

        <h3 :class="$style['c-howItWorks-mediaTitle']">
            {{ $t('howItWorks.media.title') }}
        </h3>

        <div :class="$style['c-howItWorks-mediaWrapper']">
            <template v-for="({ title, text, image }, i) in mediaCards">
                <f-card
                    :key="i"
                    has-outline>
                    <media-element
                        role="presentation"
                        :title="title"
                        :text="text"
                        :flex="flexLayout"
                        content-align="center"
                        image-align="center"
                        text-size="md"
                        :image-url="image"
                        :alt-text="title" />
                </f-card>
            </template>
        </div>

        <div :class="$style['c-stampcards-terms']">
            <a
                :class="$style['c-stampcards-terms-link']"
                data-test-id="terms-and-conditions"
                :href="$t('termsUrl')">
                {{ $t('termsText') }}
            </a>
        </div>
    </div>
</template>

<script>
import FCard from '@justeat/f-card';
import MediaElement from '@justeat/f-media-element';

const TEMP_IMG_PATH = 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/';

const formatAsCurrency = (amount, currencySymbol) => `${currencySymbol}${amount
    .toFixed(2)}`;

export default {
    name: 'HowItWorksLayout',

    components: {
        FCard,
        MediaElement
    },

    data: () => ({
        bagsData: [
            40,
            50,
            45,
            40,
            55
        ],
        flexLayout: {
            default: {
                column: true,
                reverse: true
            }
        }
    }),

    computed: {
        bags () {
            const currency = this.$t('currency');
            const currencySymbol = this.$t('currencySymbol');
            const percentage = this.$t('percentage');

            // _Very_ naive way of implementing ordinals but will suit our purposes here
            const ordinal = { 0: 'st', 1: 'nd', 2: 'rd' };

            return this.bagsData.map((bagValue, index) => ({
                number: `${index + 1}${ordinal[index] || 'th'}`,
                image: `${TEMP_IMG_PATH}${bagValue}-small-object-bag-${currency}.svg`,
                value: formatAsCurrency(bagValue * percentage * 0.01, currencySymbol)
                    .replace('.00', '') // remove zero pence/cents amounts for bag values
            }));
        },

        mediaCards () {
            const percentage = this.$t('percentage');

            return [
                {
                    title: this.$t('howItWorks.media.cards.order.title'),
                    text: this.$t('howItWorks.media.cards.order.text'),
                    image: `${TEMP_IMG_PATH}stampcards-complex-object-restaurant-promo.svg`
                },
                {
                    title: this.$t('howItWorks.media.cards.earn.title'),
                    text: this.$t('howItWorks.media.cards.earn.text'),
                    image: `${TEMP_IMG_PATH}stampcards-complex-object-login-promo-full-colour-${percentage}.svg`
                },
                {
                    title: this.$t('howItWorks.media.cards.collect.title'),
                    text: this.$t('howItWorks.media.cards.collect.text'),
                    image: `${TEMP_IMG_PATH}stampcards-complex-object-stampcard-colour-03-${percentage}-full.svg`
                },
                {
                    title: this.$t('howItWorks.media.cards.reward.title'),
                    text: this.$t('howItWorks.media.cards.reward.text'),
                    image: `${TEMP_IMG_PATH}stampcards-bag-order-refund.svg`
                }
            ];
        },

        total () {
            return formatAsCurrency(
                this.bagsData.reduce((sum, current) => sum + current, 0) * this.$t('percentage') * 0.01,
                this.$t('currencySymbol')
            );
        }
    }
};
</script>

<style lang="scss" module>
/*
==========================================================================
HOW IT WORKS SECTION
==========================================================================
*/

/* VARIABLES */

$exampleImages-padding-x: 18px;
$exampleImages-padding-x-wide: 10px;

$examplePercentages-line-width-sm: 250px;
$examplePercentages-line-width-md: 300px;
$examplePercentages-line-width-lg: 450px;
$examplePercentages-line-width-xl: 550px;

@mixin percentages-line {
    content: '';
    flex: 1;
    border-bottom: 1px solid $color-border-subtle;
}


/* MAIN */
.c-howItWorks-title {
    @include font-size(heading-l);
    margin-top: spacing(x3);
    margin-bottom: spacing();
}

.c-howItWorks-text {
    @include font-size(body-s);
    margin-bottom: spacing(x3);
}

.c-stampcards-appsHowItWorksContainer {
    padding-left: spacing(x4);
    padding-right: spacing(x4);

    @include media('<=wide') {
        padding-left: spacing(x2);
        padding-right: spacing(x2);
    }
}

/*
HOW IT WORKS SECTION: EXAMPLE SECTION
--------------------------------------------------------------------------
*/

.c-howItWorks-exampleTitle {
    @include font-size(heading-s);
    margin-bottom: spacing(x2);
}

.c-howItWorks-example {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: spacing();

    @include media('<=mid') {
        padding: 0;
    }

    @include media('<=wide') {
        flex-direction: column;
    }

    @include media('<=narrowMid') {
        padding: spacing(x0.5);
    }

    @include media('<=tiny') {
        padding: 0;
    }

}

.c-howItWorks-example-explanation {
    display: flex;
    flex-direction: column;
}

.c-howItWorks-example-orders {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    @include media('<=wide') {
        flex-direction: column;
    }

}

.c-howItWorks-example-orders-title {
    margin-right: spacing(x2);
    margin-top: spacing(x4);

    @include media('<=wide') {
        margin: 0;
    }
}

.c-howItWorks-example-orders-contentWrapper {
    display: flex;
    flex-direction: row;
    margin-right: spacing(x0.5);

    @include media('<=wide') {
        margin-top: spacing(x2);
        margin-right: 0;
    }
}

.c-howItWorks-example-order {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: spacing() $exampleImages-padding-x;

    @include media('<=mid') {
        padding: spacing() $exampleImages-padding-x-wide;
    }

    @include media('<=narrowMid') {
        padding: spacing();
    }

    @include media('<=tiny') {
        padding: spacing() spacing(x0.5);
    }

}

.c-howItWorks-example-order-number {
    padding: 2px spacing();
    background: $color-background-default;
    border-radius: spacing(x2);
    margin-bottom: spacing(x2);
    font-weight: $font-weight-bold;
    margin-left: spacing();

    @include media('<=narrowMid') {
        margin-left: 0;
    }

}

@include media('<=narrowMid') {
    .c-howItWorks-example-order-image {
        width: 45px;
    }
}


.c-howItWorks-example-percentages {
    display: flex;
    flex-direction: row;
    align-items: center;

    @include media('<=wide') {
        flex-direction: column;
    }
}

.c-howItWorks-example-percentages-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.c-howItWorks-example-percentages-title {
    @include font-size(body-s);
    margin-top: 0;
    flex-shrink: 0;
    margin-right: spacing(x2);
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: $font-weight-regular;

    @include media('<=wide') {
        width: $examplePercentages-line-width-xl;
        margin: spacing(x4) 0;

        &:before {
            @include percentages-line;
        }

        &:after {
            @include percentages-line;
        }

        &:not(:empty):before {
            margin-right: spacing(x2);
        }

        &:not(:empty):after {
            margin-left: spacing(x2);
        }
    }

    @include media('<=mid') {
        width: $examplePercentages-line-width-lg;
    }

    @include media('<=narrowMid') {
        width: $examplePercentages-line-width-md;
    }

    @include media('<=tiny') {
        width: $examplePercentages-line-width-sm;
    }

}

.c-howItWorks-example-percentages-value {
    padding: spacing() spacing(x5);
    margin-top: 0;
    font-weight: $font-weight-bold;

    @include media('<=mid') {
        padding: spacing() spacing(x4);
    }

    @include media('<=narrowMid') {
        padding: spacing();
    }

    @include media('<=tiny') {
        padding: spacing() spacing(x0.5);
    }

}

.c-howItWorks-example-percentages-icon {
    margin-top: 0;

    @include media('<=wide') {
        &:last-child {
            display: none;
        }
    }

}

.c-howItWorks-example-total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: spacing(x2) spacing(x4);
    background-color: $color-container-subtle;
    border-radius: 100%;
    width: 160px;
    height: 160px;
    text-align: center;
    margin-left: spacing(x3);

    @include media('<=wide') {
        background-color: transparent;
        margin: 0;
        width: 100%;
        height: auto;
    }

    @include media('<=narrowMid') {
        padding: spacing(x2) spacing();
    }

    @include media('<=tiny') {
        padding: spacing(x2) 0;
    }

}

.c-howItWorks-example-total-text {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 0;

    @include media('<=wide') {
        width: $examplePercentages-line-width-xl;

        &:before {
            @include percentages-line;
        }

        &:after {
            @include percentages-line;
        }

        &:not(:empty):before {
            margin-right: spacing(x2);
        }

        &:not(:empty):after {
            margin-left: spacing(x2);
        }
    }

    @include media('<=mid') {
        width: $examplePercentages-line-width-lg;
    }

    @include media('<=narrowMid') {
        width: $examplePercentages-line-width-md;
    }

    @include media('<=tiny') {
        width: $examplePercentages-line-width-sm;
    }

}

.c-howItWorks-example-total-price {
    color: $color-content-brand;
}

/*
HOW IT WORKS SECTION: MEDIA SECTION
--------------------------------------------------------------------------
*/

.c-howItWorks-mediaWrapper {
    margin-bottom: spacing();
    display: grid;
    grid-gap: spacing(x2);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto;

    :global(.c-mediaElement-img--override) {
        height: 120px;
    }
}

@include media('<=wide') {
    .c-howItWorks-mediaWrapper {
        display: grid;
        grid-gap: spacing(x2);
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }
}

@include media('<=narrow') {
    .c-howItWorks-mediaWrapper {
        display: grid;
        grid-gap: spacing(x2);
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
}

.c-howItWorks-mediaTitle {
    @include font-size(heading-l);
    margin-top: spacing(x6);
    margin-bottom: spacing(x3);
}

.c-stampcards-terms {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.c-stampcards-terms-link {
    margin: spacing(x3) 0;
    text-align: center;
    font-weight: $font-weight-bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
