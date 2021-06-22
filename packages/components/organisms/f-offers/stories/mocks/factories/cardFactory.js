import { Factory } from 'miragejs';
import faker from 'faker';
import anniversaryCard1Trait from '../traits/anniversaryCard1Trait';
import headerCardTrait from '../traits/headerCardTrait';
import homePromotionCard1Trait from '../traits/homePromotionCard1Trait';
import homePromotionCard2Trait from '../traits/homePromotionCard2Trait';
import postOrderCard1Trait from '../traits/postOrderCard1Trait';
import promotionCard1Trait from '../traits/promotionCard1Trait';
import promotionCard2Trait from '../traits/promotionCard2Trait';
import recommendationCard1Trait from '../traits/recommendationCard1Trait';
import restaurantFTCOfferCardTrait from '../traits/restaurantFTCOfferCardTrait';
import termsAndConditionsCard2Trait from '../traits/termsAndConditionsCard2Trait';
import voucherCard1Trait from '../traits/voucherCard1Trait';
import promotionCard2TraitV2 from '../traits/promotionCard2TraitV2';

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
    id: () => Buffer.from([`5d79109d167e923a83d3d7db_$_cc=${faker.random.uuid()}`, 'mv=5d79109d167e923a83d3d7dd', 'pi=cmp']
        .join('&'))
        .toString('base64'),
    v: false,
    cl: false,
    p: true,
    db: false,
    ca: nowMinus5Hours, // created at
    ea: nowPlus5Hours, // expires at
    anniversaryCard1: anniversaryCard1Trait,
    headerCard: headerCardTrait,
    homePromotionCard1: homePromotionCard1Trait,
    homePromotionCard2: homePromotionCard2Trait,
    postOrderCard1: postOrderCard1Trait,
    promotionCard1: promotionCard1Trait,
    promotionCard2: promotionCard2Trait,
    promotionCard2v2: promotionCard2TraitV2,
    recommendationCard1: recommendationCard1Trait,
    restaurantFTCOfferCardT: restaurantFTCOfferCardTrait,
    termsAndConditionsCard2: termsAndConditionsCard2Trait,
    voucherCard1: voucherCard1Trait,
    tp: 'short_news',
    ar: 1,
    u: null,
    uw: null,
    tt: () => faker.lorem.sentence(), // title ?
    ds: faker.lorem.sentence(), // description ?
    dm: faker.internet.domainName() // url call to action ?
});
