/* eslint-disable no-console */
/* global danger, fail, message */

const bodyAndTitle = (danger.github.pr.body + danger.github.pr.title).toLowerCase();
const isTrivial = bodyAndTitle.includes('#trivial');

if (!isTrivial) {
    // Fail if the title of the PR isn't in the format of a version i.e. vX.X.X (such as v1.4.0)
    const versionRegex = /^(v[0-9]+\.[0-9]+\.[0-9]+)/;
    const isPRTitleVersioned = danger.github.pr.title.match(versionRegex);
    if (!isPRTitleVersioned) {
        fail(':exclamation: PR title should start with the package version in the format v(x.x.x) (such as v1.4.0)');
    }

    // Fail if there isn’t a CHANGELOG entry – should update for every PR
    if (!danger.git.modified_files.includes('CHANGELOG.md')) {
        const changelogLink = 'https://github.com/justeat/f-header/blob/master/CHANGELOG.md';
        fail(`:memo: Please include a CHANGELOG entry. You can find the current version at <a href="${changelogLink}">CHANGELOG.md</a>`);
    }

    // Check for version update
    const hasPackageJsonChanged = danger.git.modified_files.includes('package.json');
    const packageDiff = danger.git.JSONDiffForFile('package.json');

    packageDiff.then(result => {
        if (!hasPackageJsonChanged || (hasPackageJsonChanged && !result.version)) {
            const semverLink = 'https://docs.npmjs.com/getting-started/semantic-versioning';
            console.log('Versioning Missing');
            console.log(hasPackageJsonChanged, result);
            fail(`:exclamation: This PR should include a <a href="${semverLink}">SEMVER</a> version bump, so that it can be published once merged.`);
        }
    }, err => {
        console.log(err);
    });

    // Message on deletions
    if (danger.github.pr.deletions > danger.github.pr.additions) {
        message(':fire: :clap: You’re a deletion machine!');
    }
}
