const localStorageMock = (function localStorageMock () {
    let store = {};
    return {
        getItem: function getItem (key) {
            return store[key];
        },
        setItem: function setItem (key, value) {
            store[key] = value.toString();
        },
        clear: function clear () {
            store = {};
        },
        removeItem: function removeItem (key) {
            delete store[key];
        }
    };
}());

export default localStorageMock;
