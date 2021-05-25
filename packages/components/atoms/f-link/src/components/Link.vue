<template>
    <span>
        <a
            :class="[
                $style['o-link'], {
                    [$style['o-link--bold']]: isBold,
                    [$style['o-link--noDecoration']]: !hasTextDecoration,
                    [$style['o-link--full']]: isFullWidth,
                    [$style['o-link--noBreak']]: noLineBreak
                }]"
            data-test-id="link-component"
            :aria-describedby="descriptionId"
            :target="target"
            :rel="rel"
            v-bind="$attrs"
        >
            <slot />
        </a>
        <span
            v-if="ariaDescription"
            :id="descriptionId"
            class="is-visuallyHidden"
        >
            {{ ariaDescription }}
        </span>
    </span>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { DEFAULT_LINK_TYPE, VALID_LINK_TYPES } from '../constants';
import tenantConfigs from '../tenants';

let uid = 0;

export default {
    name: 'VLink',

    props: {
        linkType: {
            type: String,
            default: DEFAULT_LINK_TYPE,
            validator: value => (VALID_LINK_TYPES.indexOf(value) !== -1) // The prop value must match one of the valid input types
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
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        uid += 1;

        return {
            copy: { ...localeConfig },
            uid: `link-${uid}-description`
        };
    },

    computed: {
        ariaDescription () {
            return this.linkType === DEFAULT_LINK_TYPE ? null : this.copy.ariaDescription[this.linkType];
        },

        target () {
            return this.linkType === 'external' || this.linkType === 'newLocation' ? '_blank' : null;
        },

        rel () {
            return this.linkType === 'external' ? 'noopener' : null;
        },

        descriptionId () {
            return this.ariaDescription ? this.uid : null;
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
