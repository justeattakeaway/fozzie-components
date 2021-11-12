import {
    mapToPreferencesViewModel,
    mapToPreferencesUpdateModel
} from '../contactPreferences.mapper';

import {
    contactPreferencesGetResponse,
    contactPreferencesViewModel,
    contactPreferencesUpdateModel
} from '../../../../test-utils/setup';

describe('ContactPreferencesMapper', () => {
    beforeEach(() => {
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When calling `mapToPreferencesViewModel`', () => {
        it('should return the expected view model', () => {
            // Arrange
            const expectedViewModel = contactPreferencesViewModel;

            // Act
            const actualViewModel = mapToPreferencesViewModel(contactPreferencesGetResponse);

            // Assert
            expect(actualViewModel).toEqual(expectedViewModel);
        });

        it('should return the expected update model', () => {
            // Arrange
            const expectedUpdateModel = contactPreferencesUpdateModel;

            // Act
            const actualUpdateModel = mapToPreferencesUpdateModel(contactPreferencesViewModel);

            // Assert
            expect(actualUpdateModel).toEqual(expectedUpdateModel);
        });
    });
});
