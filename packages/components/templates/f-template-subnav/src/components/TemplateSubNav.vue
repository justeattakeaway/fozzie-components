<template>
    <div
        data-test-id="templateSubNav"
        class="c-subNavTemplate">
        <div
            :class="$style['c-subNavTemplate-breadcrumb']">
            <bread-crumbs
                :links="breadcrumbLinks" />
        </div>

        <div
            :class="$style['c-subNavTemplate-container']">
            <div
                :class="$style['c-subNavTemplate-subNav']">
                <navigation-links
                    :links="navigationLinks" />
            </div>

            <main
                :class="$style['c-subNavTemplate-main']">
                <slot />
            </main>
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

.c-subNavTemplate-breadcrumb {
    padding-top: 10px;
    padding-bottom: 1px;
}

.c-subNavTemplate-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: spacing(g);
    padding-bottom: spacing(g);
}

.c-subNavTemplate-breadcrumb,
.c-subNavTemplate-container {
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

.c-subNavTemplate-subNav {
    flex-basis: 15rem;
    flex-grow: 1;
}

.c-subNavTemplate-breadcrumb,
.c-subNavTemplate-subNav {
    @include media('<mid') {
        display: none;
    }
}

.c-subNavTemplate-main {
    flex-basis: 0;
    flex-grow: 999;
}
</style>
