// This file must be built using `yarn build:action:pipeline-trigger`

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const headers = {
        authorization: core.getInput('CIRCLE_CI_TOKEN')
    };

    const CIRCLECI_API_URL = 'https://circleci.com/api/v2/project/gh';
    const { owner, repo } = github.context.repo;

    axios.post(`${CIRCLECI_API_URL}/${owner}/${repo}/pipeline`, {}, { headers })
        .catch(error => core.setFailed(error));
} catch (error) {
  core.setFailed(error.message);
}