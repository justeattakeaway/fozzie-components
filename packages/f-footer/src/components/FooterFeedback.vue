<template>
    <div>
        <h2>{{ title }}</h2>
        <p>
            {{ text }}
            <button>{{ buttonText }}</button>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: ''
        }
    }
};
</script>

<style>

</style>
