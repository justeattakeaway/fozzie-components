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
                v-if="hasSlotData"
                :class="{
                    [$style['c-restaurantCard-iconText-icon']]: true,
                    [$style['c-restaurantCard-iconText-icon--hideInTileView']]: !isListItem && hideIconInTileView,
                    [$style['c-restaurantCard-iconText-icon--hideOnMidBellow']]: hideIconInTileView
                }"
                :style="`fill:${color};`">
                <slot />
            </span>
            <span
                :class="$style['c-restaurantCard-iconText-content']"
                :style="`color:${color};`">
                {{ text }}
            </span>
        </p>
        <span class="is-visuallyHidden">
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
            required: true
        },
        dataTestId: {
            type: String,
            default: null
        }
    },
    computed: {
        hasSlotData () {
            return !!this.$slots.default;
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
