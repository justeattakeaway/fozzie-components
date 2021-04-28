import handleError from '../errorHandler';

describe('errorHandler', () => {
    it('errorHandler should be defined', () => {
        // Arrange, Act & Assert
        expect(handleError).toBeDefined();
    });

    it('errorHandler should use callback when configured', () => {
        // Arrange
        const error = {
            message: 'This is an example error'
        };

        const errorCallbackMock = jest.fn();

        // Act
        handleError(error, errorCallbackMock);

        // Assert
        expect(errorCallbackMock.mock.calls.length).toBe(1);
        expect(errorCallbackMock).toHaveBeenCalledWith(error);
    });

    it('errorHandler should re-throw error when callback is not provided', () => {
        // Arrange
        const expectedError = new Error('This is an example error');

        try {
            // Act
            handleError(expectedError);
            throw new Error('Test Failed');
        } catch (error) {
            // Assert
            expect(error).toBe(expectedError);
        }
    });
});
