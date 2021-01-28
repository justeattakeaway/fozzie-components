<template>
    <transition
        v-if="animateTab"
        :name="transitionName">
        <div
            v-show="isActive"
            :class="[$style['c-tab']]">
            <slot />
        </div>
    </transition>
    <div v-else>
        <div
            v-show="isActive"
            :class="[$style['c-tab']]">
            <slot />
        </div>
    </div>
</template>

<script>
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
            required: false,
            type: Boolean,
            default: false
        }
    },
    inject: ['register', 'tabsComponent'],
    computed: {
        isActive () {
            return this.tabsComponent.activeTab === this.name;
        },
        transitionName () {
            return this.tabsComponent.animationDirection === 'LEFT' ?
                this.$style['fade-in-right'] : this.$style['fade-in-left'];
        },
        animateTab () {
            return this.tabsComponent.animate;
        }
    },
    created () {
        this.register({
            name: this.name,
            title: this.title,
            selected: this.selected
        });
    }
};
</script>

<style lang="scss" module>
/* stylelint-disable -- does not understand syntax. */
.c-tab {
    padding: spacing() 0;
    left: 0;
    top: 0;
    grid-area: 1/1;
}
@keyframes fadeInLeft {
    from {
        transform: translate3d(-40px, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

.fade-in-left {
    &:global(-enter-to) {
        opacity: 0;
        animation-duration: 0.7s;
        animation-fill-mode: both;
        animation-name: fadeInLeft;
    }
    &:global(-enter) {
        opacity: 0;
        transform: translate3d(-40px, 0, 0);
    }
    &:global(-leave-to) {
        opacity: 0;
        transition: opacity 0.3s;
    }
}
@keyframes fadeInRight {
    from {
        transform: translate3d(40px, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

.fade-in-right {
    &:global(-enter-to) {
        opacity: 0;
        animation-duration: 0.7s;
        animation-fill-mode: both;
        animation-name: fadeInRight;
    }
    &:global(-enter) {
        opacity: 0;
        transform: translate3d(40px, 0, 0);
    }
    &:global(-leave-to) {
        opacity: 0;
        transition: opacity 0.3s;
    }
}
</style>
