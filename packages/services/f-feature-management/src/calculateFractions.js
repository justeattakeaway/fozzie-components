/* eslint-disable no-bitwise */

import CryptoJSMD5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js/core';

// note: Crypto-JS works using word arrays, but the algorithm requires we have access to individual bytes
//      There is probably a more efficient way to manipulate specific bytes without having to convert the whole
//      word array.  These conversion functions were found on the internet.
function byteArrayToWordArray (ba) {
    const wa = [];
    for (let i = 0; i < ba.length; i++) {
        wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
    }

    return CryptoJS.lib.WordArray.create(wa, ba.length);
}

function wordToByteArray (word, length) {
    const ba = [],
        xFF = 0xFF;
    if (length > 0) ba.push(word >>> 24);
    if (length > 1) ba.push((word >>> 16) & xFF);
    if (length > 2) ba.push((word >>> 8) & xFF);
    if (length > 3) ba.push(word & xFF);

    return ba;
}

function wordArrayToByteArray (wordArrayParam, lengthParam) {
    let wordArray = wordArrayParam;
    let length = lengthParam;
    if (Object.prototype.hasOwnProperty.call(wordArray, 'sigBytes') && Object.prototype.hasOwnProperty.call(wordArray, 'words')) {
        length = wordArray.sigBytes;
        wordArray = wordArray.words;
    }

    const result = [];
    let bytes,
        i = 0;
    while (length > 0) {
        bytes = wordToByteArray(wordArray[i], Math.min(4, length));
        length -= bytes.length;
        result.push(bytes);
        i++;
    }
    return [].concat.apply([], result); // eslint-disable-line prefer-spread
}

function getFraction (wordArray) {
    const hashedWordArray = CryptoJSMD5(wordArray);
    const hashedByteArray = wordArrayToByteArray(hashedWordArray);

    const uint16 = (hashedByteArray[1] << 8) + hashedByteArray[0];

    const fraction = uint16 / 65535;

    return fraction;
}

function calculateFractions (key) {
    // the two fractions are calcluated by MD5-hashing the UTF-8 encoded key then
    // taking the first two bytes and calculating the fraction of uint16 that it takes up

    const inputWordArray = CryptoJS.enc.Utf8.parse(key);

    const audienceFraction = getFraction(inputWordArray);

    const inputByteArray = wordArrayToByteArray(inputWordArray);

    // we flip the first byte in order to get an independent result for the 2nd fraction we need
    inputByteArray[0] ^= 1; // eslint-disable-line no-bitwise

    const variantWordArray = byteArrayToWordArray(inputByteArray);

    const variantFraction = getFraction(variantWordArray);

    return { audienceFraction, variantFraction };
}


export default calculateFractions;
