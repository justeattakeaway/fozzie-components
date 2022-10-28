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
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import tenantBagFees from '../tenantBagFees';

const formatAsCurrency = (amount, currencySymbol) => `${currencySymbol}${amount
    .toFixed(2)}`;

export default {
    name: 'HowItWorksLayout',

    components: {
        FCard,
        MediaElement
    },

    props: {
        locale: {
            type: String,
            default: ''
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        return {
            tenant: locale,
            flexLayout: {
                default: {
                    column: true,
                    reverse: true
                }
            }
        };
    },

    computed: {
        bags () {
            const currency = this.$t('currency');
            const currencySymbol = this.$t('currencySymbol');
            const percentage = this.$t('percentage');

            // _Very_ naive way of implementing ordinals but will suit our purposes here
            const ordinal = { 0: 'st', 1: 'nd', 2: 'rd' };

            return [...tenantBagFees(this.tenant)].map((bagValue, index) => ({
                number: `${index + 1}${ordinal[index] || 'th'}`,
                image: `${this.$t('howItWorks.imagePath')}bag-${currency}-${bagValue}.svg`,
                value: formatAsCurrency(bagValue * percentage * 0.01, currencySymbol)
                    .replace('.00', '') // remove zero pence/cents amounts for bag values
            }));
        },

        mediaCards () {
            return [
                {
                    title: this.$t('howItWorks.media.cards.order.title'),
                    text: this.$t('howItWorks.media.cards.order.text'),
                    image: this.$t('howItWorks.media.cards.order.image')
                },
                {
                    title: this.$t('howItWorks.media.cards.earn.title'),
                    text: this.$t('howItWorks.media.cards.earn.text'),
                    image: this.$t('howItWorks.media.cards.earn.image')
                },
                {
                    title: this.$t('howItWorks.media.cards.collect.title'),
                    text: this.$t('howItWorks.media.cards.collect.text'),
                    image: this.$t('howItWorks.media.cards.collect.image')
                },
                {
                    title: this.$t('howItWorks.media.cards.reward.title'),
                    text: this.$t('howItWorks.media.cards.reward.text'),
                    image: this.$t('howItWorks.media.cards.reward.image')
                }
            ];
        },

        total () {
            return formatAsCurrency(
                [...tenantBagFees(this.tenant)].reduce((sum, current) => sum + current, 0) * this.$t('percentage') * 0.01,
                this.$t('currencySymbol')
            );
        }
    }

};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

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
    border-bottom: 1px solid f.$color-border-subtle;
}


/* MAIN */
.c-howItWorks-title {
    @include f.font-size(heading-l);
    margin-top: f.spacing(e);
    margin-bottom: f.spacing();
}

.c-howItWorks-text {
    @include f.font-size(body-s);
    margin-bottom: f.spacing(e);
}

.c-stampcards-appsHowItWorksContainer {
    padding-left: f.spacing(f);
    padding-right: f.spacing(f);

    @include f.media('<=wide') {
        padding-left: f.spacing(d);
        padding-right: f.spacing(d);
    }
}

/*
HOW IT WORKS SECTION: EXAMPLE SECTION
--------------------------------------------------------------------------
*/

.c-howItWorks-exampleTitle {
    @include f.font-size(heading-s);
    margin-bottom: f.spacing(d);
}

