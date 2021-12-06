import {
    mapToConsumerDetails,
    mapToConsumerAddress
} from '../services/mapping/consumer.mapper';
import {
    UPDATE_CONSUMER_DETAILS,
    UPDATE_CONSUMER_DETAIL
} from '../constants';

export default {
    namespaced: true,

    state: () => ({
        consumer: {}
    }),

    actions: {
        async loadConsumerDetails ({ commit }, { api, authToken }) {
            const conversationId = api.setConversationId();
            const getDetailsTask = api.getConsumerDetails(authToken, conversationId);
            const getAddressTask = api.getConsumerAddresses(authToken, conversationId);

            const responses = await Promise.all([getDetailsTask, getAddressTask]);

            const details = mapToConsumerDetails(responses[0]?.data);
            const address = mapToConsumerAddress(responses[1]?.data);

            commit(UPDATE_CONSUMER_DETAILS, { details, address });
        },

        async editConsumerDetails ({ commit, state }, { field, value }) {
            const present = field in state.consumer;
            if (present) {
                commit(UPDATE_CONSUMER_DETAIL, { field, value });
            }
        }
    },

    mutations: {
        [UPDATE_CONSUMER_DETAILS] (state, { details, address }) {
            state.consumer = { ...details, ...address };
        },

        [UPDATE_CONSUMER_DETAIL] (state, { field, value }) {
            state.consumer[field] = value;
        }
    }
};
