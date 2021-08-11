<template>
    <div
        data-test-id="tabs-component"
        :class="$style['c-tabs']">
        <div :class="$style['c-tabs-header']">
            <div :class="$style['c-tabs-buttons']">
                <button
                    v-for="({ name, title }, i) in tabs"
                    :key="i"
                    type="button"
                    :class="[
                        { [$style['c-tabs-button--active']]: activeTab === name },
                        $style['c-tabs-button']
                    ]"
                    :data-test-id="`tab-button-${name}`"
                    @click="selectTabIndex(name)">
                    {{ title }}
                </button>
            </div>
        </div>
        <div :class="$style['c-tabs-body']">
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
    name: 'Tabs',

    props: {
        animate: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        direction: null,
        activeTab: '',
        tabs: []
    }),

    provide () {
        const component = this;
        const tabsComponent = {};

        Object.defineProperty(tabsComponent, 'activeTab', {
            enumerable: true,
            get: () => this.activeTab
        });

        Object.defineProperty(tabsComponent, 'animationDirection', {
            enumerable: true,
            get: () => this.direction
        });

        Object.defineProperty(tabsComponent, 'animate', {
            enumerable: true,
            get: () => this.animate
        });

        return {
            [REGISTER]: tab => {
                component.addTab(tab);
            },

            [SELECT]: name => {
                component.selectTabIndex(name);
            },

            [TABS_COMPONENT]: tabsComponent,

            [UPDATE_TITLE]: (name, title) => {
                component.updateTabTitle(name, title);
            }
        };
    },
    methods: {

        /**
         * This function is used to select the tab index and set the active tab while applying the correct animation
         * uses the tab name to select index
         * @param name
         */
        selectTabIndex (name) {
            if (this.activeTab === name) return;

            const previousIndex = this.tabs.findIndex(t => t.name === this.activeTab);
            const newIndex = this.tabs.findIndex(t => t.name === name);

            this.direction = (newIndex > previousIndex) ? DIRECTION.LEFT : DIRECTION.RIGHT;

            this.$emit('change', {
                new: newIndex,
                prev: previousIndex
            });

            this.activeTab = name;
        },

        /**
         * This function adds a tab that is calling the register tab callback
         * @param tab
         */
        addTab (tab) {
            if (tab.selected) {
                this.activeTab = tab.name;
            }
            this.tabs = [...this.tabs, tab];
        },

        /**
         * This function looks for a tab with the given name and updates its title
         * @param name {string}
         * @param title {string}
         */
        updateTabTitle (name, title) {
            const tab = this.tabs.find(t => t.name === name);
            if (tab) {
                tab.title = title;
            }
        }
    }
};
</script>

<style lang="scss" module>

$tabs-link-colour         : $color-content-default;
$tabs-link-font-weight    : $font-weight-bold;
$tabs-link-border-colour  : $color-orange-30;

.c-tabs {
    width: 100%;
    height: 100%;
}
.c-tabs-header {
    width: 100%;
    height: 42px;
}
.c-tabs-buttons {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;

    @include media('<narrowMid') {
        width: 100%;
    }

}
.c-tabs-button {
    padding: spacing(x1.5) spacing(x2);
    cursor: pointer;
    color: $tabs-link-colour;
    border: none;
    background-color: transparent;
    outline: none;

    @include media('<narrowMid') {
        /* stylelint-disable */
        flex: 1 1 0px;// important px for IE
        /* stylelint-enable */
    }

}
.c-tabs-button--active {
    border-bottom: 2px solid $tabs-link-border-colour;
    font-weight: $tabs-link-font-weight;
}
.c-tabs-body {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}

</style>
