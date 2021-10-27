import { Factory } from 'miragejs';
import faker from 'faker';
import stampCard1 from '../traits/stampCard1';

function timeRange10HoursAroundNow () {
    const now = Math.floor(Date.now() / 1000);
    return {
        nowPlus5Hours: now + 60 * 60 * 5,
        nowMinus5Hours: now - 60 * 60 * 5
    };
}

const { nowMinus5Hours, nowPlus5Hours } = timeRange10HoursAroundNow();

/* eslint-disable camelcase */
export default Factory.extend({
    id: () => Buffer.from([`5d79109d167e923a83d3d7db_$_cc=${faker.datatype.uuid()}`, 'mv=5d79109d167e923a83d3d7dd', 'pi=cmp']
        .join('&'))
        .toString('base64'),
    v: false,
    cl: false,
    p: true,
    db: false,
    ca: nowMinus5Hours, // created at
    ea: nowPlus5Hours, // expires at
    stampCard: stampCard1,
    tp: 'short_news',
    ar: 1,
    u: null,
    uw: null,
    tt: () => faker.lorem.sentence(), // title ?
    ds: faker.lorem.sentence(), // description ?
    dm: faker.internet.domainName() // url call to action ?
});
