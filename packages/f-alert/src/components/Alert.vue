<template>
    <div
        v-if="!isDismissed"
        :class="[$style['c-alert'],
                 $style[`c-alert--${type}`]]"
        data-test-id="alert-component"
        role="alert">
        <div
            :class="$style['c-alert-headingContainer']">
            <component
                :is="icon"
                :class="[$style['c-alert-icon'],
                         $style[`c-alert-icon--${type}`]]"
                data-test-id="alert-icon" />
            <!-- TODO: make this dynamic. Find related ticket ;) -->
            <h2
                :class="$style['c-alert-heading']"
                data-test-id="alert-heading">
                {{ heading }}
            </h2>
            <vue-button
                v-if="isDismissable"
                :class="[$style['c-alert-dismiss']]"
                button-type="icon"
                button-size="sizeXSmall"
                data-test-id="alert-dismiss"
                @click="dismiss">
                <cross-icon
                    :class="[$style['c-alert-dismiss-icon']]"
                />
                <span class="is-visuallyHidden">
                    {{ copy.dismissAlertText }}
                </span>
            </vue-button>
        </div>
        <div
            :class="$style['c-alert-content']">
            <slot />
        </div>
    </div>
</template>

<script>
import {
    CrossIcon,
    DangerIcon,
    InfoIcon,
    SuccessIcon,
    WarningIcon
} from '@justeat/f-vue-icons';
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import VueButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
export default {
    name: 'VueAlert',
    components: {
        CrossIcon,
        DangerIcon,
        InfoIcon,
        SuccessIcon,
        WarningIcon
    },
    props: {
        locale: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            required: true,
            validator: value => ['success', 'warning', 'info', 'danger'].indexOf(value) !== -1
        },
        heading: {
            type: String,
            required: true
        },
        isDismissable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            isDismissed: false,
            copy: { ...localeConfig },
            theme
        };
    },
    computed: {
        icon () {
            return `${this.type}Icon`;
        }
    },
    methods: {
        dismiss () {
            this.isDismissed = true;
        }
    }
};
</script>

<style lang="scss" module>

$alert-borderRadius: $border-radius;

.c-alert {
    position: relative;
    padding: spacing();
    padding-bottom: spacing(x1.5);
    margin-top: spacing(x2);
    border: 0;
}
    .c-alert-headingContainer {
        display: flex;
        align-items: center;
        padding: spacing(x0.5) 0;
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
        margin-top: -1px;
    }

    .c-alert-content {
        @include font-size(body-l);
        padding-left: spacing(x5);
    }

    .c-alert-icon {
        height: 20px;
        margin: 0 spacing(x1.5) 0 spacing();
    }

        .c-alert-icon--warning {
            margin-right: 10px;
        }

    vue-button.c-alert-dismiss { // TODO: Needed more specificity here.
        text-indent: 0;
        margin-left: auto;
        margin-right: spacing();
        z-index: zIndex(high);

        &:hover {
            cursor: pointer;
        }
    }

        .c-alert-dismiss-icon {
            height: 13px;
        }
</style>
