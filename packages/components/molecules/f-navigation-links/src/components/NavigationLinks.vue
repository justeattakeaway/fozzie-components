<template>
    <ul
        v-if="links.length"
        :class="$style['c-navigationLinks']"
        data-test-id="navigationLinks">
        <li
            v-for="({ id, href, to, name }, i) in links"
            :key="i"
            :class="$style['c-navigationLinks-item']">
            <v-link
                :data-test-id="id"
                :has-text-decoration="false"
                link-class="c-navigationLinks-link"
                v-bind="{
                    ...(href ? { href } : to ? { to } : {})
                }">
                {{ name }}
            </v-link>
        </li>
    </ul>
</template>

<script>
import VLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

export default {
    name: 'NavigationLinks',

    components: {
        VLink
    },

    props: {
        links: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
.c-navigationLinks {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.c-navigationLinks-item {
    display: block;
}
</style>

<style lang="scss">
/**
* .c-navigationLinks-link is intentionally not scoped as the consuming router application (Nuxt.js / Vue Router) will add active classes directly to
* the router-link within <f-link>.
*/
.c-navigationLinks-link {
    display: inline-block;
    padding: spacing() 0 spacing() spacing(x2);
    border-left: 2px solid $color-grey-30;
    color: $color-grey;

    &:focus,
    &:hover,
    &.nuxt-link-exact-active {
        border-left: 2px solid $color-orange;
        text-decoration: none;
    }
    &.nuxt-link-exact-active {
        font-weight: $font-weight-bold;
    }
}
</style>
