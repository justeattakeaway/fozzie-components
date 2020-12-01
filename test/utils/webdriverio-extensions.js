const factoryFunctions = browser => ({
    doesElementExist: selector => browser.findElements(selector).length > 0
});

export default factoryFunctions;
