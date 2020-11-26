<div align="center">
<h1>f-metadata</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Braze Content Cards Interface</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-metadata.svg)](https://badge.fury.io/js/%40justeat%2Ff-metadata)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-metadata/badge.svg)](https://coveralls.io/github/justeat/f-metadata)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-metadata/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-metadata?targetFile=package.json)

This package provides an interface for initialising Braze and handling content cards and in-app messages.

## Installation

Install the module using NPM or Yarn:

```bash
// yarn
$ yarn add @justeat/f-metadata

// or npm
$ npm install @justeat/f-metadata
```

The package can then be imported into your application:

```js
// import
import initialiseBraze from '@justeat/f-metadata';

// or require
const initialiseBraze = require('@justeat/f-metadata');
```

## Usage

### Initialisation

The package comes with one method for initialising Braze, or retrieving the already initialised module.

This method returns an instance of the BrazeDispatcher class, which can also be used for logging interactions with braze elements returned from the API.

All other functionality, such as handling content cards or intercepting in-app messages can be done with callbacks passed through config.

**Basic Example**

```js
import initialise from '@justeat/f-metadata'

const config = {
  apiKey: '1234-1234-1234',
  userId: 'ABC123',
  enableLogging: true,
  disableComponent: false,
  callbacks: {
    handleContentCards: cards => console.log(cards), // Braze content cards data
    handleContentCardsGrouped: groupedCards => console.log(groupedCards), // Braze content cards data
    interceptInAppMessages: inAppMessage => console.log(inAppMessage) // Braze in app message data
  }
};

const brazePromise = initialise(config);

// The below assumes card data is being rendered into elements with class "brazeCard", that they
// have card data as returned by braze attached to a "data-content-card" attribute, and that all
// elements accessible via that css selector are visible

brazePromise.then(brazeDispatcher => {
  const brazeCards = document.querySelectorAll('.brazeCard');

  let brazeCardsData = [];

  brazeCards.forEach(brazeCard => {
    brazeCardsData.push(brazeCard.dataset.contentCard);

    brazeCard.addEventListener('click', clickEvent => {
      brazeDispatcher.logCardClick(brazeCard.dataset.contentCard);
    });
  });

  brazeDispatcher.logCardImpressions(brazeCardsData);
});
```

### Config Object


#### `config.apiKey`

The Braze API key used when invoking calls to the Braze SDK. This can be found in the Braze Dashboard at *App Settings->Developer Console->Rest API Keys*.

#### `config.brands`

Sets the brands that the consumers have an interest in. Is concatenated to the current list of brands held
by the Braze adapter.

#### `config.userId`

The user ID to retrieve data for.

#### `config.enableLogging`

Enable/Disable verbose logging from the Braze SDK used for debugging.

#### `config.disableComponent`

Enable/Disable the Braze SDK when running experiments or feature toggling.

### `config.callbacks.handleContentCards`

A callback to be invoked when content cards have been retrieved.

### `config.callbacks.handleContentCardsGrouped`

A callback to be invoked when content cards have been retrieved, grouped by header card title.

### `config.callbacks.interceptInAppMessages`

A callback to be invoked when in-app messages have been retrieved.

> **Please note:** The dispatcher fires callbacks registered for in-app messages before it triggers the messages.

### `config.callbacks.interceptInAppMessageClickEvents`

The callback to be invoked when in-app messages have been clicked.

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

## Resources

| Name | Description | Link |
|:----|:----|:----|
| Appboy Technical Documentation | All documentation associated to the Javascript web SDK | [https://js.appboycdn.com/web-sdk/2.5/doc/module-appboy.html](https://js.appboycdn.com/web-sdk/2.5/doc/module-appboy.html) |
| Appboy GitHub Repo | Code repo and issue tracking | [https://github.com/Appboy/appboy-web-sdk](https://github.com/Appboy/appboy-web-sdk) |
