<script>
import { CrossIcon, ClockIcon, PlusIcon } from './entry';
export default {
    name:  'VueIconsLibDev', // vue library dev component
    components: {
        CrossIcon,
        ClockIcon,
        PlusIcon
    },
}
</script>

<template>
    <div class="vue-icons-lib-dev">
        <cross-icon />
        <clock-icon />
        <plus-icon />
        <plus-icon :isThin=false />
    </div>
</template>

<style scoped>
    .vue-icons-lib-dev {
        display: block;
        width: 50px;
        margin: 25px auto;
    }
</style>
