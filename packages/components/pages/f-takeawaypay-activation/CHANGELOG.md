# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v2.8.0
------------------------------
*December 1, 2021*

### Changed
- Update visual regression tests to include UK and AU tenants, as they have different branding (JustEat Pay / Menulog Pay).

v2.7.0
------------------------------
*October 29, 2021*

### Changed
- Moved to the `components/pages` directory.


v2.6.0
------------------------------
*October 29, 2021*

### Changed
- Added AU localization


v2.5.1
------------------------------
*October 13, 2021*

### Changed
- Updated version of `f-button` which have styles for more space between action buttons. Removed custom styles added in v2.5.0.


v2.5.0
------------------------------
*October 13, 2021*

### Changed
- Added more space between action buttons


v2.4.0
------------------------------
*October 11, 2021*

### Changed
- Component tests
- Accessibility tests
- Visual regression tests


v2.3.0
------------------------------
*October 08, 2021*

### Changed
- Takeaway Pay => Just Eat Pay renaming


v2.2.1
------------------------------
*October 06, 2021*

Re-publish to clean up the old styles from the compiled package.


v2.2.0
------------------------------
*October 06, 2021*

### Changed
- Reverted Takeaway Pay => Just Eat Pay renaming


v2.1.0
------------------------------
*October 05, 2021*

### Added
- Visual regression tests


v2.0.0
------------------------------
*October 5, 2021*

### Changed
- Updated version of `f-button` and `f-card` to include icing phase 2 changes.

### Removed
- `is-rounded` prop from `f-card` component call as the card is now rounded by default.


v1.2.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-button` and `f-card`.

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v1.1.0
------------------------------
*September 15, 2021*

### Changed
- Updated branding for UK


v1.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.


v1.0.0-beta.1
------------------------------
*September 1, 2021*

### Updated
- `f-button` to v2.0.0-beta.0 which use the new font


v1.0.0-beta.0
------------------------------
*August 26, 2021*

### Updated
- New font JETSansDigital


v0.9.0
------------------------------
*August 17, 2021*

### Changed
- Updated icons according to mockups


v0.8.0
------------------------------
*August 13, 2021*

### Added
- Loading spinner

### Changed
- Cleanup styles

v0.7.0
------------------------------
*August 9, 2021*

### Added
- Added logic to handle guest users
- Code cleanup


v0.6.0
------------------------------
*August 09, 2021*

### Added
- Added logging around API requests


Latest (to be added to next release)
------------------------------
*July 26, 2021*

### Changed
- Updated version of `f-button`.


v0.4.0
------------------------------
*July 20, 2021*

### Changed
- Updated version of `f-button`.
- Dynamically update UI based on activation states.


v0.3.0
------------------------------
*June 30, 2021*

### Changed
- Extracted styles to the separate file


v0.2.0
------------------------------
*June 27, 2021*

### Added
- Created markup/styles for the static components.


v0.1.0
------------------------------
*May 14, 2021*

### Added
- Generated Takeaway Pay activation component.
