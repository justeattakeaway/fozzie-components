const filterByBrands = (cards, brands) => cards.filter(({ brand }) => !brand || brands.includes(brand));
export default filterByBrands;
