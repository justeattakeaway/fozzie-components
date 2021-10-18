<template>
    <div :class="$style['c-loyalty-loading']">
        <div :class="$style['c-loyalty-loadingHeader']" />
        <div :class="$style['c-loyalty-loadingCards']">
            <div
                v-for="n in cardCount"
                :key="`loadingStampCard-${n}`"
                :class="$style['c-loyalty-loadingCardPlaceholder']" />
        </div>
    </div>
</template>

<script>
const NARROW_BREAKPOINT_WIDTH = 600;
const MOBILE_LOADING_CARDS = 3;
const NON_MOBILE_LOADING_CARDS = 6;

export default {
    name: 'StampCardLoadingState',

    data () {
        return {
            cardCount: MOBILE_LOADING_CARDS
        };
    },

    mounted () {
        this.cardCount = (process.browser
            && window.innerWidth > NARROW_BREAKPOINT_WIDTH)
            ? NON_MOBILE_LOADING_CARDS
            : MOBILE_LOADING_CARDS;
    }
};
</script>

<style lang="scss" module>

$loyalty-loadingCardWidthDesktop: 392px;
$loyalty-cardWidthTablet: 344px;
$loyalty-loadingCardHeight: 135px;
$loyalty-loading-bgColour: $color-background-default;

.c-loyalty-loadingHeader {
    width: 140px;
    height: 24px;
    margin-bottom: 18px;
    margin-left: spacing();
    background-color: $loyalty-loading-bgColour;
}

.c-loyalty-loadingCards {
    display: flex;
    flex-flow: row wrap;
}

.c-loyalty-loadingCardPlaceholder {
    margin: spacing();
    width: $loyalty-loadingCardWidthDesktop;
    height: $loyalty-loadingCardHeight;
    padding: spacing(x2);
    border-radius: $border-radius;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03),
    0 3px 1px -2px rgba(0, 0, 0, 0.07),
    0 1px 5px 0 rgba(0, 0, 0, 0.06);

    /** START placeholder graphic details */

    background-color: $color-white;

    background-image: radial-gradient(circle at center, $loyalty-loading-bgColour, $loyalty-loading-bgColour 20px, rgba(0, 0, 0, 0) 20px), // stamps
    linear-gradient($loyalty-loading-bgColour 100%, transparent 0),
    linear-gradient($loyalty-loading-bgColour 100%, transparent 0),
    linear-gradient($loyalty-loading-bgColour 100%, transparent 0);

    background-repeat: repeat-x,
    no-repeat,
    no-repeat,
    no-repeat;

    background-size: 20% 40px,
    48px 48px,
    140px 24px,
    240px 8px;

    background-position: left bottom 16px,
    top 16px left 16px,
    top 18px left 80px,
    top 54px left 80px;

    /** END placeholder graphic details */

    @include media($stampCard-responsive-tabletViewBreakpoint) {
        width: $loyalty-cardWidthTablet;
    }

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: auto;
        flex: 1 1 100vw;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);

        background-size: 20% 40px,
        48px 48px,
        140px 24px,
        192px 8px;
    }
}
</style>
