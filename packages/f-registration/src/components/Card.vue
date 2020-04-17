<template>
    <div
        :data-theme="theme"
        :class="[
            $style['c-card'],
            $style['c-card--rounded'],
            $style['c-card--outline'],
            $style['c-card--contentWrapper']
        ]"
    >
        <h1

            :class="[
                'beta',
                $style['c-card-heading']
            ]"
        >
            {{ cardTitle }}
        </h1>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        cardTitle: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>

// Card styling

$card-bgColor--active                     : $white;
$card-bgColor--disabled                   : $grey--lightest;
$card-tooltip-width                       : 10px;
$card-arrow-bottom-position               : 0;
$card-padding                             : spacing(x2);
$card-borderRadius                        : $border-radius;
$card-borderColor                         : $grey--lightest;
$card-section-margin                      : spacing(x4);
$card-section-margin--large               : spacing(x8);
$card-section-highlight-backgroundColor   : $orange;
$card-section-highlight-color             : $white;
$card-section-collapsible-paddingRight    : 60px;
$card-section-collapsed-height            : 40px;

$card--contentWrapper-width               : 460px;

.c-card {
    background-color: $card-bgColor--active;
    display: block;
    margin-bottom: spacing();
    padding: $card-padding;
    position: relative;

    @include media('>=mid') {
        margin-bottom: 0;
    }
}
    .c-card-heading {
        margin-bottom: spacing(x2);
    }

    .c-card--rounded {
        border-radius: $card-borderRadius;
    }

    .c-card--outline {
        border: solid 1px $card-borderColor;
    }

    .c-card--contentWrapper {
        width: 100%;
        transition: 250ms padding ease-in-out;
        padding-left: 6%;
        padding-right: 6%;

        @include media('>=narrow') {
            padding-left: 10%;
            padding-right: 10%;
        }

        @include media('>=#{$card--contentWrapper-width}') {
            width: $card--contentWrapper-width;
            margin: 0 auto;
            padding-left: spacing() * 10;
            padding-right: spacing() * 10;
        }
    }

    .c-card-heading {
        margin-bottom: spacing(x3);
    }

</style>
