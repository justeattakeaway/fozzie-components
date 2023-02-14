/**
 * Returns some configuration as expected by the braze SDK
 *
 * @return {{
 *   triggers: [],
 *   config: {
 *     messaging_session_timeout: number,
 *     content_cards: {
 *       enabled: boolean
 *     },
 *     purchases_blacklist: string[],
 *     attributes_blacklist: string[],
 *     vapid_public_key: string,
 *     events_blacklist: string[],
 *     time: number
 *   }
 * }}
 */
export default () => {
    const now = Math.floor(Date.now() / 1000);

    /* eslint-disable camelcase */
    return {
        triggers: [],
        config: {
            time: now,
            attributes_blacklist: [
                'control_details',
                'contrpl_log',
                'currency',
                'delivery_method',
                'exclusions',
                'order_count',
                'order_id_local',
                'order_key',
                'payment_method_type',
                'platform',
                'postcode',
                'price',
                'product_id',
                'purchase_count_yesterday',
                'restaurant_name',
                'time',
                'voucher_code',
                'voucher_redeemed'
            ],
            events_blacklist: ['order_page'],
            purchases_blacklist: ['Chinese', 'Curry'],
            messaging_session_timeout: 21600,
            vapid_public_key: 'FOOBARBAZ',
            content_cards: {
                enabled: true
            }
        }
    };
    /* eslint-enable camelcase */
};
