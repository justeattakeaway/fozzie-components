export default function argumentStringBuilder (args) {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB',
        ...args
    };

    let argumentString = '';

    Object.entries(checkoutInfo).forEach(entry => {
        const [key, value] = entry;

        argumentString += `${key}:${value};`;
    });

    return argumentString;
}
