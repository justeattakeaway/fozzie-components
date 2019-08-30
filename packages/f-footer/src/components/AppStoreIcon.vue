<template>
    <component :is="iconComponent" />
</template>

<script>
import {
    AppAndroidDkIcon as AndroidIconDaDk,
    AppAndroidIcon as AndroidIconEnGb,
    AppAndroidEsIcon as AndroidIconEsEs,
    AppAndroidItIcon as AndroidIconItIt,
    AppAndroidNoIcon as AndroidIconNbNo,
    AppIosDkIcon as IosIconDaDk,
    AppIosIcon as IosIconEnGb,
    AppIosEsIcon as IosIconEsEs,
    AppIosItIcon as IosIconItIt,
    AppIosNoIcon as IosIconNbNo
} from '@justeat/f-vue-icons';

export default {
    components: {
        AndroidIconDaDk,
        AndroidIconEnGb,
        AndroidIconEnIe: AndroidIconEnGb,
        AndroidIconEnAu: AndroidIconEnGb,
        AndroidIconEnNz: AndroidIconEnGb,
        AndroidIconEsEs,
        AndroidIconItIt,
        AndroidIconNbNo,
        IosIconDaDk,
        IosIconEnGb,
        IosIconEnIe: IosIconEnGb,
        IosIconEnAu: IosIconEnGb,
        IosIconEnNz: IosIconEnGb,
        IosIconEsEs,
        IosIconItIt,
        IosIconNbNo
    },
    props: {
        name: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            required: false,
            default: 'en-GB'
        }
    },
    computed: {
        iconComponent () {
            return `${this.name}-icon-${this.locale.toLowerCase()}`;
        }
    }
};
</script>
