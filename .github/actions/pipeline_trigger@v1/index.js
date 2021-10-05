// This file must be built using `yarn build:action:pipeline-trigger`

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const CIRCLECI_API_URL = 'https://circleci.com/api/v2/project/gh';
const REF_PREFIX = 'refs/';

try {
    // `ref` should have the form `refs/pull/<PR number>/merge` https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#pull_request
    const { ref } = github.context;
    const { owner, repo } = github.context.repo;

    // Remove `refs/` from the start of the ref (if it's present) to trigger correct PR build
    const payload = {
        ...(ref.indexOf(REF_PREFIX) > -1 ? {
            branch: ref.slice(REF_PREFIX.length) // trim prefix
        } : {})
    };

    core.info(`Running build for branch ${payload.branch}`);

    // Authenticate using secret from action input
    const headers = {
        'Circle-Token': core.getInput('CIRCLE_CI_TOKEN')
    };
    const options = { headers };

    axios.post(`${CIRCLECI_API_URL}/${owner}/${repo}/pipeline`, payload, options)
        .catch(error => core.setFailed(error));
} catch (error) {
  core.setFailed(error.message);
}