// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library cryptographic utility functions.
 */

// Module imports.
import * as crypto from 'crypto';
import { CIPHER_ALGORITHM, HASH_ALGORITHM, HEX, UTF8 } from './constants';
import * as keccak from 'keccak';

/**
 * Encrypts plain text.
 *
 * @param {string} plainText - Text to be encrypted.
 * @param {string} password - Password used to encrypt.
 */
export const encrypt = (plainText, password) => {
    const cipher = crypto.createCipher(CIPHER_ALGORITHM, password);
    let encrypted = cipher.update(plainText, UTF8, HEX);
    encrypted += cipher.final(HEX);

    return encrypted;
};

/**
 * Decrypts cipher text.
 *
 * @param {string} cipherText - Text to be decrypted.
 * @param {string} password - Password used to encrypt.
 */
export const decrypt = (cipherText, password) => {
    let decipher = crypto.createDecipher(CIPHER_ALGORITHM, password);
    let decrypted = decipher.update(cipherText, HEX, UTF8);
    decrypted += decipher.final(UTF8);

    return decrypted;
};

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {string} data - Text to be hashed.
 * @return {hex} The hashed value.
 */
export const hashData = (data) => {
	const input = JSON.stringify(data);
	const h = keccak.default(HASH_ALGORITHM);

	return h.update(JSON.stringify(data)).digest(HEX);
};
