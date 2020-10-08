<template>
    <div
        :data-theme="theme"
        :class="[$style['c-alert'],
                 $style[`c-alert--${type}`],
                 (isRounded ? $style['c-alert--rounded'] : '')]"
        data-test-id='alert-component'>
        <button
            v-if="isDismissable"
            type="button"
            :class="[$style['c-alert-dismiss'], 'o-btn o-btn--icon']"
            @click="dismiss">
            <cross-icon
                :class="[$style['c-icon--cross'], $style['c-alert-dismiss-icon']]" />
        </button>
        <!-- TODO: make this dynamic. See https://skipthedishes.atlassian.net/browse/WCB-1219 -->
        <h3
            :class="$style['c-alert-heading']">
            <slot name="heading" />
        </h3>
        <p
            :class="$style['c-alert-content']">
            <slot name="content" />
        </p>
    </div>
</template>

<script>
import { CrossIcon } from '@justeat/f-vue-icons';
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'VueAlert',
    components: { CrossIcon },
    props: {
        locale: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'success',
            validator: value => ['success', 'warning', 'info', 'danger'].indexOf(value) !== -1
        },
        isRounded: {
            type: Boolean,
            default: false
        },
        isDismissable: {
            type: Boolean,
            default: false
        },
        isFullWidth: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    },
    methods: {
        dismiss () {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>

<style lang="scss" module>

$alert-borderRadius: $border-radius;

.c-alert {
    position: relative;
    padding: spacing();
    margin-top: spacing(x2);
    border: 0;
    min-height: 132px;

    &:first-child {
        margin-top: 0;
    }

    & + * {
        margin-top: spacing(x2);
    }
}

    .c-alert--rounded {
        border-radius: $alert-borderRadius;
    }

    .c-alert--success {
        @include alert-variant($color-bg--accept, $color-text);
    }

    .c-alert--warning {
        @include alert-variant($color-bg--notification, $color-text);
    }

    .c-alert--danger {
        @include alert-variant($color-bg--error, $color-text);
    }

    .c-alert--info {
        @include alert-variant($color-bg--info, $color-text);
    }

    .c-alert-heading {
        @include font-size(subheading-s, true, narrow);
        margin-top: spacing(x0.5);
    }

    .c-alert-content {
        @include font-size(body-l);
    }

    button.c-alert-dismiss { // TODO: Needed more specificity here.
        padding: spacing();
        text-indent: 0;
        position: absolute;
        right: spacing();
        top: spacing();
        z-index: zIndex(high);

        &:hover {
            cursor: pointer;
        }
    }

        .c-alert-dismiss-icon {
            height: 13px;
        }
</style>
