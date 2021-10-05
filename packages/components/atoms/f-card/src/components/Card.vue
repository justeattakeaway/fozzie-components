<template>
    <div
        data-test-id="card-component"
        :class="[
            $style['c-card'], {
                [$style['c-card--outline']]: hasOutline,
                [$style['c-card--pageContentWrapper']]: isPageContentWrapper
            }]">
        <div :class="[$style['c-card-innerSpacing']]">
            <component
                :is="cardHeadingTag"
                v-if="cardHeading"
                :class="[
                    $style['c-card-heading'],
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
        }
    }
};
</script>

<style lang="scss" module>

$card-bgColor                             : $color-container-default;
$card-borderColor                         : $color-border-default;
$card-borderRadius                        : $radius-rounded-c;
$card-padding                             : spacing(x2);
$card--pageContentWrapper-width           : 472px; // so that it falls on our 8px spacing grid

.c-card {
    background-color: $card-bgColor;
    display: block;
    border-radius: $card-borderRadius;
}
    .c-card-innerSpacing {
        padding: $card-padding;
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
        margin: spacing(x5) 0;

        @include media('>=#{$card--pageContentWrapper-width}') {
            width: $card--pageContentWrapper-width;
            margin: spacing(x5) auto;
        }

        .c-card-innerSpacing {
            padding: spacing(x3) 6% 0;

            @include media('>=narrow') {
                padding: spacing(x6) 10%;
            }

            @include media('>=#{$card--pageContentWrapper-width}') {
                padding: spacing(x6) spacing(x10);
            }
        }
    }

    .c-card-heading {
        margin-bottom: spacing(x2);
    }

    .c-card-heading--centerAligned {
        text-align: center;
    }

    .c-card-heading--rightAligned {
        text-align: right;
    }
</style>
