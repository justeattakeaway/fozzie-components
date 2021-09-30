const fetch = require('node-fetch');
const core = require('@actions/core');
const github = require('@actions/github');

try {
    const headers = {
        authorization: core.getInput('CIRCLE_CI_TOKEN')
    };

    const CIRCLECI_API_URL = 'https://circleci.com/api/v2/project/gh';
    const { owner, repo } = github.context.repo;

    fetch(`${CIRCLECI_API_URL}/${owner}/${repo}/pipeline`, {
        headers,
        method: 'POST'
    });
} catch (error) {
  core.setFailed(error.message);
}
