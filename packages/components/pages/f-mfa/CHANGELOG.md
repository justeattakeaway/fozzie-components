# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.10.0
------------------------------
*August 17, 2022*

### Changed
- Changed mfa load success log message to `Info`.
- Help screen primary button text.
  
### Removed
- Mfa Form field validation/message.

### Added
- GTM events.
- Back button to error screen.


v0.9.1
------------------------------
*August 11, 2022*

### Changed
- Update `code` regex.

### Added
- Success/failure logs on page load.


v0.9.0
------------------------------
*August 11, 2022*

### Changed
- Take in the entire MFA `validateUrl` instead of building it up from `smartGatewayBaseUrl`.
- Help link now points to FAQs page.

### Fixed
- Pass `returnUrl` through to Help component.


v0.8.2
------------------------------
*August 10, 2022*

### Added
- Vertical margin to MFA component.


v0.8.1
------------------------------
*August 10, 2022*

### Changed
- Prepared the storybook story to handle changing of the properties and simulating the different api responses


v0.8.0
------------------------------
*August 9, 2022*

### Added
- Help info card/page.

### Changed
- "Need help?" button now points to new help page.


v0.7.0
------------------------------
*August 9, 2022*

### Changed
- Instead of reading the querystring for our values they are now being supplied as properties


v0.6.0
------------------------------
*August 8, 2022*

### Added
- Validation of the input data (querystring).
- Error page
- Emit Event upon success with the return url


v0.5.1
------------------------------
*August 8, 2022*

### Changed
- Primary and secondary action buttons to size large.
- Primary button to full width.


v0.5.0
------------------------------
*August 2, 2022*

### Added
- Error handling for different status codes.
- Visuals for errors from validation and API.


v0.4.0
------------------------------
*August 1, 2022*

### Added
- Api provider for call to AccountWeb (`PostChallenge()`)


v0.3.0
------------------------------
*August 1, 2022*

### Added
- MFA page template to match designs


v0.2.1
------------------------------
*July 27, 2022*

### Fixed
- ES6 syntax in WebDriverIO tests.
- Tests not async / awaiting commands.


v0.2.0
------------------------------
*July 25, 2022*

### Added
- Node 16 support.


v0.1.0
------------------------------
*July 20, 2022*

### Added
- Initial Yeoman Generated Files
