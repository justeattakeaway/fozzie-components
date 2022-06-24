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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-subNavTemplate-breadcrumb {
    padding-top: 10px;
    padding-bottom: 1px;
}

.c-subNavTemplate-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: f.spacing(g);
    padding-bottom: f.spacing(g);
}

.c-subNavTemplate-breadcrumb,
.c-subNavTemplate-container {
    margin: auto;
    max-width: #{f.$layout-max-width}px;
    padding-left: #{f.$layout-margin}px;
    padding-right: #{f.$layout-margin}px;

    @include f.media('<wide') {
        padding-left: #{f.$layout-margin--mid}px;
        padding-right: #{f.$layout-margin--mid}px;
    }

    @include f.media('<narrow') {
        padding-left: #{f.$layout-margin--narrow}px;
        padding-right: #{f.$layout-margin--narrow}px;
    }
}

.c-subNavTemplate-subNav {
    flex-basis: 15rem;
    flex-grow: 1;
}

.c-subNavTemplate-breadcrumb,
.c-subNavTemplate-subNav {
    @include f.media('<mid') {
        display: none;
    }
}

.c-subNavTemplate-main {
    flex-basis: 0;
    flex-grow: 999;
}
</style>
