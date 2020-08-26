import noop from '../noop';

describe('f-metadata › noop', () => {
    it('should return undefined', () => {
        expect(typeof noop).toBe('function');
        expect(noop()).toBeUndefined();
    });
});
