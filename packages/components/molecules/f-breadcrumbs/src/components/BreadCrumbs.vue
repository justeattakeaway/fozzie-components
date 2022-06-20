<template>
    <nav
        aria-label="breadcrumbs"
        data-test-id="breadcrumbs-component"
        :class="$style['c-breadcrumbs']">
        <ul
            :class="[$style['c-breadcrumbs-list'], {
                [$style['c-breadcrumbs-list--hasBackground']]: hasBackground
            }]">
            <template v-for="({ name, url, routerLink }, index) in links">
                <li
                    v-if="index !== 0"
                    :key="`${index}_link`"
                    :class="$style['c-breadcrumbs-separator']"
                    aria-hidden="true">
                    >
                </li>
                <li
                    :key="`${index}_separator`"
                    :class="[
                        $style['c-breadcrumbs-item'],
                        $style['c-breadcrumbs-text'],
                        breadcrumbActiveClass(index)
                    ]">
                    <router-link
                        v-if="routerLink && url"
                        :to="url"
                        :class="$style['c-breadcrumbs-link']">
                        {{ name }}
                    </router-link>
                    <a
                        v-else-if="url"
                        :href="url"
                        :class="$style['c-breadcrumbs-link']">
                        {{ name }}
                    </a>
                    <template v-else>
                        {{ name }}
                    </template>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    props: {
        links: {
            type: Array,
            default: () => []
        },

        hasBackground: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        /**
        * Function to add active class to the last breadcrumb
        * @param index
        * @returns {*|string}
        */
        breadcrumbActiveClass (index) {
            return index === this.links.length - 1 ?
                this.$style['c-breadcrumbs-text--active'] :
                '';
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$breadcrumbs-text-colour-noBackground: f.$color-content-default;
$breadcrumbs-text-colour-hasBackground: f.$color-content-light;
$breadcrumbs-background-colour: rgba(f.$color-black, 0.6);
$breadcrumbs-border-radius: f.$radius-rounded-e;
$breadcrumbs-not-active-font-weight: f.$font-weight-bold;
$breadcrumbs-active-font-weight: f.$font-weight-regular;

.c-breadcrumbs {
    display: flex;
}

.c-breadcrumbs-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

.c-breadcrumbs-list--hasBackground {
    background-color: $breadcrumbs-background-colour;
    border-radius: $breadcrumbs-border-radius;
    padding: 0 f.spacing();
}

.c-breadcrumbs-item {
    padding: f.spacing(a) f.spacing();

    @include f.media('<narrowMid') {
        padding: f.spacing(a) f.spacing(d) f.spacing(a) f.spacing();
    }
}

.c-breadcrumbs-item,
.c-breadcrumbs-separator {
    @include f.media('<narrowMid') {
        display: none;

        &:nth-last-child(-n+4):not(:nth-last-child(-n+2)) {
            display: block;
        }
    }
}

.c-breadcrumbs-text {
    &, & > a {
        color: $breadcrumbs-text-colour-noBackground;
        font-weight: $breadcrumbs-not-active-font-weight;

        .c-breadcrumbs-list--hasBackground & {
            color: $breadcrumbs-text-colour-hasBackground;
        }
    }
}

.c-breadcrumbs-text--active {
    &, & > a {
        font-weight: $breadcrumbs-active-font-weight;
    }
}

.c-breadcrumbs-link {
    color: $breadcrumbs-text-colour-noBackground;
    font-weight: $breadcrumbs-not-active-font-weight;

    .c-breadcrumbs-list--hasBackground & {
        color: $breadcrumbs-text-colour-hasBackground;
    }

    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
        color: $breadcrumbs-text-colour-noBackground;

        .c-breadcrumbs-list--hasBackground & {
            color: $breadcrumbs-text-colour-hasBackground;
        }
    }
}

.c-breadcrumbs-separator {
    color: $breadcrumbs-text-colour-noBackground;
    transform: scale(0.6, 1.2);

    .c-breadcrumbs-list--hasBackground & {
        color: $breadcrumbs-text-colour-hasBackground;
    }

    @include f.media('<narrowMid') {
        margin-left: f.spacing(c);
        transform: scale(0.6, 1.2) rotate(180deg);
        margin-top: 2px;
    }
}
</style>
