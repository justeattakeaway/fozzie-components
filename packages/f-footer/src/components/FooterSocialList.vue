<template>
    <div>
        <h2>{{ title }}</h2>
        <ul>
            <li
                v-for="(icon, index) in socialIcons"
                :key="index">
                <a
                    :href="icon.url"
                    target="_blank">
                    <img
                        src="/"
                        :alt="icon.altText">
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        socialIcons: {
            type: Array,
            default: () => ({})
        }
    }
};
</script>

<style>

</style>
