// This file must be built using `yarn build:action:pipeline-trigger`
// The alternative was adding a build step to the action itself
// but this would make it take minutes rather than seconds

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const CIRCLECI_API_URL = 'https://circleci.com/api/v2/project/gh';
const REF_PREFIX = 'refs/';

try {
    // `ref` should have the form `refs/pull/<PR number>/merge` https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#pull_request
    const { ref } = github.context;
    const { owner, repo } = github.context.repo;

    let branch = ref.replace(REF_PREFIX, ''); // Remove `refs/` from the start of the ref (if it's present) to trigger correct PR build
    let branch = branch.replace('/merge', '/head');

    core.info(`Running build for branch ${branch}`);

    // Authenticate using secret from action input
    const headers = {
        'Circle-Token': core.getInput('CIRCLE_CI_TOKEN')
    };
    const payload = { branch };
    const options = { headers };

    axios.post(`${CIRCLECI_API_URL}/${owner}/${repo}/pipeline`, payload, options)
        .catch(error => core.setFailed(error));
} catch (error) {
  core.setFailed(error.message);
}
