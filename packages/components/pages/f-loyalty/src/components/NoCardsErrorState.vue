<template>
    <div :class="$style['c-noCardsError']">
        <img
            :class="$style['c-noCardsError-icon']"
            :src="`stampcards-empty-${$t('percentage')}.svg`"
            alt="">
        <h3 :class="$style['c-noCardsError-title']">
            {{ $t('stamps.errorNoCards.title') }}
        </h3>
        <p
            :class="$style['c-noCardsError-subTitle']">
            {{ $t('stamps.errorNoCards.subTitle') }}
        </p>
    </div>
</template>

<script>

export default {
    name: 'NoCardsErrorState',

    props: {
        engagementLabel: {
            type: String,
            required: true
        }
    },

    mounted () {
        // eslint-disable-next-line no-unused-expressions
        window?.trak?.event({
            category: 'engagement',
            action: 'view_stampcards',
            label: this.engagementLabel
        });
    }
};
</script>

<style lang="scss" module>

$stampCard-responsive-mobileViewBreakpoint: '<=narrowMid';
$stampCard-responsive-notMobileViewBreakpoint: '>narrowMid';
$stampCard-iconSize: 96px;

.c-noCardsError {
    width: 100%;
    padding-top: spacing(x0.5);
    min-height: $stampCard-iconSize + spacing(x0.5); // Icon size plus padding

    @include media($stampCard-responsive-notMobileViewBreakpoint) {
        margin-left: spacing();
        margin-right: spacing();
    }
}

.c-noCardsError-icon {
    float: left;
    margin-right: spacing();
    width: $stampCard-iconSize;
    height: $stampCard-iconSize;
    display: flex;
    justify-content: center;
    align-items: center;
}

.c-noCardsError-title {
    @include media($stampCard-responsive-mobileViewBreakpoint) {
        @include font-size(heading-s, true, narrow);
    }
}

.c-noCardsError-title,
.c-noCardsError-subTitle {
    margin-left: spacing();
    margin-right: spacing();
}
</style>
