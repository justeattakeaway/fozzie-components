import mock, { proxy } from 'xhr-mock';
import data from '../../mockData/data';
import cards from '../../mockData/cards';

/**
 * Resets all locally stored braze data so that the stubbed data is always fresh on page load
 */
function resetBrazeData () {
    document.cookie
        .split('; ')
        .filter(row => row.startsWith('ab.'))
        .map(row => row.split('=')[0])
        .forEach(cookieName => {
            document.cookie = `${cookieName}=;max-age=0`;
        });

    Object.keys(localStorage)
        .filter(row => row.startsWith('ab.'))
        .forEach(storageItem => {
            localStorage.removeItem(storageItem);
        });
}

export function allCardsMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, {
        status: 201,
        body: JSON.stringify(cards())
    });
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

export function zeroCardsMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, {
        status: 201,
        body: JSON.stringify({ cards: [] })
    });
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

export function notReturningMockSetup () {
    resetBrazeData();
    mock.teardown();
    mock.setup();
    mock.post(/\/api\/v3\/content_cards\/sync\/?/, () => new Promise(resolve => {
        this.rejectMockPromise = resolve;
    }));
    mock.post(/\/api\/v3\/data\/?/, {
        status: 201,
        body: JSON.stringify(data())
    });
    mock.use(proxy);
}

export default {
    allCardsMockSetup,
    notReturningMockSetup,
    zeroCardsMockSetup
};
