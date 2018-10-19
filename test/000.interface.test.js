import * as API from '../src/index';
import * as utils from './utils';

test('IW :: can be imported', () => {
    expect(API).toBeDefined();
});

test('IW :: interface :: is defined', () => {
    utils.testSlots(API, [
        'name',
        'provider',
        'version',
        'decryptImage',
        'decryptQrData',
        'generateFromPassword',
        'getQrDataFromImage',
        'deriveKey',
        'getHash',
        'getUserPrivateKey',
        'getUserPublicKey',
        'signData',
        'signHash',
        'verifyHash',
	]);
    expect(API.name).toBe('Image Wallet');
    expect(API.version).toBe('0.2.4');
    expect(API.provider).toBe('Trinkler Software AG');
});
