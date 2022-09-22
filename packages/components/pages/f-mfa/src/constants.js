// eslint-disable-next-line no-control-regex
export const EMAIL_RFC5322_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Alphanumeric, plus hyphens and underscores. Length between 20 and 60.
export const MFA_CODE_REGEX = /^[a-zA-Z0-9\-_]{20,60}$/;

// Disallows protocol, www., path traversal, script injection and double encoding.
/**
 * %3C = single-encoded <
 * %3E = single-encoded >
 * %252F = double-encoded /
 * %253C = double-encoded <
 * %253E = double-encoded >
 */
export const RETURN_URL_REGEX = /^(?!(http:\/\/|https:\/\/|www\.|.*\.\/|(.*[a-zA-Z]\.)|(.*%252[Ff])|(.*[<>])|(.*\.\\)|.*%253[Cc]|.*%253[Ee]|.*%3[Cc]|.*%3[Ee])).*$/;

export const REDIRECT_URL_EVENT_NAME = 'mfa-success-return-url';
