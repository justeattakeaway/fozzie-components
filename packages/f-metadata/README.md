<div align="center">
<h1>f-metadata</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Global Header Component for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-metadata.svg)](https://badge.fury.io/js/%40justeat%2Ff-metadata)
[![Build Status](https://travis-ci.org/justeat/f-metadata.svg)](https://travis-ci.org/justeat/f-metadata)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-metadata/badge.svg)](https://coveralls.io/github/justeat/f-metadata)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-metadata/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-metadata?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-metadata
    ```

    ```bash
    npm install @justeat/f-metadata
    ```

2.  Import the package

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import initialiseBraze from '@justeat/f-metadata';
    ```

3. Properties which component accepts:

    `enableLogging` - If set to `true`, it allows Braze logging in the console. Default set to `false`.

    `disableComponent` - If set to `true`, it does not initialise Braze when called. Default set to `false`.
    
## Migration to v2

Version 2 exposes the appboy instance as opposed to content cards as part of the refresh callback, this makes it easier to access properties on the instance such as `getUnviewedCardCount` and is a step closer to an isomorphic solution.

### Accessing Cards

Cards are now accessible on `myCallbackMethod.cards`.

**For example**

```js
// v1 implementation
const myCallback = cards => console.log(cards); // [...cards]
appboy.requestImmediateRefresh();
// [...cards]

// v2 implementation
const myCallback = cardsInstance => console.log(cardsInstance); // {cards: [...cards]}
appboy.requestImmediateRefresh();
// { cards: [...cards]}
```

