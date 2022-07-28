import Page from '@justeat/f-wdio-utils';

class <%= name.filename %> extends Page {
    constructor () {
        super('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.default %>-component');
    }
}

export default new <%= name.filename %>();