.c-howItWorks-example {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: f.spacing();

    @include f.media('<=mid') {
        padding: 0;
    }

    @include f.media('<=wide') {
        flex-direction: column;
    }

    @include f.media('<=narrowMid') {
        padding: f.spacing(a);
    }

    @include f.media('<=tiny') {
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

    @include f.media('<=wide') {
        flex-direction: column;
    }

}

.c-howItWorks-example-orders-title {
    margin-right: f.spacing(d);
    margin-top: f.spacing(f);

    @include f.media('<=wide') {
        margin: 0;
    }
}

.c-howItWorks-example-orders-contentWrapper {
    display: flex;
    flex-direction: row;
    margin-right: f.spacing(a);

    @include f.media('<=wide') {
        margin-top: f.spacing(d);
        margin-right: 0;
    }
}

.c-howItWorks-example-order {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: f.spacing() $exampleImages-padding-x;

    @include f.media('<=mid') {
        padding: f.spacing() $exampleImages-padding-x-wide;
    }

    @include f.media('<=narrowMid') {
        padding: f.spacing();
    }

    @include f.media('<=tiny') {
        padding: f.spacing() f.spacing(a);
    }

}

.c-howItWorks-example-order-number {
    padding: 2px f.spacing();
    background: f.$color-background-default;
    border-radius: f.spacing(d);
    margin-bottom: f.spacing(d);
    font-weight: f.$font-weight-bold;
    margin-left: f.spacing();

    @include f.media('<=narrowMid') {
        margin-left: 0;
    }

}

.c-howItWorks-example-order-image {
    width: 88px;

    @include f.media('<=narrowMid') {
        width: 45px;
    }
}

.c-howItWorks-example-percentages {
    display: flex;
    flex-direction: row;
    align-items: center;

    @include f.media('<=wide') {
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
    @include f.font-size(body-s);
    margin-top: 0;
    flex-shrink: 0;
    margin-right: f.spacing(d);
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: f.$font-weight-regular;

    @include f.media('<=wide') {
        width: $examplePercentages-line-width-xl;
        margin: f.spacing(f) 0;

        &:before {
            @include percentages-line;
        }

        &:after {
            @include percentages-line;
        }

        &:not(:empty):before {
            margin-right: f.spacing(d);
        }

        &:not(:empty):after {
            margin-left: f.spacing(d);
        }
    }

    @include f.media('<=mid') {
        width: $examplePercentages-line-width-lg;
    }

    @include f.media('<=narrowMid') {
        width: $examplePercentages-line-width-md;
    }

    @include f.media('<=tiny') {
        width: $examplePercentages-line-width-sm;
    }

}

.c-howItWorks-example-percentages-value {
    padding: f.spacing() f.spacing(g);
    margin-top: 0;
    font-weight: f.$font-weight-bold;

    @include f.media('<=mid') {
        padding: f.spacing() f.spacing(f);
    }

    @include f.media('<=narrowMid') {
        padding: f.spacing();
    }

    @include f.media('<=tiny') {
        padding: f.spacing() f.spacing(a);
    }

}

.c-howItWorks-example-percentages-icon {
    margin-top: 0;

    @include f.media('<=wide') {
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
    padding: f.spacing(d) f.spacing(f);
    background-color: f.$color-container-subtle;
    border-radius: 100%;
    width: 160px;
    height: 160px;
    text-align: center;
    margin-left: f.spacing(e);

    @include f.media('<=wide') {
        background-color: transparent;
        margin: 0;
        width: 100%;
        height: auto;
    }

    @include f.media('<=narrowMid') {
        padding: f.spacing(d) f.spacing();
    }

    @include f.media('<=tiny') {
        padding: f.spacing(d) 0;
    }

}

.c-howItWorks-example-total-text {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 0;

    @include f.media('<=wide') {
        width: $examplePercentages-line-width-xl;

        &:before {
            @include percentages-line;
        }

        &:after {
            @include percentages-line;
        }

        &:not(:empty):before {
            margin-right: f.spacing(d);
        }

        &:not(:empty):after {
            margin-left: f.spacing(d);
        }
    }

    @include f.media('<=mid') {
        width: $examplePercentages-line-width-lg;
    }

    @include f.media('<=narrowMid') {
        width: $examplePercentages-line-width-md;
    }

    @include f.media('<=tiny') {
        width: $examplePercentages-line-width-sm;
    }

}

.c-howItWorks-example-total-price {
    color: f.$color-content-brand;
}

/*
HOW IT WORKS SECTION: MEDIA SECTION
--------------------------------------------------------------------------
*/

.c-howItWorks-mediaWrapper {
    margin-bottom: f.spacing();
    display: grid;
    grid-gap: f.spacing(d);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto;

    :global(.c-mediaElement-img--override) {
        height: 120px;
    }
}

@include f.media('<=wide') {
    .c-howItWorks-mediaWrapper {
        display: grid;
        grid-gap: f.spacing(d);
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }
}

@include f.media('<=narrow') {
    .c-howItWorks-mediaWrapper {
        display: grid;
        grid-gap: f.spacing(d);
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
}

.c-howItWorks-mediaTitle {
    @include f.font-size(heading-l);
    margin-top: f.spacing(h);
    margin-bottom: f.spacing(e);
}

.c-stampcards-terms {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.c-stampcards-terms-link {
    margin: f.spacing(e) 0;
    text-align: center;
    font-weight: f.$font-weight-bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
