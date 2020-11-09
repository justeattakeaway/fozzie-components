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
    AppIosNoIcon as IosIconNbNo,
    AppHuaweiUkIcon as HuaweiIconEnGb
} from '@justeat/f-vue-icons';
import iconPropsMixin from '../mixins/iconProps.mixin';

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
        IosIconNbNo,
        HuaweiIconEnGb
    },

    mixins: [
        iconPropsMixin
    ],

    computed: {
        iconComponent () {
            return `${this.name}-icon-${this.locale.toLowerCase()}`;
        }
    }
};
</script>
