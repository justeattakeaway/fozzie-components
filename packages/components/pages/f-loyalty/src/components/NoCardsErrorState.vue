<template>
    <div :class="$style['c-noCardsError']">
        <img
            :class="$style['c-noCardsError-icon']"
            :src="`https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-empty-${$t('percentage')}.svg`"
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

$stampCard-responsive-mobileViewBreakpoint: '<=narrowMid';
$stampCard-responsive-notMobileViewBreakpoint: '>narrowMid';
$stampCard-iconSize: 96px;

.c-noCardsError {
    width: 100%;
    padding-top: f.spacing(a);
    min-height: $stampCard-iconSize + f.spacing(a); // Icon size plus padding

    @include f.media($stampCard-responsive-notMobileViewBreakpoint) {
        margin-left: f.spacing();
        margin-right: f.spacing();
    }
}

.c-noCardsError-icon {
    float: left;
    margin-right: f.spacing();
    width: $stampCard-iconSize;
    height: $stampCard-iconSize;
    display: flex;
    justify-content: center;
    align-items: center;
}

.c-noCardsError-title {
    @include f.media($stampCard-responsive-mobileViewBreakpoint) {
        @include f.font-size(heading-s, true, narrow);
    }
}

.c-noCardsError-title,
.c-noCardsError-subTitle {
    margin-left: f.spacing();
    margin-right: f.spacing();
}
</style>
