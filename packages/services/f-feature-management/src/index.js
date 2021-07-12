const logValueRequest = (func, key, value) => {
    console.log(`${func.name}: ${key} => ${value}`); // es-lint-disable
}

function getBooleanValue (key) {
    logValueRequest(getBooleanValue, key, true);
    return true; // TODO: implementation
}


function getIntegerValue (key) {
    logValueRequest(getIntegerValue, key, true);
    return 0; // TODO: implementation
}


function getStringValue (key) {
    logValueRequest(getStringValue, key, true);
    return ''; // TODO: implementation
}

export default function (scope) {
    const fullKey = key => scope
        // ternary preferred over && and || operators, and break to indented multi-line for readability
        ? `${scope}::${key}`)
        : key;

    return {
        getBooleanValue: key => getBooleanValue(fullKey(key)),
        getIntegerValue: key => getIntegerValue(fullKey(key)),
        getStringValue: key => getStringValue(fullKey(key))
    };
}
