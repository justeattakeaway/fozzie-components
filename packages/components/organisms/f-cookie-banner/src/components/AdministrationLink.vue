<template>
    <div class="o-link--bold o-link--full admin-link">
        <a
            href="#"
            class="admin-link">{{ message }}</a>
    </div>
</template>

<script>
export default {
    name: 'AdministrationLink',
    props: {
        message: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.admin-link {
    position: absolute;
    bottom: 20px;
    left: 50%;
    text-decoration: underline;
    transform: translate(-50%, -50%);
}
</style>
