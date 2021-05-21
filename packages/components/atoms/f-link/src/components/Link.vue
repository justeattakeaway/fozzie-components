<template>
    <a
        v-aria-label="newWindowMessage"
        :class="[
            $style['o-link'], {
                [$style['o-link--bold']]: isBold,
                [$style['o-link--noDecoration']]: !hasTextDecoration,
                [$style['o-link--full']]: isFullWidth,
                [$style['o-link--noBreak']]: noLineBreak
            }]"
        data-test-id="link-component"
        :target="target"
        :rel="rel"
        v-bind="$attrs"
    >
        <slot />
    </a>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';

export default {
    name: 'VLink',

    directives: {
        /**
         * Called when the slot is updated.
         * Applies the `innerText` of the slot with `newWindowMessage` to link `aria-label`
         * https://vuejs.org/v2/guide/custom-directive.html#Hook-Functions
         *
         * */
        ariaLabel: {
            componentUpdated (el, { value }) {
                el.ariaLabel = el.innerText + value || null;
            }
        }
    },

    mixins: [VueGlobalisationMixin],

    props: {
        isExternal: {
            type: Boolean,
            default: false
        },

        opensInNewLocation: {
            type: Boolean,
            default: false
        },

        isBold: {
            type: Boolean,
            default: false
        },

        hasTextDecoration: {
            type: Boolean,
            default: true
        },

        isFullWidth: {
            type: Boolean,
            default: false
        },

        noLineBreak: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        linkText () {
            return this.$slots.default[0].children[0].text.trim();
        },

        newWindowMessage () {
            if (this.isExternal) {
                return this.$t('ariaLabel.externalSite');
            } else if (this.opensInNewLocation) {
                return this.$t('ariaLabel.newLocation');
            }
            return null;
        },

        target () {
            return this.isExternal || this.opensInNewLocation ? '_blank' : null;
        },

        rel () {
            return this.isExternal ? 'noopener' : null;
        }
    }
};
</script>

<style lang="scss" module>
.o-link {
    & {
        color: $color-link-default;
    }

    &:hover,
    &:focus {
        color: $color-link-hover;
    }

    &:active {
        color: $color-link-active;
    }
}

.o-link--full {
    width: 100%;
    display: block;
}

.o-link--noDecoration {
    text-decoration: none;

    // for accessibility reasons we are leaving
    // text-decoration on hover and focus
    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.o-link--bold {
    font-weight: $font-weight-bold;
}

.o-link--noBreak {
    white-space: nowrap;
}
</style>
