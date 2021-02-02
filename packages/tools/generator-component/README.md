<div align="center">

# generator-component

<img width="125" alt="Fozzie Bear" src="../../../bear.png" />

A generator for Fozzie components.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Fgenerator-component.svg)](https://badge.fury.io/js/%40justeat%2Fgenerator-component)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/generator-component/badge.svg)](https://coveralls.io/github/justeat/generator-component)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/generator-component/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/generator-component?targetFile=package.json)


## Usage

### Installation

First, install `yeoman` if you haven't already done so:

```sh
$ npm install --global yo
```

And then install the component generator:

```sh
$ npm install --global @justeat/generator-component
```

### Running the generator

To run the generator, use this command from any directory within the `fozzie-components` repo:

```sh
yo @justeat/component
```

An interactive prompt should now be displayed asking for a Component name, description and a number of options for you to define the component that you are creating.

Once you have completed all the prompts, your scaffolded component will be generated 🎉

## Contributing

In order to contribute to the `generator-component`, it's advised to link your local build of the generator to Yeoman.

To do this, run `yarn link` from the root of the `generator-component` folder in the mono-repo.

Once you have done this, running `yo @justeat/component` will run your local copy of the generator (rather than the version installed globally via NPM).
