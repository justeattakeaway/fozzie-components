## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-services
    ```

    ```bash
    npm install @justeat/f-services
    ```

2.  Import the package

    You can import it in your like this (please note that styles have to be imported separately)

    ```
    import { window as windowServices } from '@justeat/f-services';

    ```

    If you are using Webpack, you can import the component dynamically to separate the services bundle from the main `bundle.client.js`:

3. Services in the bundle:

    ### axios
    - `createClient` - Create an axios client.
    - `createCamelCaseClient` - Create an axios client with all response JSON transformed to camelCase.
    - `createSmartGatewayClient` - Wraps `createCamelCaseClient` providing a `smartGatewayEndpoint`.
    - `objectToCamelCase` - Recursively converts object's property names to camelCase.
    - `getNetworkDetails` - Uses the navigator API (falling back to moz/webkit) to return network information.

    ### globalisation
    - `getLocale` - Returns the locale for the current tenant, if the configuration for that locale is present, otherwise returns the default locale.
    - `getTheme` - Returns the theme based on the user's locale. Either `ml` for Menulog or `je` for Just Eat.

    ### window
    Uses the `window-or-global` module for SSR compatibility.
    - `getWindowWidth` - Returns the current innerWidth.
    - `getWindowHeight` - Returns the current innerHeight.
    - `addEvent` - Add an event listener with a callback function. Optional throttling.
    - `removeEvent` - Remove an event listener.
