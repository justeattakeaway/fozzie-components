<template>
    <div :class="[$style['c-skeletonLoader'], { [$style['c-skeletonLoader--fullWidth']]: isFullWidth }]">
        <template v-for="(skeletons, index) in count">
            <div
                :key="index"
                :class="[$style['c-skeletonLoader-card'], $style[`c-skeletonLoader-card--${type}`]]"
                :data-test-id="`contentCard-skeletonLoader-${type}`"
            />
        </template>
    </div>
</template>

<script>
export default {
    name: 'SkeletonLoader',
    props: {
        count: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'promo',
            validator (value) {
                return ['promo', 'postOrder'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        isFullWidth () {
            return this.count === 1;
        }
    }
};
</script>

<style lang="scss" module>
    .c-skeletonLoader {
        margin-top: 40px;

        @include media('>=narrowMid') {
            display: flex;
            flex-flow: wrap;
            flex-direction: row;
        }
    }

    .c-skeletonLoader-card {
        border-radius: $radius-rounded-c;
        display: flex;
        flex-direction: column;
        flex: 0 0 40%;
        margin: 0 spacing() spacing(x3) 0;
        width: 100%;
        padding: spacing(x3) spacing(x2);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

        @include media('>=narrowMid') {
            flex-direction: row;
            max-width: 370px;
            flex: 0 0 40%;
        }

        .c-skeletonLoader--fullWidth & {
            @include media('>=narrowMid') {
                max-width: 100%;
                flex: 0 0 100%;
            }
        }
    }

    /**
     * 1. Magic number to match card height
     * 2. Using gradients to create placeholder elements resembling the post order content cards (as default)
     * 3. Using gradients to create placeholder elements resembling promotional content cards
     */
    .c-skeletonLoader-card:empty {
        position: relative;
        height: 403px; // 1
        background-color: $color-container-default;
        background-repeat: no-repeat;

        // 2
        background-image: radial-gradient(0 at 0 0, $color-grey-40 99%, transparent 0),
                          linear-gradient(to right, white 20px, transparent 0), // 2.1 right margin
                          linear-gradient($color-grey-40 20px, transparent 0), // 2.2 title placeholder
                          linear-gradient($color-grey-40 220px, transparent 0), // 2.3 main image placeholder
                          linear-gradient($color-grey-40 20px, transparent 0), // 2.4 line one placeholder
                          linear-gradient($color-grey-40 20px, transparent 0), // 2.5 line two placeholder
                          linear-gradient($color-grey-40 20px, transparent 0); // 2.6 line three placeholder
        background-size: 100px 457px,
                         20px 100%, // 2.1
                         50% 20px, // 2.2
                         100% 220px, // 2.3
                         100% 20px, // 2.4
                         65% 20px, // 2.5
                         40% 20px; // 2.6
        background-position: 0 0,
                         100% 0, // 2.1
                         20px 20px, // 2.2
                         20px 56px, // 2.3
                         20px 292px, // 2.4
                         20px 328px, // 2.5
                         20px 364px; // 2.6

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(100deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 70%) -100px -100px/100px 657px no-repeat;
            animation: shine 1.5s linear 1s infinite;
        }

        &.c-skeletonLoader-card--promo {
            // 3
            background-image: radial-gradient(0 at 0 0, $color-grey-40 99%, transparent 0),
                              linear-gradient(to left, $color-grey-50 46px, transparent 0), // 3.1 icon placeholder
                              linear-gradient($color-grey-40 170px, transparent 0), // 3.2 main image placeholder
                              linear-gradient($color-grey-40 20px, transparent 0), //  3.3 line one placeholder
                              linear-gradient($color-grey-40 20px, transparent 0), // 3.4 line two placeholder
                              linear-gradient($color-grey-40 20px, transparent 0); // 3.5 line three placeholder

            background-size: 100px 457px,
                             50% 46px, // 3.1
                             100% 170px, // 3.2
                             80% 20px, // 3.3
                             40% 20px, // 3.4
                             65% 20px; // 3.5

            background-position: 0 0,
                                 23px 147px, // 3.1
                                 0 0, // 3.2
                                 20px 230px, // 3.3
                                 20px 260px, // 3.4
                                 20px 300px; // 3.5
        }
    }

    @keyframes shine {
        33%, to {
            background-position: 140% -100px;
        }
    }
</style>
