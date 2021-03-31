# Contributing

*_[This contributing guide can also be viewed in our Storybook documentation](https://justeat.github.io/fozzie-components/@justeat/storybook/index.html?path=/story/documentation-getting-started-contributing--page)_*

- Before creating a new component, please discuss it with us in #help-web
- New components should use [generator-component](https://github.com/justeat/fozzie-components/tree/master/packages/tools/generator-component) to create the base structure of the component. It's usually a good idea to PR this base structure as a `v0.1.0` before adding any significant custom component code.

## Background Reading

If you want to learn more about fozzie-components and how it's structured, these are some good articles...

Resources |
------------- |
[Guide to mono-repos](https://www.toptal.com/front-end/guide-to-monorepos) |
[Our Development Principles](https://justeat.github.io/fozzie-components/@justeat/storybook/index.html?path=/story/documentation-getting-started-development-principles--page) |
[Fozzie CSS Naming Scheme](https://fozzie.just-eat.com/documentation/css/css-naming) |
[Fozzie Accessibility Guide](https://fozzie.just-eat.com/documentation/general/accessibility/) |
[What not to do guide](https://justeat.github.io/fozzie-components/@justeat/storybook/index.html?path=/story/documentation-standards-accessibility-overview--page) |

## Pull Requests

When raising a PR in the mono-repo, please follow these guidelines.

### PR Title

- PR title's should start with the package version in the format {package-name}@v(x.x.x) (such as f-header@v1.4.0)' (unless using the `#trivial` flag described below).
- If your change is a global configuration change, then the title should be `fozzie-components@v(x.x.x)`, where the version number relates to the version at the root of the mono-repo.

### PR Descriptions

- Please read and fill in the PR description template when opening a PR.
- If you're updating package code, you'll need to update the packages `CHANGELOG` file and bump the package version in its `package.json`.
- Where the PR template asks for a description of your changes, feel free to copy/paste the description that you added in the packages `CHANGELOG` file. That should describe what was added/changed/deleted.
- If you've modified the styling of a component, please add a screenshot of the before/after state of the component. It helps give more context for those reviewing the change.

### PR Checks/Reviews

- All PRs get checked by a tool called [Danger.js](https://danger.systems/js/), which runs the following [checks against your PR](https://github.com/justeat/fozzie-components/blob/master/dangerfile.js). If you miss a version number or `CHANGELOG` entry, it will leave a comment on your PR to add them to your changes.
- Use draft PRs when it's appropriate (for example, to share code with a colleague or get early feedback on some changes).
- Test your changes using Storybook (and ensure any modified/added props are added to the components story).
- Always consider if your change warrants adding/amending the components README. If you're changing or adding props, it will do.
- You need two reviews on your PR and all of the Danger.js and CircleCI build checks should pass.
- Please don't add any links to internal facing tools or wikis anywhere in this repo – so that's in the PR title and description, code, comments, commit titles and branch names.

### CHANGELOG

All components have an associated `CHANGELOG` that should be updated when creating new PRs. Keeping these up-to-date helps those consuming our components when upgrading to the latest version or when addressing bugs that may have occurred.

Our `CHANGELOG`'s follow the principle's outlined on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Not all PRs will require a version bump for a package (for example, an update to documentation) – in this scenario, we recommend adding the following heading to the components `CHANGELOG`, which can then be replaced when a subsequent version is released.

```md
Latest – to be added to the next release
------------------------------
```

### Useful PR tags

By default, all PRs are checked by our automated Danger.js checks, which check that any packages that have been changed also have version bumps and `CHANGELOG` entries.

The following tags are read by Danger.js and will allow you to bypass certain checks if you are making only documentation or configuration changes. These tags should be added as part of the PRs title.

#### `#globalconfig`

If you are making configuration changes to a number of packages (such as updating linting or test config), then you can simply bump the package version at the root of the mono-repo (as well as adding a CHANGELOG entry at the root describing the changes) and add the `#globalconfig` tag to your PR. This will then only run the Danger.js checks on the root of the mono-repo, and not for packages located in the `/packages` folder.

It's generally good practice to also add a `CHANGELOG` entry to the individual packages that have been modified using the title `Latest (changes to be rolled into next release)`.

#### `#trivial`

If you are making changes that do not need a version bump in any part of the repo (usually, only documentation related changes), then you can use this tag to skip the Danger.js checks on your PR.

## Publishing via npm

To publish a package to **npm**, please first ensure that you have registered an account on [npmjs.com](https://www.npmjs.com/).

Internal contributors (JET Employees) should request to be added to the Just Eat npm organisation by asking in the #guild-frontend Slack channel and providing their npm username. This will then allow you to publish the packages from our mono-repo.

To be able to publish you will need to run `npm login` first. You will also need to add your github access token to `.npmrc` file for components to be published to our Storybook. More info about that can be found [here](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages).

External contributors should raise a pull request and the release will be handled for you once approved.

Once you are happy that the package is ready to be published, ensure you are on the correct branch — typically the `master`/`main` branch with the latest changes pulled. Then run `npm publish` on the command line.

## Publishing beta releases

It can be useful to publish a package under a beta or alpha tag, prior to publishing it on the default release tag. For example, when working on a major version release that can be used by some consuming applications, but should not be made fully available for consumption.

To do this, we use npm tags and separate release branches.

As an example, if the current version of `@justeat/f-header` was currently `2.5.0` and I wanted to publish version 3 as a beta release, I would do the following.

1. Create a branch off the main repository branch to be used for my beta changes. All subsequent PRs should be merged into this branch until the release branch is merged back into the `main`/`master` repository branch, so that other teams can continue to work on version 2 of the component if needed.
2. Update the components version in its `package.json` to be `3.0.0-beta.0`. Subsequent v3 beta releases will increment this integer suffix `-beta.x`
3. Once a PR has been merged into the v3 release branch, the package should be published using the following command: `npm publish --tag beta`.
   This publishes the package using the tag `beta` ensuring that it doesn't get tagged as the `latest` version of the package.
4. When the package is ready for full release as v3, the `package.json` of the component should be updated to `3.0.0` in its `package.json` and a PR from the v3 release branch should be made back into the `main`/`master` branch. When this has been merged, the component can be published as normal using `npm publish`
