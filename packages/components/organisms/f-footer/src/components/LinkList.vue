<template>
    <div
        v-if="linkList.links.length"
        :class="[$style['c-footer-panel'], {
            'is-collapsed': panelCollapsed
        }]"
        data-test-id="linkList-wrapper">
        <h2>
            <button
                :id="listHeadingId"
                :tabindex="isBelowWide ? 0 : -1"
                :disabled="!isBelowWide"
                :aria-disabled="!isBelowWide"
                :aria-expanded="!panelCollapsed ? 'true' : 'false'"
                :aria-controls="listId"
                :class="[
                    'c-footer-heading',
                    'c-footer-heading--button'
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
            class="c-footer-list">
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
        }
    },
    mounted () {
        this.currentScreenWidth = windowServices.getWindowWidth();
        windowServices.addEvent('resize', this.onResize, 100);

        this.setPanelCollasped();
    },
    destroyed () {
        windowServices.removeEvent('resize', this.onResize);
    },
    methods: {
        setPanelCollasped () {
            const initialOrInteractedState = this.interactedState === null ? true : this.interactedState;

            this.panelCollapsed = this.isBelowWide ? initialOrInteractedState : false;
        },
        onPanelClick () {
            if (this.isBelowWide) {
                this.interactedState = !this.panelCollapsed;
                this.setPanelCollasped();
            }
        },
        onResize () {
            const newScreenWidth = windowServices.getWindowWidth();

            // Mobile trigger `resise` on scroll - address bar collapse
            if (this.currentScreenWidth !== newScreenWidth) {
                this.currentScreenWidth = newScreenWidth;

                this.setPanelCollasped();
            }
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/icons.scss';

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
