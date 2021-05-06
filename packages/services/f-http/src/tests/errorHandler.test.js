import handleError from '../errorHandler';

describe('errorHandler', () => {
    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(handleError).toBeDefined();
    });

    it('should use callback when configured', () => {
        // Arrange
        const error = {
            message: 'This is an example error'
        };

        const errorCallbackMock = jest.fn();

        // Act
        handleError(error, errorCallbackMock);

        // Assert
        expect(errorCallbackMock).toHaveBeenCalledTimes(1);
        expect(errorCallbackMock).toHaveBeenCalledWith(error);
    });

    it('should re-throw error when callback is not provided', () => {
        // Arrange
        const expectedError = new Error('This is an example error');

        try {
            // Act
            handleError(expectedError);
        } catch (error) {
            // Assert
            expect(error).toBe(expectedError);
        }
    });
});
