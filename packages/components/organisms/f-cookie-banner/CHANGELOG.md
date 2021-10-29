# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v3.5.1
------------------------------
*October 29, 2021*

### Fixed
- ResizeObserver disconnect not called when legacy mode or shouldAbsolutePositionReopenLink = false.


v3.5.0
------------------------------
*October 19, 2021*

### Changed
- Specified cookie banner text font size to be 14px as default paragraph font size now is 16px.


v3.4.0
------------------------------
*October 18, 2021*

### Changed
- ResizeObserver to use requestAnimationFrame and watcher to ensure ResizeObserver does not throw `ResizeObserver loop limit exceeded` error.


v3.3.3
------------------------------
*October 15, 2021*

- Bump `f-mega-modal` version to fix a bad previous publish.


v3.3.2
------------------------------
*October 14, 2021*

### Changed
- Bump `f-mega-modal` version to clean f-button styles.


v3.3.1
------------------------------
*October 13, 2021*

### Changed
- "Accept all required cookies" ghost button to outline button.
- Removed top margin from the banner title.
- Bump f-button version to add more space between full width buttons.


v3.3.0
------------------------------
*October 13, 2021*

### Added
- `domain` prop to allow the consumer to specify which hosts can receive this component's cookie.


v3.2.1
------------------------------
*October 08, 2021*

### Changed
- Non Vue version default `shouldAbsolutePositionReopenLink` prop to false in base template. Add object property check when accessing re-open link height.


v3.2.0
------------------------------
*October 06, 2021*

### Added
- New prop `nameSuffix` so teams or 3rd parties using this component can save the user's consent under a different cookie name. This allows the cookie banner to work on multiple sub-domains easily.


v3.1.0
------------------------------
*October 05, 2021*

### Fixed
- Reopen link positioning bug by adding and using a ResizeObserver. This ensures body content changes ouside of f-cookie-banner and recalculates if the link should be absolutely positioned.

### Added
- New prop `shouldAbsolutePositionReopenLink` so teams or 3rd parties using this component can disable the re-open link absolute positioning


v3.0.0
------------------------------
*October 5, 2021*

### Changed
- Updated version of `f-button` and `f-mega-modal` to include icing phase 2 changes.


v2.2.1
------------------------------
*September 27, 2021*

### Added
- Add tab loop when reopen banner link is clicked


v2.2.0
------------------------------
*September 21, 2021*

### Added
- Banner now has tab loop to keep keyboard navigation users within the banner


v2.1.0
------------------------------
*September 17, 2021*

### Fixed
- Moved `isBodyHeightLessThanWindowHeight` to methods as computed properties are `undefined` during data creation.

### Added
- Dispatch "window" event `f-cookie-banner-accepted` after cookie consent is accepted


v2.0.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-button` and `f-mega-modal`.

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v1.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.


v1.0.0-beta.2
------------------------------
*September 9, 2021*

### Removed
- `font-weight` override of the banner title


v1.0.0-beta.1
------------------------------
*September 6, 2021*

### Changed
- Updated version of `f-mega-modal` (JETSans Update)


v1.0.0-beta.0
------------------------------
*September 9, 2021*

### Changed
- Updated version of `f-button` (JETSans Update)


v0.25.0
------------------------------
*September 9, 2021*

### Changed
- Updated version of `f-button` (JETSans Update)

### Added
- Tests to cover version changes in v0.24.0.

### Changed
- `dk-DK` to `da-DK`.


v0.24.0
------------------------------
*August 27, 2021*

### Fixed
- Moved `isBodyHeightLessThanWindowHeight` to computed so it can re-calculate cookie position.

### Changed
- Updated version of `f-button`.


v0.23.0
------------------------------
*August 19, 2021*

### Added
- `dk-DK` to the list of locales in the banner's static version.


v0.22.0
------------------------------
*August 18, 2021*

### Changed
- Expiry date set to 90 days
- Check for "window" object when checking height to avoid SSR error


v0.21.0
------------------------------
*July 30, 2021*

### Changed
- Reopen link should appear at the bottom of the window, even when the main content is less than 100% height


Latest (to be added to next version)
------------------------------
*July 15, 2021*

### Changed
- Updated version of `f-button`.


v0.20.0
------------------------------
*July 12, 2021*

### Changed
- Reopen link should not show for tenants where legacy banner is used
- shouldUseGreyBackground prop wired up correctly


v0.19.0
------------------------------
*June 24, 2021*

### Added
- Config to generate compiled vanilla js versions of the vue component


v0.18.0
------------------------------
*June 17, 2021*

### Changed
- UK to two-button banner


v0.17.0
------------------------------
*June 17, 2021*

### Changed
- Percy to run desktop / mobile in separate specs


v0.16.1
------------------------------
*June 15, 2021*

### Changed
- Set default of useGreyBackground to true (most JE apps need this set to true)


v0.16.0
------------------------------
*June 14, 2021*

### Added
- Attach link to bottom of page to reopen the cookie consent banner


v0.15.0
------------------------------
*June 10, 2021*

### Changed
- Hide banner action wrapped in Promise to call the resendEvents asynchronously
- Tests updated accordingly


v0.14.0
------------------------------
*June 9, 2021*

### Added
- Percy Visual Regression tests for Legacy and ConsentBanner


v0.13.0
------------------------------
*May 27, 2021*

### Added
- Method to hide legacy cookie banner(s) to avoid race conditions


v0.12.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.11.0
------------------------------
*May 24, 2021*

### Changed
- Component object export
- New `policyLinkHref` function in component objects


v0.10.0
------------------------------
*May 18, 2021*

### Changed
- rename showLegacyBanner prop to shouldShowLegacyBanner for Sacha
- shouldShowLegacyBanner can be passed in as a prop to allow experimentation in UK rollout


v0.9.0
------------------------------
*May 10, 2021*

### Removed
- `is-visuallyHidden` css style definition as should come from `fozzie`


v0.8.0
------------------------------
*May 6, 2021*

### Added
- `f-mega-modal` component to cookie banner.

### Removed
- Styles related to old modal & modal container.

### Fixed
- Added documentation to indicate cookie-banner will delete cookies conditionally that are not in the exclusion list.


v0.7.1
------------------------------
*April 22, 2021*

### Changed
- Added is-visuallyHidden CSS to Legacy Banner
- Add locale prop to usage documentation in README


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
