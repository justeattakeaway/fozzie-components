<template>
    <a
        :class="$style['o-link']"
        data-test-id="link"
        :href="linkHref"
        rel="noopener"
        :aria-describedby="`copy.ariaDescribedBy['${linkType}']`"
    >
        {{ linkText }}
    </a>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'VLink',
    components: {},
    props: {
        locale: {
            type: String,
            default: 'en-GB'
        },

        linkText: {
            type: String,
            required: true
        },

        linkHref: {
            type: String,
            required: true
        }

        // linkType: {
        //     type: String,
        //     default: DEFAULT_LINK_TYPE,
        //     validator: value => (VALID_LINK_STYLES.indexOf(value) !== -1) // The prop value must match one of the valid link types
        // }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
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
    // have left in in case we want to use eventually
    // &:visited {
    //     color: $color-link-visited;
    //     text-decoration: none;
    // }
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
</style>
