export const SUBMIT_LOGIN_CHALLENGE_URL = 'applications/coreweb/validate-mfa-token';

export const CONVERSATION_ID_HEADER_NAME = 'x-je-conversation';

export const CONVERSATION_ID_COOKIE_NAME = 'x-je-conversation';

export const EMAIL_HTML5_REGEX = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'; // eslint-disable-line no-useless-escape

export const MFA_CODE_REGEX = '/{,32}/';

// No Host just path
export const RETURN_URL_REGEX = '/^(?!(http:\/\/|https:\/\/|www\.|(.*\.))).*$/'; // eslint-disable-line no-useless-escape
