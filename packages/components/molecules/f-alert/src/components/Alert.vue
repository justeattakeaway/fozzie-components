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
            <f-button
                v-if="isDismissible"
                type="button"
                is-icon
                :class="[$style['c-alert-dismiss']]"
                button-size="xsmall"
                button-type="ghostTertiary"
                data-test-id="alert-dismiss"
                @click.native="dismiss">
                <cross-icon
                    :class="[$style['c-alert-dismiss-icon']]"
                />
                <span class="is-visuallyHidden">
                    {{ copy.dismissAlertText }}
                </span>
            </f-button>
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

import {
    globalisationServices
} from '@justeat/f-services';

import FButton from '@justeat/f-button';
import tenantConfigs from '../tenants';

export default {
    name: 'FAlert',
    components: {
        CrossIcon,
        DangerIcon,
        InfoIcon,
        SuccessIcon,
        WarningIcon,
        FButton
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
        isDismissible: {
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
$alert-borderRadius: $radius-rounded-c;

.c-alert {
    position: relative;
    padding: spacing(d);
    margin-top: spacing(d);
    border: 0;
    border-radius: $alert-borderRadius;
}

.c-alert-headingContainer {
    display: flex;
    align-items: center;
    margin-top: 2px;
}

.c-alert--success {
    @include alert-variant($color-support-positive-02, $color-content-default);
}

.c-alert--warning {
    @include alert-variant($color-support-warning-02, $color-content-default);
}

.c-alert--danger {
    @include alert-variant($color-support-error-02, $color-content-default);
}

.c-alert--info {
    @include alert-variant($color-support-info-02, $color-content-default);
}

.c-alert-heading {
    @include font-size(subheading-s);
    vertical-align: middle;
    margin-top: 0;
    margin-left: spacing(d);
}

.c-alert-content {
    @include font-size(body-l);
    margin-top: spacing(a);
    margin-left: spacing(g);
}

.c-alert-icon {
    width: 23px;
    height: 23px;
}

.c-alert-dismiss {
    margin-left: auto;
    z-index: zIndex(high);

    &:hover {
        cursor: pointer;
    }
}

.c-alert-dismiss-icon {
    path {
        fill: $color-content-subdued;
    }
}
</style>
