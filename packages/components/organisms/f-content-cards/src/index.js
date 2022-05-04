/**
 * @overview Fozzie f-content-cards Component JS Wrapper
 *
 * @module f-content-cards
 */

import ContentCards, { CARDSOURCE_METADATA, CARDSOURCE_CUSTOM } from './components/ContentCards';
import {
    FirstTimeCustomerCard,
    PromotionCard,
    PostOrderCard,
    SkeletonLoader,
    TermsAndConditionsCard,
    HomePromotionCard1,
    HomePromotionCard2,
    GroupHeaderCard,
    StampCard1,
    StampCardPromotionCard
} from './components/cardTemplates';

import PromotionCardOne from './components/cards/PromotionCardOne.vue';
import PromotionCardTwo from './components/cards/PromotionCardTwo.vue';
import VoucherCard from './components/cards/VoucherCard.vue';

export {
    CARDSOURCE_METADATA,
    CARDSOURCE_CUSTOM,
    ContentCards,
    FirstTimeCustomerCard,
    PromotionCard,
    PromotionCardOne,
    PromotionCardTwo,
    PostOrderCard,
    SkeletonLoader,
    TermsAndConditionsCard,
    VoucherCard,
    HomePromotionCard1,
    HomePromotionCard2,
    GroupHeaderCard,
    StampCard1,
    StampCardPromotionCard
};
