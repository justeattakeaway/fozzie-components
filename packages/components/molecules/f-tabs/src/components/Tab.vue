<template>
    <transition
        v-if="animateTab"
        :name="transitionName">
        <div
            v-show="isActive"
            :data-test-id="`tab-content-${name}`"
            :class="$style['c-tab']">
            <slot />
        </div>
    </transition>
    <div v-else>
        <div
            v-show="isActive"
            :data-test-id="`no-transition-tab-${name}`"
            :class="$style['c-tab']">
            <slot />
        </div>
    </div>
</template>

<script>
import { DIRECTION, INJECTIONS } from '../constants';

const {
    REGISTER,
    SELECT,
    TABS_COMPONENT,
    UPDATE_TITLE
} = INJECTIONS;

export default {
    name: 'Tab',

    props: {
        title: {
            required: true,
            type: String
        },

        name: {
            required: true,
            type: String
        },

        selected: {
            type: Boolean,
            default: false
        }
    },

    inject: [
        REGISTER,
        SELECT,
        TABS_COMPONENT,
        UPDATE_TITLE
    ],

    computed: {
        isActive () {
            return this[TABS_COMPONENT].activeTab === this.name;
        },

        transitionName () {
            return this[TABS_COMPONENT].animationDirection === DIRECTION.LEFT
                ? this.$style['fade-in-right']
                : this.$style['fade-in-left'];
        },

        animateTab () {
            return this[TABS_COMPONENT].animate;
        }
    },

    watch: {
        selected (current, previous) {
            if (current && !previous) {
                this[SELECT](this.name);
            }
        },

        title (current, previous) {
            if (current && current !== previous) {
                this[UPDATE_TITLE](this.name, current);
            }
        }
    },

    created () {
        this[REGISTER]({
            name: this.name,
            title: this.title,
            selected: this.selected
        });
    }
};
</script>

<style lang="scss" module>

$fade-out-transition-duration: 0.3s;
$fade-in-transition-duration: 0.7s;
$fade-in-transition-distance: 40px;


.c-tab {
    padding: spacing() 0;
    left: 0;
    top: 0;
    grid-area: 1/1;
}

@keyframes fadeInLeft {
    from {
        transform: translate3d(-#{$fade-in-transition-distance}, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

.fade-in-left {
    /* stylelint-disable -- does not understand syntax. */
    &:global(-enter-to) {
        opacity: 0;
        animation-duration: $fade-in-transition-duration;
        animation-fill-mode: both;
        animation-name: fadeInLeft;
    }
    &:global(-enter) {
        opacity: 0;
        transform: translate3d(-#{$fade-in-transition-distance}, 0, 0);
    }
    &:global(-leave-to) {
        opacity: 0;
        transition: opacity $fade-out-transition-duration;
    }
    /* stylelint-enable */
}

@keyframes fadeInRight {
    from {
        transform: translate3d($fade-in-transition-distance, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

.fade-in-right {
    /* stylelint-disable -- does not understand syntax. */
    &:global(-enter-to) {
        opacity: 0;
        animation-duration: $fade-in-transition-duration;
        animation-fill-mode: both;
        animation-name: fadeInRight;
    }
    &:global(-enter) {
        opacity: 0;
        transform: translate3d($fade-in-transition-distance, 0, 0);
    }
    &:global(-leave-to) {
        opacity: 0;
        transition: opacity $fade-out-transition-duration;
    }
    /* stylelint-enable */
}
</style>
