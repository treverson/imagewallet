// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wraps cryptographic entropy generator.
 */

// Module imports.
import * as crypto from 'crypto';

/**
 * Returns a hash of the passed data using the keccak256 algorithm.
 *
 * @param {number} size - A number indicating the number of bytes to generate.
 * @return {Buffer} Buffer containing generated bytes.
 */
export const generate = (size) => {
    return crypto.randomBytes(size || 32);
};