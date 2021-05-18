const filterByEnabledCardTypes = (cards, enabledCardTypes) => cards
    .filter(({ type }) => {
        if (enabledCardTypes.length > 0) {
            return !type || enabledCardTypes.includes(type);
        }
        return true;
    });
export default filterByEnabledCardTypes;
