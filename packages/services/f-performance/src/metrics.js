const metrics = {
    navigationTiming: {
        name: 'navigationTiming',
        formatData: data => ((data && data.timeToFirstByte) ? data : {})
    },
    networkInformation: {
        name: 'networkInformation',
        formatData: data => ((data && data.effectiveType) ? data : {})
    },
    storageEstimate: {
        name: 'storageEstimate'
    },
    ttfb: {
        name: 'timeToFirstByte',
        formatData: data => ({ duration: data })
    },
    fp: {
        name: 'firstPaint',
        formatData: data => ({ duration: data })
    },
    fcp: {
        name: 'firstContentfulPaint',
        formatData: data => ({ duration: data })
    },
    fid: {
        name: 'firstInputDelay',
        formatData: data => ({ duration: data })
    },
    lcp: {
        name: 'largestContentfulPaint',
        formatData: data => ({ duration: data })
    },
    lcpFinal: {
        name: 'largestContentfulPaintFinal',
        formatData: data => ({ duration: data })
    },
    cls: {
        name: 'cumulativeLayoutShift',
        formatData: data => ({ value: data })
    },
    clsFinal: {
        name: 'cumulativeLayoutShiftFinal',
        formatData: data => ({ value: data })
    },
    tbt: {
        name: 'totalBlockingTime',
        formatData: data => ({ duration: data })
    },
    elPageTitle: {
        name: 'elementTimingPageTitle',
        formatData: data => ({ duration: data })
    }
};

export default metrics;
