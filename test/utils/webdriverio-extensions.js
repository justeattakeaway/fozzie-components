module.exports = browser => ({
    doesElementExist: selector => $$(selector).length > 0
});
