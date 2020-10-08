<template>
    <div
        :class="[$style['c-alert'],
                 $style[`c-alert--${type}`]]"
        data-test-id='alert-component'>
        <div
            :class="$style['c-alert-heading-container']">
            <alert-icon
                :class="[$style['c-icon--alert'], $style['c-alert-icon']]" />
            <!-- TODO: make this dynamic. See https://skipthedishes.atlassian.net/browse/WCB-1219 -->
            <h2
                :class="$style['c-alert-heading']">
                <slot name="heading" />
            </h2>
            <button
                v-if="isDismissable"
                type="button"
                :class="[$style['c-alert-dismiss'], 'o-btn o-btn--icon']"
                @click="dismiss">
                <cross-icon
                    :class="[$style['c-icon--cross'], $style['c-alert-dismiss-icon']]" />
            </button>
        </div>
        <div
            :class="$style['c-alert-content']">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
import { CrossIcon, AlertIcon } from '@justeat/f-vue-icons';

export default {
    name: 'VueAlert',
    components: { CrossIcon, AlertIcon },
    props: {
        locale: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'neutral',
            validator: value => ['success', 'warning', 'info', 'danger', 'neutral'].indexOf(value) !== -1
        },
        isDismissable: {
            type: Boolean,
            default: false
        }
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
    padding-bottom: spacing(x1.5);
    margin-top: spacing(x2);
    border: 0;
}
    .c-alert-heading-container {
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

    .c-alert--neutral {
        @include alert-variant($color-bg--darker, $color-text);
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

    button.c-alert-dismiss { // TODO: Needed more specificity here.
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
