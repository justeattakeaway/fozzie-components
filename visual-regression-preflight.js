const fetch = require('node-fetch');

const PULL_REQUEST_ID = process.env.CIRCLE_PULL_REQUEST.split('/').pop();
const LABELS_TO_STOP = ['wip', 'do not merge'];

(async () => {
    const request = fetch(`https://api.github.com/repos/justeat/fozzie-components/pulls/${PULL_REQUEST_ID}`);
    const response = await request;
    const json = await response.json();
    const details = {
        draft: json.draft,
        labels: json.labels.map(l => l.name)
    };


    // If PR is draft or has given labels, skip visual regression tests to save credits
    const shouldRunTests = !details.draft && !LABELS_TO_STOP.some(label => details.labels.includes(label));
    console.log(shouldRunTests);
})();
