"use strict";

//URL
const READ_API_URL = "https://scan.dpapi.org";
const WRITE_API_URL = "https://txn.dpapi.org";
const FAUCET_API_URL = "https://faucet.dpapi.org";
const DP_SCAN_URL = "https://dpscan.app";
const DEPOSIT_CRYPTO_URL_1 = "https://coinmarketcap.com/rankings/exchanges";

//QR CODE WIDTH HEIGHT
const QR_CODE_WIDTH = 224
const QR_CODE_HEIGHT = 224

//PAGES
const WELCOME1 = 100;
const WELCOME2 = 101;
const WELCOME3 = 102;
const WELCOME4 = 103;
const WELCOME5 = 104;
const QUIZ = 105;
const NEW_ACCOUNT = 1;
const NEW_ACCOUNT_PASSWORD = 2;
const PASSWORD = 3;
const ACCOUNT = 4;
const WALLET = 5;
const TRANSACTION = 6;
const DEPOSIT = 7;
const SEND = 8;
const SETTINGS = 9;
const IMPORT = 10;
const EXPORT_WALLET = 11;
const RECEIVE = 12;
const TESTNET_COINS = 13;
const PENDING_TRANSACTIONS = 14;
const NEW_SEED_PHRASE = 15;
const VERIFY_SEED_PHRASE = 16;
const IMPORT_SEED = 17;
const IMPORT_SEED_PASSWORD = 18;
var PREVIOUS_PAGE = -1;
var CURRENT_PAGE = -1;
var WALLET_ADDRESS = "";
var COIN_BALANCE = 0;
var isFirstTimeWalletOpen = false;

//wasam api call 
const OK = 0
const CRYPTO_RAND_BYTES = 80
const CRYPTO_MESSAGE_LEN = 32
const CRYPTO_SECRETKEY_BYTES = 64 + 1281 + 897
const CRYPTO_PUBLICKEY_BYTES = 32 + 897
const CRYPTO_SIGNATURE_BYTES = 2 + 2 + 64 + CRYPTO_MESSAGE_LEN + 40 + 690 //Nonce + 2 for size

const CRYPTO_NAME = 'Doge Protocol';
const CRYPTO_SYMPOL = 'dp';
const CRYPTO_LOGO = 'assets/icons/48.png';
const CRYPTO_REFRESH = 'assets/images/refresh.png';

const NETWORK_NAME = 'T3';
const CHAIN_ID = 36996;

const GAS = 21000;
const GAS_PRICE = 10000000;
var NONCE = 0;

//KEY
var SK_KEY = '';
var PK_KEY = '';
var SIGN = '';

//Transaction
var PAGE_INDEX = 1;
var IS_WALLET_UNLOCKED = false;

//Cookie
var STORAGE_KEY_MIN_LENGTH = 3000;
var STORAGE_TX_MIN_LENGTH = 40;
var TEMP_SEED_ARRAY = null;

String.prototype.encodeHex = function () {
    var bytes = [];
    for (var i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes;
};

String.prototype.replaceAll = String.prototype.replaceAll || function (string, replaced) {
    return this.replace(new RegExp(string, 'g'), replaced);
};

function byteArrayToString(byteArray) {
    // Otherwise, fall back to 7-bit ASCII only
    var result = "";
    for (var i = 0; i < byteArray.byteLength; i++) {
        result += String.fromCharCode(byteArray[i])
    }/*from   w  ww . ja v a 2 s .  co  m*/
    return result;
}


function stringToByteArray(s) {
    // Otherwise, fall back to 7-bit ASCII only
    var result = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        result[i] = s.charCodeAt(i);/* w ww. ja  v  a 2s . co  m*/
    }
    return result;
}

function isEmpty(value) {
    return (value == null || value.length == 0);
}

//Api Call
async function CALL_API_GET(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error)
            }
        }); 
    })
}

async function CALL_API_POST_DATA(url, json) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            timeout: 8000,
            success: async function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}
