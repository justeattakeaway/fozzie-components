<template>
    <div
        v-if="items && items.length"
        :class="$style['c-promotionsShowcase']"
        data-test-id="promotionsShowcase">
        <div
            :class="$style['c-promotionsShowcase-inner']">
            <component
                :is="itemTag(item)"
                v-for="(item, index) in items"
                :key="`promotionItem-${index}`"
                v-bind="linkAttrs(item)"
                :class="{
                    [$style['c-promotionsShowcase-item']]: true,
                    [$style['c-promotionsShowcase-item--interactive']]: isFunction(item.link)
                }"
                data-test-id="promotionsShowcase-item"
                @click="dispatchClick(item, $event)">
                <div
                    v-if="isVueComponent(item.illustration)"
                    :class="$style['c-promotionsShowcase-itemElement']"
                    data-test-id="promotionsShowcase-itemElement">
                    <div
                        :class="$style['c-promotionsShowcase-itemIllustrationContainer']">
                        <component
                            :is="item.illustration"
                            :class="$style['c-promotionsShowcase-itemIllustration']"
                            data-test-id="promotionsShowcase-itemIllustration" />
                    </div>
                </div>
                <div
                    :class="$style['c-promotionsShowcase-itemElement']"
                    data-test-id="promotionsShowcase-itemElement">
                    <h4 data-test-id="promotionsShowcase-itemTitle">
                        {{ item.title }}
                    </h4>
                    <p
                        v-for="(line, lineIndex) in getLines(item.lines)"
                        :key="`promotionItem-${index}-subLine-${lineIndex}`"
                        :class="$style[`c-promotionsShowcase-itemElement--${line.style}`]"
                        data-test-id="promotionsShowcase-itemText">
                        {{ line.text }}
                    </p>
                </div>
            </component>
        </div>
    </div>
</template>

<script>
import { STYLE_TEXT } from '../constants';

function isString (item) {
    return typeof (item) === 'string'
        || item instanceof String;
}

export default {
    components: {},

    props: {
        items: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        dispatchClick (item, event) {
            return this.isFunction(item.link) && item.link(event);
        },

        getLines (lines) {
            return lines.map(line => (isString(line)
                ? {
                    text: line,
                    style: STYLE_TEXT
                }
                : line));
        },

        isFunction (item) {
            return typeof item === 'function';
        },

        isVueComponent (component) {
            return component?.render instanceof Function
                || isString(component?.template)
                || (component instanceof Function && component.name === 'VueComponent');
        },

        itemTag (item) {
            if (isString(item.link) || isString(item.link?.href)) {
                return 'a';
            }

            return this.isFunction(item.link)
                ? 'button'
                : 'div';
        },

        linkAttrs (item) {
            if (this.isFunction(item?.link)) {
                return false;
            }

            return isString(item?.link)
                ? { href: item?.link }
                : { ...item?.link };
        }
    }
};
</script>

<style lang="scss" module>
.c-promotionsShowcase {
    background-color: $color-support-brand-02;
    padding: spacing(d);
}

.c-promotionsShowcase-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $color-container-default;

    box-shadow: $elevation-02;

    border-radius: $radius-rounded-c;

    @include media('>=wide') {
        flex-direction: row;
    }
}

.c-promotionsShowcase-item {
    display: flex;
    flex-direction: row;
    padding: spacing(d);
    text-decoration: none;

    // Override button styles
    border: none;
    background: transparent;
    font-family: inherit;
    text-align: inherit;

    @include media('>=wide') {
        flex-grow: 1;
    }

    & + & {
        border-top: 1px solid $color-border-default;

        @include media('>=wide') {
            border-top: none;
        }
    }
}

.c-promotionsShowcase-itemElement {
    & + & {
        margin-left: spacing(d);
    }
}

.c-promotionsShowcase-itemElement--styleText,
.c-promotionsShowcase-itemElement--styleLink,
.c-promotionsShowcase-itemElement--styleEmphasized {
    @include font-size(body-s);
    margin-top: spacing();

    &:nth-of-type(1) {
        margin-top: spacing(a);
    }
}

.c-promotionsShowcase-item--interactive {
    cursor: pointer;
}

.c-promotionsShowcase-itemElement--styleLink {
    color: $color-content-link;
    font-weight: $font-weight-bold;

    .c-promotionsShowcase-item:hover & {
        text-decoration: underline;
    }
}

.c-promotionsShowcase-itemElement--styleEmphasized {
    text-decoration: underline;
    font-weight: $font-weight-bold;
}

.c-promotionsShowcase-itemIllustrationContainer {
    position: relative;
    height: 0;
    width: 30px;
    padding: 0 0 100%;
}

.c-promotionsShowcase-itemIllustration {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    overflow: visible !important;
}
</style>
