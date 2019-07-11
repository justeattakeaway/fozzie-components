<template>
    <div
        v-if="linkList.links.length"
        class="c-footer-list">
        <h3 class="c-footer-heading">
            {{ linkList.title }}
        </h3>

        <ul>
            <li>
                <a
                    v-for="(link, index) in linkList.links"
                    :key="index"
                    :href="link.url"
                    :rel="link.rel">
                    {{ link.text }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        linkList: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style>
</style>
