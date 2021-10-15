<template>
    <div
        :class="$style['c-navigationLinks']"
        data-test-id="navigationLinks">
        <ul>
            <li
                v-for="({ Id, url, name, selected }, i) in links"
                :key="`${i}_link`">
                <span
                    v-if="selected"
                    :data-test-id="Id"
                    tabindex="0"
                    :class="[$style['c-hightlighted-link']]">
                    {{ name }}
                </span>
                <v-link
                    v-else
                    :data-test-id="Id"
                    :has-text-decoration="false"
                    :href="url">
                    {{ name }}
                </v-link>
            </li>
        </ul>
    </div>
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
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        display: inline-block;
        width: 100%;

        a,
        .c-hightlighted-link {
            display: block;
            padding: 10px 0 10px 22px;
        }

        a {
            border-left: 2px solid $color-grey-30;
            color: $color-grey;

            &:focus,
            &:hover {
                border-left: 2px solid $color-orange;
                text-decoration: none;
            }
        }
    }

    .c-hightlighted-link {
        border-left: 2px solid $color-orange;
        font-weight: $font-weight-bold;

        a {
            border-left: none;

            &:focus,
            &:hover {
                border-left: none;
            }
        }
    }
}
</style>
