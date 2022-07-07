import Page from '@justeat/f-wdio-utils';

class SkeletonLoader extends Page {
    constructor () {
        super('molecule', 'skeleton-loader-component');
    }
}

export default new SkeletonLoader();
