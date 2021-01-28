<template>
    <div :class="$style['c-breadcrumbs']">
        <ul :class="$style['c-breadcrumbs-list']">
            <li :class="$style['c-breadcrumbs-item']">
                <a :class="$style['c-breadcrumbs-link']">Home</a>
            </li>
            <li :class="$style['c-breadcrumbs-separator']">
                >
            </li>
            <li :class="$style['c-breadcrumbs-item']">
                <a :class="$style['c-breadcrumbs-link']">For You</a>
            </li>
            <li :class="$style['c-breadcrumbs-separator']">
                >
            </li>
            <li :class="$style['c-breadcrumbs-item']">
                <a :class="[$style['c-breadcrumbs-link'], $style['c-breadcrumbs-link--active']]">Stamp Cards</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'Breadcrumbs',
    components: {},
    props: {
        locale: {
            type: String,
            default: ''
        },
        links: {
            type: Array,
            default: () => []
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
    }
};
</script>

<style lang="scss" module>

$breadcrumbs-text-colour: $white;
$breadcrumbs-background-colour: rgba($black, 0.6);
$breadcrumbs-border-radius: 16px;
$breadcrumbs-not-active-font-weight: $font-weight-bold;
$breadcrumbs-active-font-weight: $font-weight-base;

.c-breadcrumbs {
    display: flex;
}
.c-breadcrumbs-list {
    list-style: none;
    background-color: $breadcrumbs-background-colour;
    border-radius: $breadcrumbs-border-radius;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row;
    align-items: center;
}
.c-breadcrumbs-item {
    padding: spacing(x0.5) spacing(x2);
    @include media('<narrowMid') {
        padding: spacing(x0.5) spacing(x2) spacing(x0.5) spacing();
    }
}
.c-breadcrumbs-item, .c-breadcrumbs-separator {
    @include media('<narrowMid'){
        display: none;
        &:nth-last-child(-n+4):not(:nth-last-child(-n+2)) {
            display: block;
        }
    }
}
.c-breadcrumbs-link {
    color: $breadcrumbs-text-colour;
    font-weight: $breadcrumbs-not-active-font-weight;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
.c-breadcrumbs-separator {
    color: $breadcrumbs-text-colour;
    transform: scale(0.6, 1.2);
    @include media('<narrowMid') {
        margin-left: spacing(x1.5);
        transform: scale(0.6, 1.2) rotate(180deg);
        margin-top: 2px;
    }
}
.c-breadcrumbs-link--active {
    font-weight: $breadcrumbs-active-font-weight;
}

</style>
