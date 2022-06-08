const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class SkeletonLoader extends Page {
    constructor () {
        super('molecule', 'skeleton-loader-component');
    }
};
