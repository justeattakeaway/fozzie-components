<template>
    <div>
        <button
            :id="id + '-accordion-header'"
            :aria-controls="id + '-header'"
            :aria-expanded="isExpanded"
            :class="$style['c-checkout-accordion-header']"
            :data-test-id="id + '-accordion-header'"
            @click="toggle">
            {{ title }}
            <chevron-icon
                :class="[
                    $style['c-checkout-accordion-header-arrow'], {
                        [$style['c-checkout-accordion-header-arrow--expanded']]: isExpanded
                    }]" />
        </button>
        <section
            :id="id + '-accordion-section'"
            :aria-labelledby="id + '-section'"
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
    name: 'Accordion',

    components: {
        ChevronIcon
    },

    props: {
        id: { type: String, required: true },
        title: { type: String, required: true }
    },

    data () {
        return {
            isExpanded: false
        };
    },

    methods: {
        toggle (e) {
            e.preventDefault();
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>

<style lang="scss" module>

    .c-checkout-accordion-header {
        padding: spacing(x2) 0;
        margin-top: spacing(x2);
        width: 100%;
        text-decoration: none;
        text-align: left;
        outline: none;
        border: none;
        border-bottom: 1px solid #c5ccd3;
        background: transparent;
        display: flex;
        color: #2a3846;
        justify-content: space-between;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;

        .c-checkout-accordion-header-arrow {
            $icon-size: 16px;
            height: $icon-size;
            width: $icon-size;
        }

        .c-checkout-accordion-header-arrow--expanded {
            transform: rotate(180deg);
        }
    }

    .c-checkout-accordion-section {
        padding: spacing(x2) 0;
    }

    .c-checkout-accordion-section--hidden {
        display: none;
    }
</style>
