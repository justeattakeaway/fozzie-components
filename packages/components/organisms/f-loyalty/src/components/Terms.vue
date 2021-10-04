<template functional>
    <div :class="$style['c-loyalty-terms']">
        <a
            :class="$style['c-loyalty-terms-link']"
            data-test-id="terms-and-conditions"
            :href="parent.$t('termsUrl')">
            {{ parent.$t("termsText") }}
        </a>
    </div>
</template>

<script>
export default {
    name: 'StampCardsTerms'
};
</script>

<style lang="scss" module>
.c-loyalty-terms {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.c-loyalty-terms-link {
    margin: spacing(x3) 0;
    text-align: center;
    font-weight: $font-bodyStrong-s-weight;
    text-decoration: none;

    &:hover {
         text-decoration: underline;
    }
}
</style>
