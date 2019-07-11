<template>
    <div
        v-if="text">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
};
</script>

<style>

</style>


