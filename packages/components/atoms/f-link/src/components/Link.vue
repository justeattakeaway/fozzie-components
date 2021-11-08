<template>
    <span>
        <component
            :is="linkType"
            :class="[
                linkClass,
                $style['o-link'], {
                    [$style['o-link--bold']]: isBold,
                    [$style['o-link--noDecoration']]: !hasTextDecoration,
                    [$style['o-link--full']]: isFullWidth,
                    [$style['o-link--noBreak']]: noLineBreak,
                    [$style['o-link--distinct']]: isDistinct
                }]"
            data-test-id="link-component"
            :aria-describedby="descriptionId"
            v-bind="bindAttrs()"
        >
            <slot />
        </component>
        <span
            v-if="ariaDescription"
            :id="descriptionId"
            class="is-visuallyHidden">
            {{ ariaDescription }}
        </span>
    </span>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

let uid = 0;

export default {
    name: 'VLink',

    inheritAttrs: false,

    props: {
        isExternalSite: {
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
        },

        isDistinct: {
            type: Boolean,
            default: false
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        uid += 1;

        return {
            copy: { ...localeConfig },
            uid: `link-${uid}-description`,
            linkClass: ''
        };
    },

    computed: {
        ariaDescription () {
            const shouldOpenInNewTab = this.$attrs.target === '_blank';

            if (this.isExternalSite && shouldOpenInNewTab) {
                return this.copy.ariaDescription.externalNewLocation;
            }

            if (this.isExternalSite) {
                return this.copy.ariaDescription.external;
            }

            if (shouldOpenInNewTab) {
                return this.copy.ariaDescription.newLocation;
            }

            return null;
        },

        descriptionId () {
            return this.ariaDescription ? this.uid : null;
        },

        linkType () {
            if (this.$attrs.href) {
                return 'a';
            }
            if (this.$attrs.to) {
                return 'router-link';
            }
            return 'a';
        }
    },

    methods: {
        /**
         * Set data.linkClass attribute and bind all other $attrs to the component.
         * linkClass added manually to nested component as inheritAttrs: false does not affect class bindings.
         */
        bindAttrs () {
            const { 'link-class': linkClass = '', ...otherAttributes } = this.$attrs;
            this.linkClass = linkClass;
            return otherAttributes;
        }
    }
};
</script>

<style lang="scss" module>
.o-link {
    & {
        color: $color-content-link;
    }

    &:hover,
    &:focus {
        color: darken($color-content-link, $color-hover-01);
    }

    &:active {
        color: darken($color-content-link, $color-active-01);
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

.o-link--distinct {
    color: $color-content-link-distinct;

    &:hover,
    &:focus {
        color: darken($color-content-link-distinct, $color-hover-01);
    }

    &:active {
        color: darken($color-content-link-distinct, $color-active-01);
    }
}
</style>
