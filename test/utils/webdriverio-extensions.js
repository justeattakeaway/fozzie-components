module.exports = browser => ({
    doesElementExist: selector => browser.findElements(selector).length > 0
});
