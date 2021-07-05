import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import analyticsMixin from '../analytics.mixin.vue';
import {
    defaultState,
    createStore,
    $cookies
} from './helpers/setup';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('created ::', () => {
        let component;
        let prepareServersideAnalyticsSpy;
        let registerStoreModuleSpy;
        let storeUpdatePlatformDataSpy;
        beforeEach(() => {
            // Arrange
            component = {
                render () {},
                mixins: [analyticsMixin],
                store: createStore()
            };
            component.mixins[0].mounted = jest.fn(() => true);
            storeUpdatePlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePlatformData').mockImplementationOnce(() => true);
            registerStoreModuleSpy = jest.spyOn(component.mixins[0].methods, 'registerStoreModule');
            prepareServersideAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareServersideAnalytics');
        });

        it('should not attempt set the \'serverside only\' \'platformData\' properties if clientside', () => {
            // Mocks
            component.mixins[0].computed.isServerSide = () => false;

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(storeUpdatePlatformDataSpy).not.toHaveBeenCalled();
        });

        it('should set the \'serverside only\' \'platformData\' properties with appropriate defaults if serverside but values not available', () => {
            // Arrange
            const expected = defaultState;
            expected.platformData.environment = 'localhost';
            expected.platformData.version = '0.0.0.0';
            expected.platformData.instancePosition = 'N/A';
            expected.platformData.jeUserPercentage = 0;

            // Mocks
            component.mixins[0].computed.isServerSide = () => true;

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(storeUpdatePlatformDataSpy).lastCalledWith(expected.platformData);
        });

        it('should set the \'serverside only\' \'platformData\' properties with appropriate values if serverside and available', () => {
            // Arrange
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            const expected = defaultState;
            expected.platformData.environment = process.env.justEatEnvironment;
            expected.platformData.version = process.env.FEATURE_VERSION;
            expected.platformData.instancePosition = process.env.INSTANCE_POSITION;
            expected.platformData.jeUserPercentage = 99;

            // Mocks
            $cookies.get = jest.fn(() => 99);
            component.mixins[0].computed.isServerSide = () => true;

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(storeUpdatePlatformDataSpy).lastCalledWith(expected.platformData);
        });
    });
});
