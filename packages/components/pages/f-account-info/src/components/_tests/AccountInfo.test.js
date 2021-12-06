import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';
import {
    localVue,
    i18n,
    baseUrl,
    token
} from '../../../test-utils/setup';

const createStore = ({ state = {}, actions = {} } = {}) => new Vuex.Store({
    modules: {
        fContactPreferencesModule: {
            state,
            actions,
            namespaced: true
        }
    }
});

let sutProps;

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange & Act
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl
        };
    });

    describe('when mounting the component', () => {
        it('should not call initialise method if the authorisation has not completed', () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false },
                store: createStore()
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise method once the authorisation has completed', async () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            const wrapper = shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false },
                store: createStore()
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });
    });
});
