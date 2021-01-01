import utilities from '../src/utilities';

const { getDeepObjectByPath } = utilities;

describe('getDeepObjectByPath', () => {
    it('should return null if path does not exist for the object', () => {
        // Arrange
        const obj = {
            theObject: {}
        };

        const path = ['theObject', 'theChild', 'theGrandChild'];

        // Act
        const actual = getDeepObjectByPath(obj, path);

        // Assert
        expect(actual).toBe(null);
    });

    it('should return the default object if there is no path', () => {
        // Arrange
        const obj = {
            theObject: {}
        };

        const path = [];

        // Act
        const actual = getDeepObjectByPath(obj, path);

        // Assert
        expect(actual).toEqual(obj);
    });

    it('should return the child object from the provided if the path exists for the object', () => {
        // Arrange
        const obj = {
            theObject: {
                theChild: {
                    theGrandChild: {
                        prop: 'test'
                    }
                }
            }
        };

        const path = ['theObject', 'theChild', 'theGrandChild'];

        // Act
        const actual = getDeepObjectByPath(obj, path);

        // Assert
        expect(actual).toEqual({ prop: 'test' });
    });
});
