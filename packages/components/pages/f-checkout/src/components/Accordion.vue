<template>
    <div>
        <button
            :id="`${id}-accordion-header`"
            :aria-controls="`${id}-header`"
            :aria-expanded="isExpanded"
            :class="$style['c-checkout-accordion-header']"
            :data-test-id="`${id}-accordion-header`"
            type="button"
            @click="toggle">
            {{ title }}
            <chevron-icon
                :class="[
                    $style['c-checkout-accordion-header-arrow'], {
                        [$style['c-checkout-accordion-header-arrow--expanded']]: isExpanded
                    }]" />
        </button>
        <section
            :id="`${id}-accordion-section`"
            :aria-labelledby="`${id}accordion-section`"
            :class="[
                $style['c-checkout-accordion-section'], {
                    [$style['c-checkout-accordion-section--hidden']]: !isExpanded
                }]"
        >
            <slot />
        </section>
    </div>
</template>

<script>
import { ChevronIcon } from '@justeat/f-vue-icons';

export default {
    name: 'CheckoutAccordion',
    components: {
        ChevronIcon
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            isExpanded: false
        };
    },
    methods: {
        toggle () {
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$icon-size: f.$font-size-base-px;
.c-checkout-accordion-header {
    @include f.font-size('body-s');
    display: flex;
    justify-content: space-between;
    background: transparent;
    border: none;
    border-bottom: 1px solid f.$color-border-strong;
    color: f.$color-content-default;
    cursor: pointer;
    font-weight: f.$font-weight-bold;
    padding: f.spacing(d) 0;
    margin-top: f.spacing(d);
    outline: none;
    text-decoration: none;
    text-align: left;
    width: 100%;
    .c-checkout-accordion-header-arrow {
        height: $icon-size;
        width: $icon-size;
    }
    .c-checkout-accordion-header-arrow--expanded {
        transform: rotate(180deg);
    }
}
.c-checkout-accordion-section--hidden {
    display: none;
}
</style>
