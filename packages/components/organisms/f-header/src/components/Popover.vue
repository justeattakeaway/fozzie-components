<template>
    <component
        :is="componentType"
        :copy="copy"
        :is-open="isOpen"
        :is-below-mid="componentType === 'user-navigation' ? isBelowMid : null"
        :return-logout-url="componentType === 'user-navigation' ? returnLogoutUrl : null"
        :class="$style['c-popover']"
        v-on="$listeners" />
</template>

<script>
import UserNavigation from './UserNavigationPanel.vue';
import CountrySelector from './CountrySelectorPanel.vue';

export default {
    components: {
        UserNavigation,
        CountrySelector
    },
    props: {
        componentType: {
            type: String,
            default: 'user-navigation'
        },
        copy: {
            type: Object,
            default: () => ({})
        },
        isOpen: {
            type: Boolean,
            default: false
        },
        isBelowMid: {
            type: Boolean,
            default: false
        },
        returnLogoutUrl: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>

$popover-radius                : 3px;
$popover-padding               : spacing(x2);
$tooltip-width                 : 10px;
$popover-minWidth              : 300px;

.c-popover {
    @include media('>=mid') {
        background-color: $white;
        border: 1px solid $color-border;
        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.2);
        border-top: 0;
        border-radius: 0 0 $popover-radius $popover-radius;
        padding: 0 $popover-padding;
        min-width: $popover-minWidth;

        // tooltip arrow
        &:before {
            bottom: 100%;
            right: 10%;
            border: $tooltip-width solid transparent;
            border-bottom: $tooltip-width solid $white;
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
    }
}

</style>
