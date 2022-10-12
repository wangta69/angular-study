# CryptoJs

`
npm install --save crypto-js
npm i --save-dev @types/crypto-js
`

## encrypt
`
import * as CryptoJS from 'crypto-js';

const secretKey = 'myScretKeyDontUsethisonPublic';
const data = {
    username: 'Pondol',
    age: 105
};

const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()

const encodedUrl = encodeURIComponent(encrypted);
`

## decrypt
`
import * as CryptoJS from 'crypto-js';

const secretKey = 'myScretKeyDontUsethisonPublic';

const decodedUrl = decodeURIComponent(encodedUrl);
const decrypted = CryptoJS.AES.decrypt(url, secretKey);
const originalData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
`

