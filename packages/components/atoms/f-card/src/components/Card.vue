<template>
    <div
        data-test-id="card-component"
        :class="[
            $style['c-card'], {
                [$style['c-card--outline']]: hasOutline,
                [$style['c-card--pageContentWrapper']]: isPageContentWrapper,
                [$style[`c-card--size${capitaliseCardSizeProp}`]]: cardSizeCustom !== ''
            }]">
        <div
            data-test-id="card-inner"
            :class="[
                [$style['c-card-innerSpacing']], {
                    [$style['c-card-innerSpacing--large']]: hasInnerSpacingLarge
                }]">
            <component
                :is="cardHeadingTag"
                v-if="cardHeading"
                :class="[
                    $style['c-card-heading'],
                    cardHeadingSize,
                    { [$style[`c-card-heading--${cardHeadingPosition}Aligned`]]: cardHeadingPosition !== 'left' }
                ]"
                data-test-id="card-heading">
                {{ cardHeading }}
            </component>
            <slot />
        </div>

        <div
            v-if="hasFullWidthFooter"
            data-test-id="card-footer">
            <slot name="cardFooter" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    components: {},
    props: {
        cardHeading: {
            type: String,
            default: ''
        },
        cardHeadingPosition: {
            type: String,
            default: 'left',
            validator: value => ['left', 'right', 'center'].indexOf(value) !== -1
        },
        cardHeadingTag: {
            type: String,
            default: 'h1',
            validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(value) !== -1
        },
        cardHeadingSize: {
            type: String,
            default: '',
            validator: value => ['', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'].indexOf(value) !== -1
        },
        hasOutline: {
            type: Boolean,
            default: false
        },
        isPageContentWrapper: {
            type: Boolean,
            default: false
        },
        hasFullWidthFooter: {
            type: Boolean,
            default: false
        },
        hasInnerSpacingLarge: {
            type: Boolean,
            default: false
        },
        cardSizeCustom: {
            type: String,
            default: '',
            validator: value => ['', 'medium', 'large'].indexOf(value) !== -1
        }
    },

    computed: {
        /**
         * Capitialises the prop values so we can name our class e.g `c-card--sizeLarge`.
         *
         * @returns {string|boolean}
         */
        capitaliseCardSizeProp () {
            const cardPropValue = this.cardSizeCustom;

            if (cardPropValue) {
                return cardPropValue.replace(/^./, cardPropValue[0].toUpperCase());
            }

            return false;
        }
    }
};
</script>

<style lang="scss" module>

$card-bgColor                             : $color-container-default;
$card-borderColor                         : $color-border-default;
$card-borderRadius                        : $radius-rounded-c;
$card-padding                             : spacing(d);
$card-padding-large                       : spacing(f);
$card--pageContentWrapper-width           : 472px; // so that it falls on our 8px spacing grid

.c-card {
    background-color: $card-bgColor;
    display: block;
    border-radius: $card-borderRadius;
}
    .c-card-innerSpacing {
        padding: $card-padding;

        &.c-card-innerSpacing--large {
            padding: $card-padding-large $card-padding;

            @include media('>=mid') {
                padding: $card-padding-large;
            }
        }
    }

    .c-card--outline {
        border: 1px solid $card-borderColor;
    }

    // .c-card--pageContentWrapper Modifier
    // Used for displaying full page content appropriately
    // Default is fullWidth on narrow devices
    // above $card-pageContentWrapper-width, the width of the card is restricted and centred on the page
    .c-card--pageContentWrapper {
        width: 100%;
        transition: 250ms padding ease-in-out;
        margin: spacing(g) 0;

        @include media('>=#{$card--pageContentWrapper-width}') {
            width: $card--pageContentWrapper-width;
            margin: spacing(g) auto;
        }

        & > .c-card-innerSpacing {
            padding: spacing(e) 6% 0;

            @include media('>=narrow') {
                padding: spacing(h) 10%;
            }

            @include media('>=#{$card--pageContentWrapper-width}') {
                padding: spacing(h) spacing(j);
            }
        }
    }

    .c-card-heading {
        margin-bottom: spacing(d);
    }

    .c-card-heading--centerAligned {
        text-align: center;
    }

    .c-card-heading--rightAligned {
        text-align: right;
    }

    // The two card sizes used on the accounts page. e.g Previous orders & contact preferences cards.
    .c-card--sizeLarge {
        max-width: 808px;
    }

    .c-card--sizeMedium {
        max-width: 600px;
    }
</style>
