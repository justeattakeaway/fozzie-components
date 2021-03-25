import { action } from '@storybook/addon-actions';

export default {
    onBrazeInit: action('on-braze-init'),
    getCardCount: action('get-card-count'),
    hasLoaded: action('has-loaded'),
    onError: action('on-error'),
    handleCustomCardType (type) {
        switch (type) {
            case 'Anniversary_Card_1':
            case 'Voucher_Card_1':
                return 'VoucherCard';
            case 'Restaurant_FTC_Offer_Card':
                return 'FirstTimeCustomerCard';
            case 'Promotion_Card_1':
            case 'Promotion_Card_2':
                return 'PromotionCard';
            case 'Terms_And_Conditions_Card':
            case 'Terms_And_Conditions_Card_2':
                return 'TermsAndConditionsCard';
            case 'Stamp_Card_1':
                return 'StampCard1';
            case 'StampCard_Promotion_Card_1':
                return 'StampCardPromotionCard';
            case 'Post_Order_Card_1':
                return 'PostOrderCard';
            default:
                break;
        }
        return false;
    }
};
