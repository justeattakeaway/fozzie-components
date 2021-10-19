<template>
    <div
        v-if="items"
        :class="$style['c-promotionsShowcase']"
        data-test-id="promotionsShowcase">
        <template
            v-for="(item, index) in items">
            <component
                :is="isString(item.link) ? 'a' : 'div'"
                :key="`promotionItem-${index}`"
                :href="isString(item.link) && item.link"
                :class="{
                    [$style['c-promotionsShowcase--item']]: true,
                    [$style['c-promotionsShowcase--itemInteractive']]: isFunction(item.link)
                }"
                @click="isFunction(item.link) && item.link($event)">
                <div
                    v-if="isVueComponent(item.illustration)"
                    :class="$style['c-promotionsShowcase--itemElement']">
                    <div
                        :class="$style['c-promotionsShowcase--itemIllustrationContainer']">
                        <component
                            :is="item.illustration"
                            :class="$style['c-promotionsShowcase--itemIllustration']" />
                    </div>
                </div>
                <div :class="$style['c-promotionsShowcase--itemElement']">
                    <h4>{{ item.title }}</h4>
                    <p
                        v-for="(line, lineIndex) in getLines(item.lines)"
                        :key="`promotionItem-${index}-subLine-${lineIndex}`"
                        :class="$style[`c-promotionsShowcase--itemElement--${line.style}`]">
                        {{ line.text }}
                    </p>
                </div>
            </component>
        </template>
    </div>
</template>

<script>
import { STYLE_TEXT } from '../constants';

function isString (item) {
    return typeof (item) === 'string'
        || item instanceof String;
}

export default {
    name: 'PromotionsShowcase',
    components: {},
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        isVueComponent (component) {
            return component?.render instanceof Function;
        },
        getLines (lines) {
            return lines.map(line => (isString(line)
                ? {
                    text: line,
                    style: STYLE_TEXT
                }
                : line));
        },
        isString,
        isFunction (link) {
            return link instanceof Function;
        }
    }
};
</script>

<style lang="scss" module>

$promotionsItems-borderRadius                        : $radius-rounded-c;

.c-promotionsShowcase {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $color-orange-10;
}

.c-promotionsShowcase--item {
    display: flex;
    flex-direction: row;
    margin: 0 spacing(x2) 0;
    padding: spacing(x2);
    background-color: $color-white;
    text-decoration: none;

    box-shadow: 0 4px 6px rgba(27, 35, 36, 0.02),
        0 2px 12px -2px rgba(27, 35, 36, 0.08),
        0 3px 6px rgba(27, 35, 36, 0.06);

    &:first-child {
        margin-top: spacing(x2);
        border-top-left-radius: $promotionsItems-borderRadius;
        border-top-right-radius: $promotionsItems-borderRadius;
    }

    &:last-child {
        margin-bottom: spacing(x2);
        border-bottom-left-radius: $promotionsItems-borderRadius;
        border-bottom-right-radius: $promotionsItems-borderRadius;
    }

    &:not(*:first-child) {
        border-top: 1px solid $color-grey-40;
    }
}

.c-promotionsShowcase--itemElement {
    &:not(*:first-child) {
        margin-left: spacing(x2);
    }
}

.c-promotionsShowcase--itemElement--styleText,
.c-promotionsShowcase--itemElement--styleLink,
.c-promotionsShowcase--itemElement--styleEmphasized {
    &:nth-of-type(1) {
        margin-top: spacing(x0.5);
    }

    margin-top: spacing();
}

.c-promotionsShowcase--itemInteractive {
    cursor: pointer;
}

.c-promotionsShowcase--itemElement--styleLink {
    color: $color-content-link-distinct;
    font-weight: $font-weight-bold;

    &:hover {
        color: lighten($color-content-link-distinct, $color-hover-02);
        text-decoration: underline;
    }

    &:active,
    &:focus {
        color: lighten($color-content-link-distinct, $color-active-02);
    }
}



.c-promotionsShowcase--itemElement--styleEmphasized {
    text-decoration: underline;
    font-weight: $font-weight-bold;
}

.c-promotionsShowcase--itemIllustrationContainer {
    position: relative;
    height: 0;
    width: 30px;
    padding: 0 0 100%;
}

.c-promotionsShowcase--itemIllustration {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    &#{&} { // to increase specificity level to override svg:not(:root) rule
        overflow: visible;
    }
}

</style>
