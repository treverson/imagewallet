// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Encoding entry point.
 */

// Module imports.
import { EncodingError } from '../utils/exceptions';
import { logInfo, logWarning } from '../utils/logging';
import renderCanvas from './renderers/canvas';
import renderFooter from './renderers/footer';
import renderHeader from './renderers/header';
import renderIdenticon from './renderers/identicon';
import renderPanels from './renderers/panels';
import renderQrCode from './renderers/qrCode';
import renderWarning from './renderers/warning';
import setCipherText from './setCipherText';
import validateInputs from './validateInputs';
import validateOutput from './validateOutput';

// Maximum attempts before rendering is aborted.
const MAX_ATTEMPTS = 5;

/**
 * Encodes an image wallet from user credentials and encoding options.
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 * @return An image wallet encoded as an HTMLCanvasElement.
 */
export default async function(credentials, options) {
    // Initialise procssing context info.
    let ctx = new EncodingContextInfo(credentials, options);

    // Invoke pre-rendering tasks.
    await validateInputs(ctx);

    // Invoke rendering pipeline - limiting the number of attempts.
    let attempts = 0;
    while (attempts <= MAX_ATTEMPTS) {
        // Increment attempt count.
        attempts += 1;
        logInfo(`Canvas rendering attempt #${attempts}: begin`);

        // Invoke pipeline.
        await setCipherText(ctx);
        await renderCanvas(ctx);
        await renderPanels(ctx);
        await renderFooter(ctx);
        await renderHeader(ctx);
        await renderWarning(ctx);
        await renderIdenticon(ctx);
        await renderQrCode(ctx);

        // Verify rendering.
        let wasRendered = await validateOutput(ctx);
        if (wasRendered) {
            logInfo(`Canvas rendering attempt #${attempts}: success`);
            return {
                $canvas: ctx.$canvas,
                seed: ctx.seed
            };
        } else {
            logWarning(`Canvas rendering attempt #${attempts}: failed`);
            ctx = new EncodingContextInfo(credentials, options);
        }
    }

    // If not rendered then throw error.
    throw new Error("Image wallet rendering failed");
}

/**
 * Contextual information passed along encoding pipeline.
 * @constructor
 * @param {object} credentials - Credentials to be encoded.
 * @param {object} options - Encoding options.
 */
class EncodingContextInfo {
    constructor(credentials, options) {
        this.cipherText = null;
        this.credentials = credentials;
        this.options = options;
        this.$canvas = null;
        this.$ctx = null;
    }
}
