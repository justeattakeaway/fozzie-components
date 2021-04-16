# [0.7.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v0.7.0) (2021-04-16)


### Bug Fixes

* **fozzie-components:** fix formatting of all changelogs ([5301ad6](https://github.com/justeat/fozzie-components/commit/5301ad6fd4f2783c5894177dc1f6e9dbe639d1fb))
* **fozzie-components:** fix yarn.lock ([926c1ec](https://github.com/justeat/fozzie-components/commit/926c1ec14693e35c286a9b295901ea785373c35d))
* **fozzie-components:** follow conventional changelog format ([a4ef63f](https://github.com/justeat/fozzie-components/commit/a4ef63f131670340c035ffe4509bff1214fd6536))
* **fozzie-components:** update package.json ([a1e99eb](https://github.com/justeat/fozzie-components/commit/a1e99eb937c414a2e23c759dcb269bb75fc85bee))


### Features

* **fozzie-components:** adds commitizen support and husky / git hook support ([11c1026](https://github.com/justeat/fozzie-components/commit/11c10261d45ce2e9bfa89b026cf85d8cf52b5d63))
* **fozzie-components:** enforce commit messages to follow conventional commit format ([131eeb1](https://github.com/justeat/fozzie-components/commit/131eeb152b7b384d4054791cf535db403b9239ac))
* **fozzie-components:** enforce conventional commits with husky hook ([3d8f4aa](https://github.com/justeat/fozzie-components/commit/3d8f4aa6e0a05273d5962fae3937ac281aebce70))
* **fozzie-components:** runs linting against changed packages ([75fdfb6](https://github.com/justeat/fozzie-components/commit/75fdfb6546224ebb8621deadecd911f2cb96dfc8))



v0.7.0
------------------------------
*April 8, 2021*

### Changed
- Wrapped cookie banner content to a div which now is a description for the assistive tech via `aria-describedby`
- Moved dialog role and aria labels to the higher div to contain both banner context and buttons
- `f-button` component version bump


v0.6.1
------------------------------
*April 6, 2021*

### Fixed
- DataLayer push on showing banner
- Call resendEvents on "Accept all" button click
- Update tests


v0.6.0
------------------------------
*March 18, 2021*

### Added
- New tests to test f-cookiebanner in `component`
- New test supporting files in `test-utils/compoenent-objects`
- Browserstack support and file structures in tests
- A11y tests

### Fixed
- URL for NZ cookie policy


v0.5.0
------------------------------
*March 9, 2021*

### Changed
- Legacy banner button to use native button.
- Switch to legacy banner for AU/NZ


v0.4.0
------------------------------
*March 2, 2021*

### Changed
- Default locale prop value `en-GB` to be `''`.


v0.3.2
------------------------------
*March 2, 2021*

### Fixed
- Protocol missing from image request (Required for Lighthouse checks).

v0.3.1
------------------------------
*March 2, 2021*

### Fixed
- `shouldHideBanner` data property defaults to `true` in order to avoid flash of cookie banner after it has been dismissed.

v0.3.0
------------------------------
*February 25, 2021*

### Changed
- Update tests to use js-cookie.
- Update legacy cookie value
- Remove f-globalisation mixin

v0.2.0
------------------------------
*February 17, 2021*

### Changed
- Use js-cookie instead of universal-cookie.

### Removed
- Remove Storybook 'knob' for setting legacy banner.

v0.1.2
------------------------------
*February 12, 2021*

### Changed
- Set `isIosBrowser` property on page mount so that we can avoid using `process` check which caused issues with SSR.
- Minor lint updates.
- Moved legacy banner check into computed property in order to avoid the flash of the modern cookie banner on page load.

v0.1.1
------------------------------
*February 11, 2021*

### Changed
- Amend class name on legacy banner
- Move legacy banner out of overlay
- Include hide class for legacy banner
- Wrap `navigator` call in conditional for `process.browser`

v0.1.0
------------------------------
*February 3, 2021*

### Added
- Initial commit
