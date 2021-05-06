const filterByEnabledCardTypes = (cards, enabledCardTypes) => cards
    .filter(({ type }) => (type ? enabledCardTypes.includes(type) : false));
export default filterByEnabledCardTypes;
