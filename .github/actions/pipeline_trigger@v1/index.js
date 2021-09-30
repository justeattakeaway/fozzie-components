const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');

try {
    const CIRCLECI_API_URL = 'https://circleci.com/api/v2/project/gh';
    const { owner, repo } = github.context.repo;

    // Can't seem to use node-fetch so trying to force Github's own Octokit client to work for us...
    const client = new Octokit({
        auth: core.getInput('CIRCLE_CI_TOKEN'),
        baseUrl: CIRCLECI_API_URL
    });
    client.request('POST /{owner}/{repo}/pipeline', { owner, repo });
} catch (error) {
  core.setFailed(error.message);
}
