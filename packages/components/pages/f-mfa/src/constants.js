export const CONVERSATION_ID_HEADER_NAME = 'x-je-conversation';

export const CONVERSATION_ID_COOKIE_NAME = 'x-je-conversation';

// eslint-disable-next-line no-control-regex
export const EMAIL_RFC5322_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Alphnumeric, between 6 and 32
export const MFA_CODE_REGEX = /^[a-zA-Z0-9]{6,32}$/;

// No Host allowed, just path
export const RETURN_URL_REGEX = /^(?!(http:\/\/|https:\/\/|www\.|(.*\.))).*$/;

export const REDIRECT_URL_EVENT_NAME = 'mfa-success-return-url';
