<template>
    <div>
        <h2>{{ title }}</h2>
        <ul>
            <li
                v-for="(icon, index) in appsIcons"
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
        appsIcons: {
            type: Array,
            default: () => ({})
        }
    }
};
</script>

<style>

</style>
