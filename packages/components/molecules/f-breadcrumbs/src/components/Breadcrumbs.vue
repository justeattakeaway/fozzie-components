<template>
    <div
        data-test-id="breadcrumbs-component"
        :class="$style['c-breadcrumbs']">
        <ul :class="$style['c-breadcrumbs-list']">
            <template v-for="({ name, url, routerLink }, index) in links">
                <li
                    v-if="index !== 0"
                    :key="`${index}_link`"
                    :class="$style['c-breadcrumbs-separator']">
                    >
                </li>
                <li
                    :key="`${index}_separator`"
                    :class="$style['c-breadcrumbs-item']">
                    <router-link
                        v-if="routerLink"
                        :to="url"
                        :class="[
                            $style['c-breadcrumbs-link'],
                            linkActiveClass(index)
                        ]">
                        {{ name }}
                    </router-link>
                    <a
                        v-else
                        :href="url"
                        :class="[
                            $style['c-breadcrumbs-link'],
                            linkActiveClass(index)
                        ]">
                        {{ name }}
                    </a>
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
        }
    },
    methods: {
        /**
       * Function to add active class to the last link
       * @param index
       * @returns {*|string}
       */
        linkActiveClass (index) {
            return index === this.links.length - 1 ? this.$style['c-breadcrumbs-link--active'] : '';
        }
    }
};
</script>

<style lang="scss" module>

$breadcrumbs-text-colour: $color-content-light;
$breadcrumbs-background-colour: rgba($color-black, 0.6);
$breadcrumbs-border-radius: $radius-rounded-c;
$breadcrumbs-not-active-font-weight: $font-weight-bold;
$breadcrumbs-active-font-weight: $font-weight-regular;

.c-breadcrumbs {
    display: flex;
}
.c-breadcrumbs-list {
    list-style: none;
    background-color: $breadcrumbs-background-colour;
    border-radius: $breadcrumbs-border-radius;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}
.c-breadcrumbs-item {
    padding: spacing(x0.5) spacing(x2);
    @include media('<narrowMid') {
        padding: spacing(x0.5) spacing(x2) spacing(x0.5) spacing();
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
.c-breadcrumbs-link {
    color: $breadcrumbs-text-colour;
    font-weight: $breadcrumbs-not-active-font-weight;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: $breadcrumbs-text-colour;
    }
}
.c-breadcrumbs-separator {
    color: $breadcrumbs-text-colour;
    transform: scale(0.6, 1.2);
    @include media('<narrowMid') {
        margin-left: spacing(x1.5);
        transform: scale(0.6, 1.2) rotate(180deg);
        margin-top: 2px;
    }
}
.c-breadcrumbs-link--active {
    font-weight: $breadcrumbs-active-font-weight;
}

</style>
