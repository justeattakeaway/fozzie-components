<template>
    <ul
        v-if="links.length"
        :class="$style['c-navigationLinks']"
        data-test-id="navigationLinks">
        <li
            v-for="({ Id, url, name, selected }, i) in links"
            :key="`${i}_link`"
            :class="$style['c-navigationLink-item']">
            <span
                v-if="selected"
                :data-test-id="Id"
                tabindex="0"
                :class="[$style['c-navigationLink-link'], $style['c-navigationLink--active']]">
                {{ name }}
            </span>
            <v-link
                v-else
                :data-test-id="Id"
                :has-text-decoration="false"
                :href="url"
                :class="$style['c-navigationLink-link']">
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
            required: true,
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

    li {
        display: inline-block;
        width: 100%;

        .c-navigationLink-link {
            display: block;
            padding: 10px 0 10px 22px;
            border-left: 2px solid $color-grey-30;
            color: $color-grey;

            &:focus,
            &:hover {
                border-left: 2px solid $color-orange;
                text-decoration: none;
            }
        }

        .c-navigationLink--active {
            border-left: 2px solid $color-orange;
            font-weight: $font-weight-bold;
        }
    }
}
</style>
