/* eslint-disable camelcase */
import { silentSignIn, reset } from '../src/silent-signin';
import { userManagerFactory } from '../src/user-manager-factory';

jest.mock('../src/user-manager-factory');

const oidcMgr = jest.fn();
oidcMgr.getUser = jest.fn();
oidcMgr.signinSilent = jest.fn();

userManagerFactory.mockReturnValue(oidcMgr);

function expectToken (tokenValue, force = false) {
    return silentSignIn(null, null, force)
        .then(token => {
            expect(token).toBe(tokenValue);
            return true;
        })
        .catch(error => expect(error).toBe(false));
}

beforeEach(() => {
    reset();
    jest.clearAllMocks();
});

test('If user stored return its token', () => {
    const storedUser = { access_token: 'token from stored user' };

    oidcMgr.getUser.mockResolvedValue(storedUser);

    expectToken(storedUser.access_token);
});

test('If no user stored but user signed in, return its token', () => {
    const storedUser = null;

    oidcMgr.getUser.mockResolvedValue(storedUser);

    const userFromSignin = { access_token: 'token from successful sign in' };

    oidcMgr.signinSilent.mockResolvedValue(userFromSignin);

    expectToken(userFromSignin.access_token);
});


test('If no user stored and user not signed in, return null', () => {
    const storedUser = null;

    oidcMgr.getUser.mockResolvedValue(storedUser);

    oidcMgr.signinSilent.mockRejectedValue(new Error('login_required'));

    expectToken(null);
});

test('If no user stored but user signed in, we get user the 2nd time too without doing signin', () => {
    const storedUser = null;

    oidcMgr.getUser.mockResolvedValue(storedUser);

    const userFromSignin = { access_token: 'token from successful sign in' };

    oidcMgr.signinSilent.mockResolvedValueOnce(userFromSignin);
    oidcMgr.signinSilent.mockRejectedValue("shouldn't be hit");

    return expectToken(userFromSignin.access_token).then(() => expectToken(userFromSignin.access_token));
});


test('Check that our method for testing 2 consecutive sign-ins fails if we\'ve reset in between', () => {
    const storedUser = null;

    oidcMgr.getUser.mockResolvedValue(storedUser);

    const userFromSignin = { access_token: 'token from successful sign in' };

    oidcMgr.signinSilent.mockResolvedValueOnce(userFromSignin);
    oidcMgr.signinSilent.mockRejectedValue('error');

    return expectToken(userFromSignin.access_token).then(() => {
        reset();
        return silentSignIn()
            .then(() => expect(true).toBe(false))
            .catch(error => expect(error).toBe('error'));
    });
});

test('If no user stored and user not signed in, we null token the 2nd time too without doing signin', () => {
    const storedUser = null;

    oidcMgr.getUser.mockResolvedValue(storedUser);

    oidcMgr.signinSilent.mockRejectedValueOnce(new Error('login_required'));
    oidcMgr.signinSilent.mockRejectedValue("shouldn't be hit");

    return expectToken(null).then(() => expectToken(null));
});

test('If error checking for stored user we go through signin process', () => {
    oidcMgr.getUser.mockRejectedValue('error');

    const userFromSignin = { access_token: 'token from successful sign in' };

    oidcMgr.signinSilent.mockResolvedValueOnce(userFromSignin);

    return expectToken(userFromSignin.access_token);
});

test('If force signin, we skip get user attempt and go straight through to signin process', () => {
    const storedUser = { access_token: 'token from stored user' };
    oidcMgr.getUser.mockResolvedValue(storedUser);

    const userFromSignin = { access_token: 'token from successful sign in' };
    oidcMgr.signinSilent.mockResolvedValueOnce(userFromSignin);

    return expectToken(userFromSignin.access_token, true);
});
