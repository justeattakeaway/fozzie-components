# Contributing

- Before creating a new component, please discuss it with us in #help-web
- New components should use [generator-component](https://github.com/justeat/fozzie-components/tree/master/packages/generator-component) to create the base structure of the component. It's usually a good idea to PR this base structure as a `v0.1.0` before adding any significant custom component code.

## Background Reading

If you want to learn more about fozzie-components and how it's structured, these are some good articles...

Description | Link
------------- | -------------
Guide to mono-repos | https://www.toptal.com/front-end/guide-to-monorepos
Our Open Source development guide | https://fozzie.just-eat.com/documentation/open-source/
Fozzie CSS Naming Scheme | https://fozzie.just-eat.com/documentation/css/css-naming
Fozzie Accessibility Guide | https://fozzie.just-eat.com/documentation/general/accessibility/

## Pull Request Process

When raising a PR in the `fozzie-components` repo, please follow these guidelines.

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
- Test your changes using Storybook (and ensure any modified/added props are added to the components story).
- Always consider if your change warrants adding/amending the components README. If you're changing or adding props, it will do.
- You need two reviews on your PR and all of the Danger.js and CircleCI build checks should pass.
- Please don't add any links to internal facing tools or wikis anywhere in this repo – so that's in the PR title and description, code, comments, commit titles and branch names.


## Useful PR tags

These tags are read by Danger.js and will allow you to bypass certain checks if you are making only documentation or configuration changes. These tags should be added as part of the PRs title.

- `#trivial` – If you are making changes that do not need a version bump in any part of the repo (usually, only documentation related changes), then you can use this tag to skip the Danger.js checks on your PR.
- `#globalconfig` – If you are making configuration changes to a number of packages (such as updating linting or test config), then you can simply bump the package version at the root of the mono-repo (as well as adding a CHANGELOG entry at the root describing the changes) and add the `#globalconfig` tag to your PR. This will then only run the Danger.js checks on the root of the mono-repo, and not for packages located in the `/packages` folder. It's generally good practice to also add a `CHANGELOG` entry to the individual packages that have been modified using the title `Latest (changes to be rolled into next release)`.
