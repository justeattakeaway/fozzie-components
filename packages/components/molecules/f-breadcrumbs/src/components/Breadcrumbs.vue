<template>
    <div
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
    </div>
</template>

<script>

export default {
    name: 'Breadcrumbs',
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

$breadcrumbs-text-colour-noBackground: $color-content-default;
$breadcrumbs-text-colour-hasBackground: $color-content-light;
$breadcrumbs-background-colour: rgba($color-black, 0.6);
$breadcrumbs-border-radius: $radius-rounded-e;
$breadcrumbs-not-active-font-weight: $font-weight-bold;
$breadcrumbs-active-font-weight: $font-weight-regular;

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
    padding: 0 spacing();
}

.c-breadcrumbs-item {
    padding: spacing(a) spacing();

    @include media('<narrowMid') {
        padding: spacing(a) spacing(d) spacing(a) spacing();
    }
}

.c-breadcrumbs-item,
.c-breadcrumbs-separator {
    @include media('<narrowMid') {
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

    @include media('<narrowMid') {
        margin-left: spacing(c);
        transform: scale(0.6, 1.2) rotate(180deg);
        margin-top: 2px;
    }
}
</style>
