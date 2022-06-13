const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class <%= name.filename %> extends Page {
    constructor () {
        super('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.default %>-component');
    }
};
