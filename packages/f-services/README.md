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
    import { windowServices } from '@justeat/f-services';

    // You can then (optionally) destructure
    // const { addEvent, getWindowWidth, removeEvent } = windowServices;

    ```

    If you are using Webpack, you can import the component dynamically to separate the services bundle from the main `bundle.client.js`:

3. Services in the bundle:

    ### axios
    - `createClient` - Create an axios client.
    - `createCamelCaseClient` - Create an axios client with all response JSON transformed to camelCase.
    - `createSmartGatewayClient` - Wraps `createCamelCaseClient` providing a `smartGatewayEndpoint`.
    - `getNetworkDetails` - Uses the navigator API (falling back to moz/webkit) to return network information.
    - `objectToCamelCase` - Recursively converts object's property names to camelCase.

    ### globalisation
    - `getLocale` - Returns the locale for the current tenant, if the configuration for that locale is present, otherwise returns the default locale.
    - `getTheme` - Returns the theme based on the user's locale. Either `ml` for Menulog or `je` for Just Eat.

    ### window
    Uses the `window-or-global` module for SSR compatibility.
    - `addEvent` - Add an event listener with a callback function. Optional throttling.
    - `getWindowHeight` - Returns the current innerHeight.
    - `getWindowWidth` - Returns the current innerWidth.
    - `removeEvent` - Remove an event listener.
