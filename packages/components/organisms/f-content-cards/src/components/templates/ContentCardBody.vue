<template>
    <div :class="$style['c-content-card-bodyWrapper']">
        <div :class="$style['c-content-card-body']">
            <slot name="title">
                <h3
                    v-if="title"
                    data-test-id="content-card-title"
                    :class="$style['c-content-card-title']">
                    {{ title }}
                </h3>
            </slot>
            <slot name="subtitle">
                <p
                    v-if="subtitle"
                    data-test-id="content-card-subtitle"
                    :class="$style['c-content-card-subtitle']">
                    {{ subtitle }}
                </p>
            </slot>
            <slot name="description">
                <template v-if="description">
                    <p
                        v-for="(text, index) in description"
                        :key="`description-${index}`"
                        data-test-id="content-card-description-item"
                        :class="$style['c-content-card-description']">
                        {{ text }}
                    </p>
                </template>
            </slot>
            <div :class="[$style['c-content-card-footer'], hasBorderFooter ? $style['c-content-card-footer--border'] : '']">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hasBorderFooter: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: null
        },

        subtitle: {
            type: String,
            default: null
        },

        description: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>

<style lang="scss" module>
.c-content-card-body {
    margin-top: -(spacing(e));
    width: 100%;
    background-color: #fff;
    padding: spacing(d);
    border-radius: 12px;
    box-shadow: $elevation-box-shadow-01;
}

.c-content-card-title {
    @include font-size(heading-s);
    margin-bottom: spacing(b);
    text-decoration: none;
}

.c-content-card-subtitle {
    margin-top: 0;
    margin-bottom: spacing(b);
    text-decoration: none;
}

.c-content-card-description {
    @include font-size(caption);
    margin-top: 0;
    margin-bottom: spacing(d);
    text-decoration: none;
}

.c-content-card-footer {
    padding-top: spacing(d);
}

.c-content-card-footer--border {
    border-top: 1px solid $color-border-default;
}

.c-content-card-bodyWrapper {
    z-index: 10;
    width: 100%;
    @include media('<=narrow') {
        padding: spacing(d);
    }
}
</style>
