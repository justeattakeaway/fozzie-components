<!-- markdownlint-disable -->
<div align="center">
    <h1>f-user-message</h1>

    <img width="125" alt="Fozzie Bear" src="../../bear.png" />

    <p>Global User message Component for Vue.js.</p>
</div>

---

[![Coverage Status](https://coveralls.io/repos/github/justeat/f-user-message/badge.svg)](https://coveralls.io/github/justeat/f-user-message)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-user-message/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-user-message?targetFile=package.json)
<!-- markdownlint-enable -->

<!-- markdownlint-disable MD002 -->
## Usage
<!-- markdownlint-enable -->

1. Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-user-message
    # Alternatively if using npm
    npm install @justeat/f-user-message
    ```

2. Import the component

    You can import it in your Vue SFC like this (please note that styles have
    to be imported separately):

    ```JavaScript
    import UserMessage from '@justeat/f-user-message';
    import '@justeat/f-user-message/dist/f-user-message.css';
    export default {
        components: {
            UserMessage
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to
    separate the user message bundle from the main `bundle.client.js`:

    <!-- markdownlint-disable MD013 -->
    ```JavaScript
    import '@justeat/f-user-message/dist/f-user-message.css';
    export default {
        components: {
            ...
            UserMessage: () => import(/* webpackChunkName: "vue-user-message" */ '@justeat/f-user-message')
        }
    }
    ```
    <!-- markdownlint-enable MD013 -->

3. Properties which component accepts:

    `locale` - If there is a vue-i18n plugin in the project, the user message
     component can be called without locale property, otherwise it accepts it
     in format like 'en-GB'

## Development
It is recommended to run the following commands at the root of the monorepo in order to install dependencies and allow you to view components in isolation via Storybook.

```bash
# cd ./fozzie-components
yarn install

## Testing
Unit / Integration / Contract

```bash
# Run Unit / Integration / Contract tests for all components
cd ./fozzie-components
yarn test
```

OR

```bash
# Run Unit / Integration / Contract tests for f-user-message
cd ./fozzie-components/packages/f-user-message
yarn test
```

Component Tests
```bash
# Run Component tests for all components
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

OR

```bash
# Run Component tests for f-user-message
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-user-message
yarn test-component:chrome
```

