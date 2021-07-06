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
    function fullKey (key) {
        return (scope && `${scope}::${key}`) || key;
    }
    function forward (fn, key) {
        return fn(fullKey(key));
    }
    return {
        getBooleanValue: key => forward(getBooleanValue, key),
        getIntegerValue: key => forward(getIntegerValue, key),
        getStringValue: key => forward(getStringValue, key)
    };
}
