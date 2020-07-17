<template>
    <div class="c-skeletonLoader">
        <template v-for="(skeletons, index) in count">
            <div
                :key="index"
                class="c-skeletonLoader-card"
                data-test-id="contentCard-skeletonLoader"
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
        }
    }
};
</script>

<style lang="scss">
    .c-skeletonLoader {
        margin-top: 40px;

        @include media('>=narrowMid') {
            display: flex;
            flex-flow: wrap;
            flex-direction: row;
        }
    }
    .c-skeletonLoader-card {
        border-radius: $contentCardRadius;
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
    }

    /**
     * 1. Magic number to match card height
     * 2. Using radial and linear gradients to create greyed out placeholder elements in preloading component
     */
    .c-skeletonLoader-card:empty {
        height: 403px; // 1
        background-color: $white;

        // 2
        background-image: radial-gradient(0 at 0 0, lightgray 99%, transparent 0),
                          linear-gradient(100deg, rgba(255, 255, 255, 0) 0%,
                                                  rgba(255, 255, 255, 0) 30%,
                                                  rgba(255, 255, 255, 0.5) 50%,
                                                  rgba(255, 255, 255, 0) 70%), // shine
                          linear-gradient(to left, gray 23px, transparent 0), // restaurant thumbnail placeholder left
                          linear-gradient(to right, gray 23px, transparent 0), // restaurant thumbnail placeholder right
                          linear-gradient(lightgray 170px, transparent 0), // restaurant hero image placeholder
                          linear-gradient(lightgray 20px, transparent 0), // line one
                          linear-gradient(lightgray 20px, transparent 0), // line two
                          linear-gradient(lightgray 20px, transparent 0); // line three

        background-repeat: no-repeat;

        background-size: 100px 457px,
        100px 657px,
        50% 46px,
        50% 46px,
        100% 170px,
        80% 20px,
        40% 20px,
        65% 20px;

        background-position: 0 0,
        -100px -100px,
        0 147px,
        100% 147px,
        0 0,
        20px 230px,
        20px 260px,
        20px 300px;

        animation: shine 1.5s linear 1s infinite;
    }

    @keyframes shine {
        33%, to {
            background-position: 0 0,
            140% -100px,
            0 147px,
            100% 147px,
            0 0,
            20px 230px,
            20px 260px,
            20px 300px;
        }
    }
</style>
