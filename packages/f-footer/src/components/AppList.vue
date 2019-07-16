<template>
    <div>
        <h2 class="c-footer-heading">
            {{ title }}
        </h2>
        <ul>
            <li
                v-for="(icon, index) in appsIcons"
                :key="index">
                <a :href="icon.url">
                    <app-store-icon :name="icon.name" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { AppStoreIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        AppStoreIcon
    },
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

<style lang="scss">

</style>
