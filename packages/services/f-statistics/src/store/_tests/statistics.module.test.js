import statisticsModule from '../statistics.module';
import {
    defaultState
} from '../../tests/helpers/setup';

describe('Statistics Module ::', () => {
    // let state;
    // let commit;

    beforeEach(() => {
        // Arrange
        // state = { ...defaultState };
        // commit = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        const actualState = statisticsModule.state();
        expect(actualState).toEqual(defaultState);
    });

    describe('actions ::', () => { });
});
