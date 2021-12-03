import accountInfoModule from '../accountInfo.module';
import {
    UPDATE_CONSUMER_DETAIL,
    UPDATE_CONSUMER_DETAILS
} from '../../constants';
import {
    token,
    consumerDetailsGetResponse,
    // consumerAddressGetResponse,
    consumerViewModel,
    consumerDetailsMappedModel,
    consumerAddressMappedModel
} from '../../../test-utils/setup';

describe('AccountInfo Store', () => {
    let httpClientMock;
    let getConsumerDetailsMock;
    let getConsumerAddressMock;

    beforeEach(() => {
        // Arrange
        getConsumerDetailsMock = jest.fn(() => consumerDetailsGetResponse);
        getConsumerAddressMock = jest.fn(() => undefined); // consumerAddressGetResponse);
        httpClientMock = {
            getConsumerDetails: getConsumerDetailsMock,
            getConsumerAddress: getConsumerAddressMock
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        const actualState = accountInfoModule.state();

        expect(actualState).toEqual({
            consumer: {}
        });
    });

    describe('actions ::', () => {
        describe('loadConsumerDetails ::', () => {
            it('should call the getConsumerDetails method with the correct parameters', async () => {
                // Act
                await accountInfoModule.actions.loadConsumerDetails({ commit: jest.fn() }, { api: httpClientMock, authToken: token });

                // Assert
                expect(getConsumerDetailsMock).toHaveBeenCalledWith(token);
            });

            it(`should call ${UPDATE_CONSUMER_DETAILS} mutation with the correct data`, async () => {
                const tempExpectedAddress =
                {
                    line1: undefined,
                    line2: undefined,
                    line3: undefined,
                    city: undefined,
                    postcode: undefined
                };
                // Arrange
                const commitSpy = jest.fn();
                const expectedDetails = consumerDetailsMappedModel;
                const expectedAddress = tempExpectedAddress; // consumerAddressMappedModel;

                // Act
                await accountInfoModule.actions.loadConsumerDetails({ commit: commitSpy }, { api: httpClientMock, authToken: token });

                // Assert
                expect(commitSpy).toHaveBeenLastCalledWith(UPDATE_CONSUMER_DETAILS, { details: expectedDetails, address: expectedAddress });
            });
        });

        // describe('saveConsumerDetails ::', () => {
        //     it('should call the postConsumerDetails method with the correct parameters', async () => {
        //         // Act
        //         await accountInfoModule.actions.saveConsumerDetails({ state: consumerViewModel }, { api: httpClientMock, authToken: token });

        //         // Assert
        //         expect(postConsumerDetailsMock).toHaveBeenCalledWith(token, consumerViewModel);
        //     });
        // });

        describe('editPreference ::', () => {
            it(`should call ${UPDATE_CONSUMER_DETAIL} mutation with the correct data`, () => {
                // Arrange
                const currentState = { consumer: { ...consumerViewModel, firstName: 'Tester1' } };
                const commitSpy = jest.fn();
                const expectedValue = 'Tester1';

                // Act
                accountInfoModule.actions.editConsumerDetails({ state: currentState, commit: commitSpy }, { field: 'firstName', value: expectedValue });

                // Assert
                expect(commitSpy).toHaveBeenLastCalledWith(UPDATE_CONSUMER_DETAIL, { field: 'firstName', value: expectedValue });
            });

            it(`should not call ${UPDATE_CONSUMER_DETAIL} mutation if the field not found`, () => {
                // Arrange
                const commitSpy = jest.fn();

                // Act
                accountInfoModule.actions.editConsumerDetails({ state: { consumer: { XXX: false } }, commit: commitSpy }, { field: 'X-X-X', value: true });

                // Assert
                expect(commitSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${UPDATE_CONSUMER_DETAILS} ::`, () => {
            it('should overwrite the state with new mapped data', () => {
                // Arrange
                const currentState = { consumer: { ...consumerViewModel, firstName: 'Tester1', city: 'Testville1' } };
                const expectedDetails = { ...consumerDetailsMappedModel, firstName: 'Tester2' };
                const expectedAddress = { ...consumerAddressMappedModel, city: 'Testville2' };

                // Act
                accountInfoModule.mutations[UPDATE_CONSUMER_DETAILS](currentState, { details: expectedDetails, address: expectedAddress });


                // Assert
                expect(currentState.consumer).toEqual({ ...expectedDetails, ...expectedAddress });
            });
        });

        describe(`${UPDATE_CONSUMER_DETAIL} ::`, () => {
            it('should overwrite the field in the state with new value', () => {
                // Arrange
                const currentState = { consumer: { ...consumerViewModel, firstName: 'Tester1' } };
                const expectedValue = 'Tester2';

                // Act
                accountInfoModule.mutations[UPDATE_CONSUMER_DETAIL](currentState, { field: 'firstName', value: expectedValue });

                // Assert
                expect(currentState.consumer.firstName).toEqual(expectedValue);
            });
        });
    });
});
