let contextGetter = null;

/**
 * @returns Context required to evaluate features at current time current request, e.g. country.
 */
function getContext () {
    return (contextGetter)
        ? contextGetter()
        : null;
}

/**
 * Set the function that returns the current context.
 * @param {function} contextGetterFn  - Function that returns current context. Provided by hosting application.
 */
function setContextGetter (contextGetterFn) {
    contextGetter = contextGetterFn;
}

export { getContext, setContextGetter };
