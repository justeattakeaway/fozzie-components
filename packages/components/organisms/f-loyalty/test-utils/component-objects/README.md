# What is a component object?
A component object is a file that is used to define the UI selectors / functionality of a component that is then utilised by WebDriverIO for browser-based automation testing.

# Usage
Please add a component object if this component is interacted with as part of browser-based automation tests. This can be done either by:
- Component tests for this component.
In this scenario, the component object should be imported into the WebDriverIO spec file.

- Component tests for a parent component.
In this scenario, the component object should be imported into the parent component object.

- System tests as part of a consuming application.
In this scenario, the `test-utils` folder needs to be added to the `files` section within `package.json` so that it can be imported by the consuming application.