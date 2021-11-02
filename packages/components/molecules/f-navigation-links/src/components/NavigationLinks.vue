<template>
    <ul
        v-if="links.length"
        :class="$style['c-navigationLinks']"
        data-test-id="navigationLinks">
        <li
            v-for="({ id, url, name, selected }, i) in links"
            :key="i"
            :class="$style['c-navigationLinks-item']">
            <span
                v-if="selected"
                :data-test-id="id"
                tabindex="0"
                :class="[$style['c-navigationLinks-link'], $style['c-navigationLinks-link--active']]">
                {{ name }}
            </span>
            <v-link
                v-else
                :data-test-id="id"
                :has-text-decoration="false"
                :href="url"
                :class="$style['c-navigationLinks-link']">
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
    display: inline-block;
    width: 100%;
}

.c-navigationLinks-link {
    display: block;
    padding: spacing() 0 spacing() spacing(x2);
    border-left: 2px solid $color-grey-30;
    color: $color-grey;

    &:focus, &:hover {
        border-left: 2px solid $color-orange;
        text-decoration: none;
    }
}

.c-navigationLinks-link--active {
    border-left: 2px solid $color-orange;
    font-weight: $font-weight-bold;
}

</style>
