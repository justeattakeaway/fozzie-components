/**
 * @overview Breakpoint handler
 *
 * @module breakpointHelper
 */

export const getBreakpoints = () => {
    const output = {};

    // Append hidden element to body
    const screenSizer = document.createElement('div');
    screenSizer.classList.add('c-screen-sizer');

    document.body.appendChild(screenSizer);

    // It should have a 'content' property containing the breakpoints
    const breakpoints = window.getComputedStyle(document.querySelector('.c-screen-sizer'))
        .getPropertyValue('content')
        .replace(/["']/g, '')
        .split(',');
        // Gives a list of breakpoints in the form ['narrow:414px', ...etc]

    // When there is no content, at this stage breakpoints should be ['']
    if (breakpoints.length === 1 && breakpoints[0] === '') {
        return output;
    }

    return breakpoints.reduce((prev, current) => {
        // `current` is of the form 'narrow:414px'
        const [breakpointName, breakpointValue] = current.split(':');
        prev[breakpointName] = breakpointValue; // <- the initial value is used for the first iteration
        // The object, e.g., { 'narrow': '414px' } is returned to be used as `prev` in the next iteration
        return prev;
    }, output); // <- initial value
};

export const createBreakpointArray = breakpoints => {
    // Order the breakpoints from widest to narrowest,
    // takes the form [['narrow', '414px'], [...etc]]
    const bps = [];
    Object.keys(breakpoints).forEach(key => {
        bps.unshift([key, breakpoints[key]]);
    });

    return bps;
};

export const getCurrentScreenWidth = () => {
    const currentWidth = window.innerWidth;

    const breakpoints = getBreakpoints();

    const bps = createBreakpointArray(breakpoints);

    for (let i = 0; i < bps.length; i++) {
        // Loops through the breakpoints (in descending order)
        // returning the first one that is narrower than currentWidth.

        const breakpointWidth = parseInt(bps[i][1], 10); // This also strips the 'px' from the string

        if (i === bps.length - 1 || currentWidth > breakpointWidth) {
            // If we've reached the last breakpoint, and there still hasn't been a match, return the smallest breakpoint
            return bps[i][0];
        }
    }
    // If no breakpoints have been set
    return false;
};

export const isWithinBreakpoint = breakpointString => {
    const operatorRegex = /[<>=]+/;
    const operatorMatch = breakpointString.match(operatorRegex);
    const operator = operatorMatch ? operatorMatch[0] : '';
    const [, breakpoint] = breakpointString.split(operatorRegex);
    const currentScreenWidth = window.innerWidth;

    const breakpoints = getBreakpoints();
    const bps = createBreakpointArray(breakpoints);

    // We loop through the breakpoint array until we get a match.
    // If we match we return the px value as an int. If we do not match we return false
    const breakpointToPX = breakpointName => {
        let match = false;

        bps.forEach(bp => {
            if (bp[0] === breakpointName) {
                match = parseInt(bp[1], 10);
            }
        });
        return match;
    };

    const breakpointInPX = breakpointToPX(breakpoint);

    // If the breakpoint passed in does not match any we;
    if (!breakpointInPX) {
        return false;
    }

    const mediaQuery = {
        '<': currentScreenWidth < breakpointInPX,
        '<=': currentScreenWidth <= breakpointInPX,
        '=': currentScreenWidth === breakpointInPX,
        '>': currentScreenWidth > breakpointInPX,
        '>=': currentScreenWidth >= breakpointInPX
    };

    const result = mediaQuery[operator];

    if (result == null) {
        return false;
    }

    return result;
};
