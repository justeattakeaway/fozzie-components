import TestUtils from '@justeat/js-test-buddy';
import { getBreakpoints, getCurrentScreenWidth, isWithinBreakpoint } from '..';

describe('getBreakpoints', () => {
    beforeEach(() => {
        TestUtils.setBodyHtml(`
        <style>
            .c-screen-sizer {
                content: 'narrow:414px,mid:768px,wide:1025px,huge:1280px';
            }
        </style>
        `);
    });

    it('should return an object', () => {
        // Act
        const breakpoints = getBreakpoints();

        // Assert
        expect(typeof breakpoints).toBe('object');
    });

    it('should return four breakpoints', () => {
        // Act
        const breakpoints = getBreakpoints();

        // Assert
        expect(Object.keys(breakpoints).length).toBe(4);
    });

    it('should return breakpoints with expected names', () => {
        // Act
        const breakpoints = getBreakpoints();

        // Assert
        expect(breakpoints.narrow).toBeDefined();
        expect(breakpoints.mid).toBeDefined();
        expect(breakpoints.wide).toBeDefined();
        expect(breakpoints.huge).toBeDefined();
    });

    it('should return breakpoints with expected values in pixels', () => {
        // Act
        const breakpoints = getBreakpoints();

        // Assert
        expect(breakpoints.narrow).toBe('414px');
        expect(breakpoints.mid).toBe('768px');
        expect(breakpoints.wide).toBe('1025px');
        expect(breakpoints.huge).toBe('1280px');
    });
});

describe('currentScreenWidth', () => {
    it('returns a string if breakpoints are defined correctly', () => {
        // Arrange
        TestUtils.setBodyHtml(`
        <style>
            .c-screen-sizer {
                content: 'narrow:414px,mid:768px,wide:1025px,huge:1280px';
            }
        </style>
        `);

        // Act
        const width = getCurrentScreenWidth();

        // Assert
        expect(typeof width).toBe('string');
    });

    it('returns false if no breakpoints are defined', () => {
        // Arrange
        TestUtils.setBodyHtml(`
        <style>
            .c-screen-sizer {

            }
        </style>
        `);

        // Act
        const width = getCurrentScreenWidth();

        // Assert
        expect(width).toBe(false);
    });
});

describe('isWithinBreakpoint', () => {
    it('should exist', () => {
        expect(isWithinBreakpoint).toBeDefined();
    });

    beforeEach(() => {
        TestUtils.setBodyHtml(`
        <style>
            .c-screen-sizer {
                content: 'narrow:414px,mid:768px,wide:1025px,huge:1280px';
            }
        </style>
        `);
    });

    it('should return true if I pass in `>narrow` when my screen width is larger than 414', () => {
        // Arrange
        window.innerWidth = 415;

        // Act
        const breakpointMatch = isWithinBreakpoint('>narrow');

        // Assert
        expect(breakpointMatch).toBe(true);
    });

    it('should return true if I pass in `>=narrow` when my screen width is larger or equal to 414', () => {
        // Arrange
        window.innerWidth = 414;

        // Act
        const breakpointMatch = isWithinBreakpoint('>=narrow');

        window.innerWidth = 415;
        const breakpointMatchTwo = isWithinBreakpoint('>=narrow');

        // Assert
        expect(breakpointMatch).toBe(true);
        expect(breakpointMatchTwo).toBe(true);
    });

    it('should return true if I pass in `<=narrow` when my screen width is smaller or equal to 414', () => {
        // Arrange
        window.innerWidth = 413;

        // Act
        const breakpointMatch = isWithinBreakpoint('<=narrow');

        window.innerWidth = 414;
        const breakpointMatchTwo = isWithinBreakpoint('<=narrow');

        // Assert
        expect(breakpointMatch).toBe(true);
        expect(breakpointMatchTwo).toBe(true);
    });

    it('should return true if I pass in `<narrow` when my screen width is smaller than 414', () => {
        // Arrange
        window.innerWidth = 413;


        // Act
        const breakpointMatch = isWithinBreakpoint('<narrow');

        // Assert
        expect(breakpointMatch).toBe(true);
    });

    it('should return true if I pass in `=narrow` when my screen width is 414', () => {
        // Arrange
        window.innerWidth = 414;

        // Act
        const breakpointMatch = isWithinBreakpoint('=narrow');

        // Assert
        expect(breakpointMatch).toBe(true);
    });

    it('should return false if the passed operator is not accepted', () => {
        // Arrange
        window.innerWidth = 414;

        // Act
        const breakpointMatch = isWithinBreakpoint('==>narrow');
        const breakpointMatchTwo = isWithinBreakpoint('+narrow');


        // Assert
        expect(breakpointMatch).toBe(false);
        expect(breakpointMatchTwo).toBe(false);
    });

    it('should return false if the passed breakpoint is not accepted', () => {
        // Arrange
        window.innerWidth = 414;

        // Act
        const breakpointMatch = isWithinBreakpoint('>blah');


        // Assert
        expect(breakpointMatch).toBe(false);
    });

    it('should return false if the passed breakpoint has no operator', () => {
        // Arrange
        window.innerWidth = 414;

        // Act
        const breakpointMatch = isWithinBreakpoint('narrow');


        // Assert
        expect(breakpointMatch).toBe(false);
    });
});
