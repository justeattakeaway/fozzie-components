<template>
    <ul
        :aria-label="copy.navTitle"
        class="c-nav-popoverList">
        <li
            v-for="(link, index) in copy.navLinks"
            :key="index"
            data-test-id="nav-links">
            <a
                :tabindex="isOpen ? 0 : -1"
                :href="link.url"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${link.gtm}"
                }`'
                :class="$style['list-link']"
                @blur="$emit('deactivateNav')"
                @focus="$emit('activateNav')">
                {{ link.text }}
            </a>
        </li>

        <li
            v-if="!isBelowMid"
            data-test-id="logout">
            <a
                :tabindex="isOpen ? 0 : -1"
                :href="returnLogoutUrl"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "header",
                    "label": "${copy.accountLogout.gtm}"
                }`'
                :class="$style['list-link']"
                @blur="$emit('deactivateNav')"
                @focus="$emit('activateNav')">
                {{ copy.accountLogout.text }}
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        isBelowMid: {
            type: Boolean,
            default: false
        },
        copy: {
            type: Object,
            default: () => ({})
        },
        returnLogoutUrl: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>

.list-link {
    display: block;
    padding: spacing(x1.5) spacing(x2);
    margin: 0;
    font-family: $font-family-base;
    font-weight: 300;
    color: $grey--dark;
    height: auto;
    @include font-size('body-s');
    text-decoration: none;
    border-bottom: 1px solid $grey--light;

    &:hover,
    &:focus {
        font-weight: $font-weight-bold;
        text-decoration: none;
        color: $grey--dark;
    }

    @include media('>=mid') {
        @include font-size('body-l');
    }
}
</style>
