
<div align="center">
  <h1>f-<%= name.default %></h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p><%= description %></p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-<%= name.default %>.svg)](https://badge.fury.io/js/%40justeat%2Ff-<%= name.default %>)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-<%= name.default %>/badge.svg)](https://coveralls.io/github/justeat/f-<%= name.default %>)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-<%= name.default %>/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-<%= name.default %>?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-<%= name.default %>
    ```

    ```bash
    npm install @justeat/f-<%= name.default %>
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import <%= name.component %> from '@justeat/f-<%= name.default %>';
    import '@justeat/f-<%= name.default %>/dist/f-<%= name.default %>.css';

    export default {
        components: {
            <%= name.component %>
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-<%= name.default %>/dist/f-<%= name.default %>.css';

    export default {
        components: {
            ...
            <%= name.component %>: () => import(/* webpackChunkName: "<%= name.template%>" */ '@justeat/f-<%= name.default %>')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-<%= name.default %>
yarn install
```

### Storybook

The component is also available to demo through our storybook instance which can be served locally by running `yarn storybook:serve` from the mono-repo root.
## Documentation to be completed once module is in stable state.
