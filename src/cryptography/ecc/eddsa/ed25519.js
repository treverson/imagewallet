// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

// Module imports.
import * as elliptic from 'elliptic';
import generateEntropy from '../../entropyCreation';

// Set EcDSA context.
const ed25519 = new elliptic.eddsa('ed25519');

/**
 * Returns a private key dervied from supplied entropy.
 *
 * @param {string} secret - A 32 byte array generated by a source with sufficient entropy.
 * @return A private key (32 byte array).
 */
export const getPrivateKey = (entropy) => {
    const keyPair = getKeyPair(entropy || generateEntropy());

    return keyPair.privBytes();
};

/**
 * Returns a public key dervied from supplied private key.
 *
 * @param {Array} privateKey - A 32 byte array private key.
 * @return A public key (65 byte array).
 */
export const getPublicKey = (entropy) => {
    const keyPair = getKeyPair(entropy);

    return keyPair.pubBytes();
};

/**
 * Returns a digital signature of a hashed message.
 *
 * @param {Array} privateKey - A 32 byte array private key.
 * @param {string} messageHash - Hexadecimal string representation of a hashed message.
 * @return A digital signature in DER format.
 */
export const sign = (entropy, messageHash) => {
    const keyPair = getKeyPair(entropy);
    const signature = keyPair.sign(messageHash);

    return signature.toBytes();
};

/**
 * Verifies a hashed message signature .
 *
 * @param {Array} privateKey - A 32 byte array private key.
 * @param {string} messageHash - The hexadecimal string representation of a hashed message.
 * @param {Array} signature - A digital signature of the message hash in DER array format.
 * @return True if verified, false otherwise.
 */
export const verify = (entropy, messageHash, signature) => {
    const keyPair = getKeyPair(entropy);

    return keyPair.verify(messageHash, signature);
};

/**
 * Returns a key pair derived from entropic seed.
 *
 * @param {Array} entropy - A 32 byte array emitted by a PRNG.
 * @return A key pair for signing / verification purposes.
 */
export const getKeyPair = (entropy) => {
    return ed25519.keyFromSecret(entropy);
};

export const getKeyPairFromPublicKey = (publicKey) => {
    return ed25519.keyFromPublic(publicKey);
}
