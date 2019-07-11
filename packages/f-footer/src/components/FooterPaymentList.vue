<template>
    <div>
        <ul>
            <li
                v-for="(icon, index) in paymentIcons"
                :key="index">
                <img
                    src="/"
                    :alt="icon.altText">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        paymentIcons: {
            type: Array,
            default: () => ({})
        }
    }
};
</script>

<style>

</style>
