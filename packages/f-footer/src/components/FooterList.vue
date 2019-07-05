<template>
    <div class="c-footer-list">
        <h2>Footer List Component</h2>
        <h3 class="c-footer-heading">
            {{ copy.customerServiceTitle }}
        </h3>

        <ul>
            <li>
                <a
                    v-for="(link, index) in copy.customerServiceLinks"
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
        copy: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style>
.c-footer-list {
    border: 2px solid blue;
}
</style>
