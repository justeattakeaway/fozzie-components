<template>
    <div :class="$style['c-content-card-bodyWrapper']">
        <div :class="$style['c-content-card-body']">
            <div :class="$style['c-content-card-bodyTop']">
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
            </div>
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-content-card-bodyTop {
    flex-grow: 1;
}
.c-content-card-body {
    width: 100%;
    background-color: #fff;
    padding: spacing(d);
    border-radius: 12px;
    height: 100%;
    box-shadow: f.$elevation-box-shadow-01;
    display: flex;
    flex-direction: column;
}

.c-content-card-title {
    @include f.font-size(heading-s);
    margin-bottom: spacing(b);
    text-decoration: none;
}

.c-content-card-subtitle {
    margin-top: 0;
    margin-bottom: f.spacing(b);
    text-decoration: none;
}

.c-content-card-description {
    @include f.font-size(caption);
    margin-top: 0;
    margin-bottom: f.spacing(d);
    text-decoration: none;
}

.c-content-card-footer {
    padding-top: f.spacing(d);
}

.c-content-card-footer--border {
    border-top: 1px solid f.$color-border-default;
}

.c-content-card-bodyWrapper {
    margin-top: -(f.spacing(e));
    z-index: 10;
    width: 100%;
    flex-grow: 1;
    @include f.media('<=narrow') {
        padding: f.spacing(d);
    }
}
</style>
