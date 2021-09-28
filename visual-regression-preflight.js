const fetch = require('node-fetch');

const PULL_REQUEST_ID = process.env.CIRCLE_PULL_REQUEST.split('/').pop();
const LABELS_TO_STOP = ['wip', 'do not merge'];
let details = {};

fetch(`https://api.github.com/repos/justeat/fozzie-components/pulls/${PULL_REQUEST_ID}`)
    .then(res => res.json())
    .then(json => {
        details = {
            draft: json.draft,
            labels: json.labels.map(l => l.name)
        };

        console.log(details);

        // If PR is draft or has given labels, skip visual regression tests to save credits
        const shouldRunTests = !details.draft && !LABELS_TO_STOP.some(label => details.labels.includes(label));
        process.env.RUN_VISUAL_REGRESSION_TESTS = shouldRunTests;
        console.log('Should run visual regression tests?', process.env.RUN_VISUAL_REGRESSION_TESTS);
    });
