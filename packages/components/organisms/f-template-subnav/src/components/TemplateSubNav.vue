<template>
    <div
        data-test-id="templateSubNav">
        <div
            :class="$style['c-breadcrumb-container']">
            <bread-crumbs
                :links="breadcrumbLinks" />
        </div>

        <div
            :class="$style['c-main-container']">
            <div
                :class="$style['c-navigation']">
                <navigation-links
                    :links="navigationLinks" />
            </div>

            <div
                :class="$style['c-account-page']">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '@justeat/f-breadcrumbs';
import NavigationLinks from '@justeat/f-navigation-links';
import '@justeat/f-breadcrumbs/dist/f-breadcrumbs.css';
import '@justeat/f-navigation-links/dist/f-navigation-links.css';

export default {
    name: 'TemplateSubNav',

    components: {
        BreadCrumbs,
        NavigationLinks
    },

    props: {
        breadcrumbLinks: {
            type: Array,
            default: () => []
        },
        navigationLinks: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>

.c-breadcrumb-container {
    padding-top: 10px;
    padding-bottom: 1px;
}

.c-main-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: spacing(x5);
    padding-bottom: spacing(x5);
}

.c-breadcrumb-container,
.c-main-container {
    margin: auto;
    max-width: #{$layout-max-width}px;
    padding-left: #{$layout-margin}px;
    padding-right: #{$layout-margin}px;

    @include media('<wide') {
        padding-left: #{$layout-margin--mid}px;
        padding-right: #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding-left: #{$layout-margin--narrow}px;
        padding-right: #{$layout-margin--narrow}px;
    }
}

.c-navigation {
    flex-basis: 15rem;
    flex-grow: 1;
}

.c-navigation,
.c-breadcrumb-container {
    @include media('<mid') {
        display: none;
    }
}

.c-account-page {
    flex-basis: 0;
    flex-grow: 999;
}
</style>
