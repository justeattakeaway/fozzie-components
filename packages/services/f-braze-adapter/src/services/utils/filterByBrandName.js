/**
 * Filters cards by brand name using the brand key
 * @param cards
 * @param brands
 */
const filterByBrands = (cards, brands) => cards.filter(({ brand }) => {
    if (brands.length > 0) {
        return !brand || brands.includes(brand);
    }
    return true;
});
export default filterByBrands;
