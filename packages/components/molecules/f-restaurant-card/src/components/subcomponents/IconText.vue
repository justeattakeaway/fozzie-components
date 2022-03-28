<template>
    <p
        :class="{
            [$style['c-restaurantCard-iconText']]: true,
            [$style[`c-restaurantCard-iconText--${color}`]]: true,
            [$style['c-restaurantCard-iconText--bold']]: isBold
        }">
        <span
            v-if="showIcon"
            :class="{
                [$style['c-restaurantCard-iconText-icon']]: true,
                [$style['c-restaurantCard-iconText-icon--hideOnMidBelow']]: hideIconInTileView
            }"
            data-test-id="icon-text-icon">
            <slot />
        </span>
        <span
            :class="{
                [$style['c-restaurantCard-iconText-content']]: true
            }"
            data-test-id="icon-text-visible-text">
            {{ text }}
        </span>
    </p>
</template>

<script>
export default {
    name: 'IconText',
    inject: {
        isListItem: {
            default: false
        }
    },
    props: {
        text: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: null
        },
        isBold: {
            type: Boolean,
            default: false
        },
        hideIconInTileView: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasSlotData () {
            return !!this.$slots.default;
        },
        shouldHideIcon () {
            return this.hideIconInTileView && !this.isListItem;
        },
        showIcon () {
            return this.hasSlotData && !this.shouldHideIcon;
        }
    }
};
</script>

<style lang="scss" module>
@mixin themedColor($color) {
    color: $color;

    path {
        fill: $color;
    }
}

.c-restaurantCard-iconText {
    @include font-size(body-s);
    margin: 0;
    display: flex;
    align-items: center;
}

.c-restaurantCard-iconText--bold {
    font-weight: $font-weight-bold;
}

.c-restaurantCard-iconText-content {
    flex: 1;
}

.c-restaurantCard-iconText-icon {
    width: 14px;
    height: 100%;
    margin-right: spacing(a);

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.c-restaurantCard-iconText-icon--hideOnMidBelow {
    @include media('<mid') {
        display: none;
    }
}

.c-restaurantCard-iconText--colorSupportPositive {
    @include themedColor($color-support-positive);
}

.c-restaurantCard-iconText--colorSupportInfo {
    @include themedColor($color-support-info);
}

.c-restaurantCard-iconText--colorSupportError {
    @include themedColor($color-support-error);
}
</style>
