<template>
    <div
        v-if="linkList.links.length"
        :class="[
            $style['c-footer-panel'],
            { [$style['is-collapsed']]: panelCollapsed }
        ]"
        :data-test-id="testId">
        <h2>
            <button
                :id="listHeadingId"
                :tabindex="isBelowWide ? 0 : -1"
                :disabled="!isBelowWide"
                :aria-disabled="!isBelowWide"
                :aria-expanded="!panelCollapsed ? 'true' : 'false'"
                :aria-controls="listId"
                :class="[
                    $style['c-footer-heading'],
                    $style['c-footer-heading--button']
                ]"
                data-test-id="linkList-header"
                @click="onPanelClick">
                {{ linkList.title }}
                <chevron-icon
                    :class="[$style['c-icon--chevron'], {
                        [$style['c-icon--chevron--up']]: !panelCollapsed
                    }]" />
            </button>
        </h2>

        <ul
            :id="listId"
            :aria-labelledby="listHeadingId"
            :class="$style['c-footer-list']">
            <li
                v-for="(link, i) in linkList.links"
                :key="i + '_Link'">
                <a
                    :href="link.url"
                    :rel="link.rel"
                    :target="link.target"
                    :class="$style['c-footer-list-link']"
                    :data-trak='`{
                        "trakEvent": "click",
                        "category": "engagement",
                        "action": "footer",
                        "label": "${link.gtm}"
                    }`'>
                    {{ link.text }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ChevronIcon } from '@justeat/f-vue-icons';
import { windowServices } from '@justeat/f-services';

export default {
    components: {
        ChevronIcon
    },
    props: {
        linkList: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            currentScreenWidth: 0,
            interactedState: null,
            panelCollapsed: false
        };
    },
    computed: {
        listId () {
            return `footer-${this.linkList.title.toLowerCase().split(' ').join('-')}`;
        },

        listHeadingId () {
            return `${this.listId}-heading`;
        },

        isBelowWide () {
            return this.currentScreenWidth <= 1024;
        },

        testId () {
            return this.panelCollapsed ? 'linkList-wrapper-collapsed' : 'linkList-wrapper';
        }
    },
    mounted () {
        this.currentScreenWidth = windowServices.getWindowWidth();
        windowServices.addEvent('resize', this.onResize, 100);

        this.setPanelCollapsed();
    },
    destroyed () {
        windowServices.removeEvent('resize', this.onResize);
    },
    methods: {
        /**
         * Sets Links List panel collapsed state.
         * Affects `is-collapsed` panel class.
         * Value for below `wide` screen width is based on saved `interactedState`, intially defaults to `true` - collapsed.
         * Value for wider screens resets to `false` e.g. expanded Links List. (see `onResize`)
         */
        setPanelCollapsed () {
            if (this.isBelowWide) {
                this.panelCollapsed = this.interactedState === null ? true : this.interactedState;
            } else {
                this.panelCollapsed = false;
            }
        },
        /**
         * Handle click events on Link List visibility toggle.
         * Only applied to below `wide` screen width (ref. Fozzie UI breakpoints).
         */
        onPanelClick () {
            if (this.isBelowWide) {
                this.interactedState = !this.panelCollapsed;
                this.setPanelCollapsed();
            }
        },
        /**
         * Handles `resize` window events.
         * Screen width is the only factor that affects Links List presentation.
         * Note: Devices trigger `resize` on scroll when address bar collapses
         */
        onResize () {
            const newScreenWidth = windowServices.getWindowWidth();

            if (this.currentScreenWidth !== newScreenWidth) {
                this.currentScreenWidth = newScreenWidth;

                this.setPanelCollapsed();
            }
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/headings.scss';
@import '../assets/scss/icons.scss';
@import '../assets/scss/lists.scss';

.c-footer-panel {
    flex: 1 0 auto;

    @include media('<wide') {
        border-bottom: 1px solid $footer-borderColor;

        &:last-of-type {
            border-bottom: none;
        }
    }
}

.c-footer-list-link {
    color: $footer-textColor;
    display: inline-block;
    padding: spacing() spacing(x2);
    text-decoration: none;
    width: 100%;

    @include media('>=wide') {
        padding: 0 0 spacing();
        width: auto;
    }

    &:hover {
        text-decoration: underline;
    }
}
</style>
