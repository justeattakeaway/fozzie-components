import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import {
    HAS_LOADED,
    ON_ERROR,
    VOUCHER_CODE_CLICK
} from '../events';

const TAG_NAME = 'content-cards';
export const STATE_DEFAULT = 'default';
export const STATE_ERROR = 'error';
export const STATE_NO_CARDS = 'no-cards';
export const STATE_LOADING = 'loading';

export default {
    props: {
        adapters: {
            type: Array,
            required: true
        },
        locale: {
            type: String,
            required: true
        },
        tags: {
            type: String,
            default: TAG_NAME
        },
        filters: {
            type: Array,
            default: () => []
        }
    },

    data: () => ({
        state: STATE_LOADING,
        cards: [],
        errors: []
    }),

    computed: {
        /**
         * Determines the tenant based on the currently selected locale in order to choose correct translations
         * @return {String}
         **/
        tenant () {
            return {
                'en-GB': 'uk',
                'en-AU': 'au',
                'en-NZ': 'nz',
                'da-DK': 'dk',
                'es-ES': 'es',
                'en-IE': 'ie',
                'it-IT': 'it',
                'nb-NO': 'no'
            }[this.locale] || 'uk';
        },
        logTags () {
            return [TAG_NAME, this.tags !== TAG_NAME ? this.tags : null];
        }
    },

    /**
     * Sets up dependencies required by descendant components
     **/
    provide () {
        const component = this;

        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            /**
             * Reflects card click events though to common click event handler
             **/
            emitCardClick (card) {
                component.handleCardClick(card);
            },

            /**
             * Reflects card view events though to common view event handler
             **/
            emitCardView (card) {
                component.handleCardView(card);
            },

            /**
             * Emits voucher code click event with given ongoing url
             **/
            emitVoucherCodeClick (url) {
                component.$emit(VOUCHER_CODE_CLICK, {
                    url
                });
            },

            copy: { ...localeConfig }
        };
    },

    methods: {
        runAdapterCallbacks (successCallback, errorCallback) {
            this.adapters.forEach(adapter => {
                adapter.initialise(this.filters, cards => {
                    if (cards === undefined) {
                        errorCallback(adapter.source);
                    }
                    cards.forEach(card => {
                        if (this.cards.find(c => c.id === card.id) === undefined) {
                            this.cards = [...this.cards, card];
                        } else {
                            this.cards = this.cards.map(c => (c.id === card.id ? card : c));
                        }
                    });
                    successCallback(adapter.source, cards);
                }, error => {
                    errorCallback(adapter.source, error);
                });
            });
        },

        /**
         * Takes appropriate response for click event for given card object based on its source
         * @param card
         */
        handleCardClick (card) {
            this.adapters.forEach(adapter => {
                if (adapter.source === card.source) {
                    adapter.handleCardClick(card);
                }
            });
        },

        /**
         * Takes appropriate response for view event for given card object based on its source
         * @param card
         */
        handleCardView (card) {
            this.adapters.forEach(adapter => {
                if (adapter.source === card.source) {
                    adapter.handleCardView(card);
                }
            });
        }
    },

    mounted () {
        this.loggingKey = `f-content-cards--${this.userId}--${this.tags}`;
        this.defaultLoggingData = {
            data: {
                key: this.loggingKey
            }
        };
        this.runAdapterCallbacks((source, cards) => {
            this.state = STATE_DEFAULT;
            this.$emit(HAS_LOADED, { adapter: source, cards });
            this.$log.info(
                `Content Cards Adapters (${source}) - Successfully received content cards. Key: (${this.loggingKey})`,
                this.logTags,
                {
                    ...this.defaultLoggingData,
                    Count: cards.length,
                    data: {
                        ...this.defaultLoggingData.data,
                        source
                    }
                }
            );
        }, (source, error) => {
            if (error.type === 'NoCards') {
                this.$emit(HAS_LOADED, { adapter: source, cards: [] });
                this.$log.info(
                    `Content Cards Adapters (${source}) - No content cards. Key: (${this.loggingKey})`,
                    this.logTags,
                    {
                        ...this.defaultLoggingData,
                        data: {
                            errorMessage: error
                        }
                    }
                );
            } else {
                this.$emit(ON_ERROR, { adapter: source });
                this.$log.info(
                    `Content Cards Adapters (${source}) - Error receiving content cards. Key: (${this.loggingKey})`,
                    this.logTags,
                    {
                        ...this.defaultLoggingData,
                        data: {
                            errorMessage: error
                        }
                    }
                );
            }
        });
    },

    /**
     * Render function for the component - chooses one slot based on the current state
     * @param h - conventional shorthand for createElement - see
     *            https://vuejs.org/v2/guide/render-function.html#JSX
     * @return {VNode}
     */
    render (h) {
        return this.$scopedSlots[this.state]
            ? h(
                'div',
                {
                    class: `c-contentCards-${this.state}`,
                    attrs: {
                        'data-test-id': this.testId
                    }
                },
                this.$scopedSlots[this.state]({
                    cards: this.cards
                })
            )
            : h('');
    }
};
