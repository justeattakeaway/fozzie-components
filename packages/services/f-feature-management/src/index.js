const logValueRequest = (func, key, value) => {
    console.log(`${func.name}: ${key} => ${value}`); // es-lint-disable
};

function getBooleanValue (key) {
    logValueRequest(getBooleanValue, key, true);
    return true; // TODO: implementation
}


function getIntegerValue (key) {
    logValueRequest(getIntegerValue, key, 0);
    return 0; // TODO: implementation
}


function getStringValue (key) {
    logValueRequest(getStringValue, key, '');
    return ''; // TODO: implementation
}

function getValue (key) {
    logValueRequest(getValue, key, null);
    return null; // TODO: implementation
}

export default function (scope) {
    const fullKey = key => (scope
        ? `${scope}::${key}`
        : key);

    return {
        getBooleanValue: key => getBooleanValue(fullKey(key)),
        getIntegerValue: key => getIntegerValue(fullKey(key)),
        getStringValue: key => getStringValue(fullKey(key)),
        getValue: key => getValue(fullKey(key))
    };
}
