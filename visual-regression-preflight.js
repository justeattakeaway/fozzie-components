const fetch = require('node-fetch');

const PULL_REQUEST_ID = process.env.CIRCLE_PULL_REQUEST.split('/').pop();
const LABELS_TO_STOP = ['wip'];

(async () => {
    const response = await fetch(`https://api.github.com/repos/justeat/fozzie-components/pulls/${PULL_REQUEST_ID}`);
    const json = await response.json();

    const details = {
        draft: json.draft,
        labels: json.labels.map(l => l.name)
    };

    // If PR is draft or has given labels, skip visual regression tests to save credits
    const shouldRunTests = !details.draft && !LABELS_TO_STOP.some(label => details.labels.includes(label));

    // "Returns" the answer so it can be stored by the shell as part of the job
    console.log(shouldRunTests);
})();
