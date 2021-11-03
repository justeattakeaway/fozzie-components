<template>
    <div>
        <p
            :class="{
                [$style['c-restaurantCard-iconText']]: true,
                [$style['c-restaurantCard-iconText--bold']]: isBold
            }"
            aria-hidden="true"
            :data-test-id="dataTestId">
            <span
                v-if="showIcon"
                :class="{
                    [$style['c-restaurantCard-iconText-icon']]: true,
                    [$style['c-restaurantCard-iconText-icon--hideOnMidBellow']]: hideIconInTileView
                }"
                :style="`fill:${color};`"
                data-test-id="icon-text-icon">
                <slot />
            </span>
            <span
                :class="$style['c-restaurantCard-iconText-content']"
                :style="`color:${color};`"
                data-test-id="icon-text-visible-text">
                {{ text }}
            </span>
        </p>
        <span
            class="is-visuallyHidden"
            data-test-id="icon-text-accessible-text">
            {{ accessibleText || text }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        text: {
            type: String,
            required: true
        },
        accessibleText: {
            type: String,
            default: null
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
        },
        isListItem: {
            type: Boolean,
            default: false
        },
        dataTestId: {
            type: String,
            default: null
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
.c-restaurantCard-iconText {
    @include font-size();
    margin-top: spacing();
    display: flex;
    align-items: center;
}

.c-restaurantCard-iconText--bold {
    font-weight: $font-weight-bold;
}

.c-restaurantCard-iconText-content {
    display: block;
    flex: 1;
}

.c-restaurantCard-iconText-icon {
    width: spacing(x2);
    height: spacing(x2);
    margin-right: spacing(x0.5);
}

.c-restaurantCard-iconText-icon--hideInTileView {
    display: none;
}

.c-restaurantCard-iconText-icon--hideOnMidBellow {
    @include media('<mid') {
        display: none;
    }
}
</style>
