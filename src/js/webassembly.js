"use strict";

async function newAccount(newpass) {
    console.log("newAccount0");
    let randPtr = Module._mem_alloc(CRYPTO_RAND_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let pkPtr = Module._mem_alloc(CRYPTO_PUBLICKEY_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let skPtr = Module._mem_alloc(CRYPTO_SECRETKEY_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let r0 = Module._dp_randombytes(randPtr, CRYPTO_RAND_BYTES);
    console.log("newAccount0.05");
    const randBuf = new Uint8Array(Module.HEAPU8.buffer, randPtr, CRYPTO_RAND_BYTES);

    let strTempLog = '';
    for (let i = 0; i < randBuf.length; i++) {
        strTempLog = strTempLog + randBuf[i];
        if (i === randBuf.length - 1) {

        } else {
            strTempLog = strTempLog + ",";
        }
    }
    
    //console.log("rand = %s", strTempLog);
    SEED_BYTES = strTempLog;

    if (r0 == OK) {
        console.log("newAccount0.1");
        
        let r1 = Module._dp_sign_keypair_seed(pkPtr, skPtr, randPtr);

        if (r1 == OK) {
            console.log("newAccount1");
            const strSkBuf = new Uint8Array(Module.HEAPU8.buffer, skPtr, CRYPTO_SECRETKEY_BYTES);
            const strPkBuf = new Uint8Array(Module.HEAPU8.buffer, pkPtr, CRYPTO_PUBLICKEY_BYTES);

            await storeAccountKey(strSkBuf, strPkBuf, newpass);
            console.log("newAccount2");

            Module._mem_free(randPtr);
            Module._mem_free(skPtr);
            Module._mem_free(pkPtr);

            return Promise.resolve(true);
        }

        console.log("newAccount3");
    }


    Module._mem_free(randPtr);
    Module._mem_free(skPtr);
    Module._mem_free(pkPtr);

    return Promise.reject();
}

async function newAccountFromSeed(newpass, seedArray) {
    console.log("newAccountFromSeed 0");
    if (seedArray.length != CRYPTO_RAND_BYTES) {
        console.log("seed length is incorrect");
        return Promise.reject();
    }
    //let randPtr = Module._mem_alloc(CRYPTO_RAND_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let pkPtr = Module._mem_alloc(CRYPTO_PUBLICKEY_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let skPtr = Module._mem_alloc(CRYPTO_SECRETKEY_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    console.log("newAccountFromSeed 1");

    const typedSeedArray = new Uint8Array(CRYPTO_RAND_BYTES);
    for (let i = 0; i < seedArray.length; i++) {
        typedSeedArray[i] = seedArray[i];
    }
    const randPtr = Module._mem_alloc(typedSeedArray.length * typedSeedArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedSeedArray, randPtr);

    let r1 = Module._dp_sign_keypair_seed(pkPtr, skPtr, randPtr);

    if (r1 == OK) {
        console.log("newAccountFromSeed 2");
        const strSkBuf = new Uint8Array(Module.HEAPU8.buffer, skPtr, CRYPTO_SECRETKEY_BYTES);
        const strPkBuf = new Uint8Array(Module.HEAPU8.buffer, pkPtr, CRYPTO_PUBLICKEY_BYTES);

        await storeAccountKey(strSkBuf, strPkBuf, newpass);
        console.log("newAccountFromSeed 3");

        Module._mem_free(randPtr);
        Module._mem_free(skPtr);
        Module._mem_free(pkPtr);

        return Promise.resolve(true);
    }

    console.log("newAccountFromSeed 4");

    Module._mem_free(randPtr);
    Module._mem_free(skPtr);
    Module._mem_free(pkPtr);

    return Promise.reject();
}

async function signAccount(message, skkey) { 
    let smPtr = Module._mem_alloc(CRYPTO_SIGNATURE_BYTES * Uint8Array.BYTES_PER_ELEMENT);
    let smlPtr = Module._mem_alloc_long_long(1 * BigUint64Array.BYTES_PER_ELEMENT);

    const arrayMsgDataToPass = message.toString().split(",");
    const typedMsgArray = new Uint8Array(arrayMsgDataToPass.length);
    for (let i = 0; i < arrayMsgDataToPass.length; i++) {
        typedMsgArray[i] = arrayMsgDataToPass[i];
    }
    const msgPtr = Module._mem_alloc(typedMsgArray.length * typedMsgArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedMsgArray, msgPtr);
   
    const arraySkDataToPass = skkey.toString().split(",");
    const typedSkArray = new Uint8Array(arraySkDataToPass.length);
    for (let i = 0; i < arraySkDataToPass.length; i++) {
        typedSkArray[i] = arraySkDataToPass[i];
    }
    const skyPtr = Module._mem_alloc(typedSkArray.length * typedSkArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedSkArray, skyPtr);
   
    let r2 = Module._dp_sign(smPtr, smlPtr, msgPtr, typedMsgArray.length, skyPtr);
    if (r2 == OK) {
        const strSigLenBuf = new BigUint64Array(Module.HEAPU8.buffer, smlPtr, 1);
        const strSigBuf1 = new Uint8Array(Module.HEAPU8.buffer, smPtr, strSigLenBuf);

        var sign = strSigBuf1;
        $("#txtSign").val(sign)

        Module._mem_free(msgPtr);
        Module._mem_free(skyPtr);
        Module._mem_free(smlPtr);
        Module._mem_free(smPtr);

        SIGN = $("#txtSign").val();
        $("#txtSign").val("");

        return Promise.resolve(true);
    }

    Module._mem_free(msgPtr);
    Module._mem_free(skyPtr);
    Module._mem_free(smlPtr);
    Module._mem_free(smPtr);

    return Promise.reject(false);
}

async function verifyAccount(message, sm, pkkey) {
    console.log("verifyAccount1");
    return new Promise((resolve, reject) => {
        console.log("verifyAccount2");
        const arrayMsgDataToPass = message.toString().split(",");
        const typedMsgArray = new Uint8Array(arrayMsgDataToPass.length);
        for (let i = 0; i < arrayMsgDataToPass.length; i++) {
            typedMsgArray[i] = arrayMsgDataToPass[i];
        }
        const msgPtr = Module._mem_alloc(typedMsgArray.length * typedMsgArray.BYTES_PER_ELEMENT);
        Module.HEAPU8.set(typedMsgArray, msgPtr);
        console.log("verifyAccount3 ");
        const arraySmDataToPass = sm.toString().split(",");   
        const typedSmArray = new Uint8Array(arraySmDataToPass.length);
        for (let i = 0; i < arraySmDataToPass.length; i++) {
            typedSmArray[i] = arraySmDataToPass[i];
        }
        console.log("verifyAccount3.5");
        const smPtr = Module._mem_alloc(typedSmArray.length * typedSmArray.BYTES_PER_ELEMENT);
        Module.HEAPU8.set(typedSmArray, smPtr);
        console.log("verifyAccount3.6");
        const arrayPkDataToPass = pkkey.toString().split(",");
        console.log("verifyAccount3.7");
        const typedPkArray = new Uint8Array(arrayPkDataToPass.length);
        for (let i = 0; i < arrayPkDataToPass.length; i++) {
            typedPkArray[i] = arrayPkDataToPass[i];
        }
        const pkyPtr = Module._mem_alloc(typedPkArray.length * typedPkArray.BYTES_PER_ELEMENT);
        Module.HEAPU8.set(typedPkArray, pkyPtr);
        console.log("verifyAccount4");
        let r3 = Module._dp_sign_verify(msgPtr, typedMsgArray.length, smPtr, typedSmArray.length, pkyPtr);
        console.log("verifyAccount5");
        Module._mem_free(msgPtr);
        Module._mem_free(smPtr);
        Module._mem_free(pkyPtr);

        if (r3 == OK) {
            //console.log("verify1 " + r3);
            return resolve(true);
        }
        //console.log("verify2 " + r3);

        return reject(false);
    });
}

//unlock
async function unLockAccount(encrypted_skkey, encrypted_pkkey, password) {
    console.log("unLockAccount1");
    var decrypted_skkey = decrypt(encrypted_skkey, password);
    console.log("unLockAccount2");
    var decrypted_pkkey = decrypt(encrypted_pkkey, password);
    console.log("unLockAccount3");
    let arraDataToPass_skkey = stringToByteArray(decrypted_skkey.toString(CryptoJS.enc.Utf8));
    const typedSkArray = new Uint8Array(CRYPTO_SECRETKEY_BYTES);
    console.log("unLockAccount4");
    let arraDataToPass_pkkey = stringToByteArray(decrypted_pkkey.toString(CryptoJS.enc.Utf8));
    const typedPkArray = new Uint8Array(CRYPTO_PUBLICKEY_BYTES);
    console.log("unLockAccount5");
    for (let i = 0; i < CRYPTO_SECRETKEY_BYTES; i++) {
        typedSkArray[i] = arraDataToPass_skkey[i];
    }
    console.log("unLockAccount6");
    const skyPtr = Module._mem_alloc(typedSkArray.length * typedSkArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedSkArray, skyPtr);
    const skyHeap = new Uint8Array(Module.HEAPU8.buffer, skyPtr, CRYPTO_SECRETKEY_BYTES);
    console.log("unLockAccount7");
    for (let i = 0; i < CRYPTO_PUBLICKEY_BYTES; i++) {
        typedPkArray[i] = arraDataToPass_pkkey[i];
    }
    const pkyPtr = Module._mem_alloc(typedPkArray.length * typedPkArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedPkArray, pkyPtr);
    const pkyHeap = new Uint8Array(Module.HEAPU8.buffer, pkyPtr, CRYPTO_PUBLICKEY_BYTES);
    console.log("unLockAccount8");
    $("#txtSk").val(skyHeap);
    $("#txtPk").val(pkyHeap);

    Module._mem_free(skyPtr);
    Module._mem_free(pkyPtr);

    SK_KEY = $("#txtSk").val();
    PK_KEY = $("#txtPk").val();
    WALLET_ADDRESS = await getAccountAddress(PK_KEY);

    $("#txtSk").val("");
    $("#txtPk").val("");
    IS_WALLET_UNLOCKED = true;

    return Promise.resolve(true);
}

//import unlock
async function importUnLockAccount(encrypted_skkey, encrypted_pkkey, password) {
    var decrypted_skkey = decrypt(encrypted_skkey, password);
    var decrypted_pkkey = decrypt(encrypted_pkkey, password);

    let arraDataToPass_skkey = stringToByteArray(decrypted_skkey.toString(CryptoJS.enc.Utf8));
    const typedSkArray = new Uint8Array(CRYPTO_SECRETKEY_BYTES);

    let arraDataToPass_pkkey = stringToByteArray(decrypted_pkkey.toString(CryptoJS.enc.Utf8));
    const typedPkArray = new Uint8Array(CRYPTO_PUBLICKEY_BYTES);

    for (let i = 0; i < CRYPTO_SECRETKEY_BYTES; i++) {
        typedSkArray[i] = arraDataToPass_skkey[i];
    }
    const skyPtr = Module._mem_alloc(typedSkArray.length * typedSkArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedSkArray, skyPtr);
    const skyHeap = new Uint8Array(Module.HEAPU8.buffer, skyPtr, CRYPTO_SECRETKEY_BYTES);

    for (let i = 0; i < CRYPTO_PUBLICKEY_BYTES; i++) {
        typedPkArray[i] = arraDataToPass_pkkey[i];
    }
    const pkyPtr = Module._mem_alloc(typedPkArray.length * typedPkArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(typedPkArray, pkyPtr);
    const pkyHeap = new Uint8Array(Module.HEAPU8.buffer, pkyPtr, CRYPTO_PUBLICKEY_BYTES);

    await storeAccountKey(skyHeap, pkyHeap, password);

    $("#txtSk").val(skyHeap);
    $("#txtPk").val(pkyHeap);

    Module._mem_free(skyPtr);
    Module._mem_free(pkyPtr);

    SK_KEY = $("#txtSk").val();
    PK_KEY = $("#txtPk").val();

    WALLET_ADDRESS = await getAccountAddress(PK_KEY);

    $("#txtSk").val("");
    $("#txtPk").val("");
    IS_WALLET_UNLOCKED = true;

    return Promise.resolve(true);
}

async function storeAccountKey(skkey, pkkey, password) {
    console.log("storeAccountKey1");
    $("#txtSk").val(skkey);
    $("#txtPk").val(pkkey);

    const arraySkDataToPass = skkey.toString().split(",");
    const arrayPkDataToPass = pkkey.toString().split(",");

    const typedArray_skkey = new Uint8Array(arraySkDataToPass.length);
    const typedArray_pkkey = new Uint8Array(arrayPkDataToPass.length);

    for (let i = 0; i < arraySkDataToPass.length; i++) {
        typedArray_skkey[i] = arraySkDataToPass[i];
    }
    for (let i = 0; i < arrayPkDataToPass.length; i++) {
        typedArray_pkkey[i] = arrayPkDataToPass[i];
    }

    // convert bytes to string
    // encoding can be specfied, defaults to utf-8 which is ascii.
    let sk_str = byteArrayToString(typedArray_skkey);
    var sk = sk_str;
    var encrypted_skkey = encrypt(sk, password);

    let pk_str = byteArrayToString(typedArray_pkkey);
    var pk = pk_str;
    var encrypted_pkkey = encrypt(pk, password);

    var keys = { 'encrypted_skkey': encrypted_skkey, 'encrypted_pkkey': encrypted_pkkey };
    
    (async () => {
        console.log("storeAccountKey2");
        await StoreWallet(keys);

        //SK_KEY = $("#txtSk").val();
        //PK_KEY = $("#txtPk").val();

        //console.log("storeAccountKey2 " + PK_KEY);
    })().catch(e => {
        console.log(e);
        // Deal with the fact the chain failed
    });
    
    //chrome.storage.local.set({ 'pqc_key': keys });

    return Promise.resolve(true);
}

async function storeTransactionHash(txHash, txData, guid) {

    var result = ""
    result = GetRecentTransactions();
    ////chrome.storage.local.get('recent_tx', function (r) {
      //  result = r;
    //});
    var tx = [];
    var txs = { 'txHash': txHash, 'txData': txData, 'guid': guid };
    tx.push(txs);
    //if (!isEmpty(result)) {
    //    len = result.length;
    //    for (var i = 0; i < len; i++) {
    //        if (JSON.stringify(tx_result[i]).length > STORAGE_TX_MIN_LENGTH) {
    //            tx.push(tx_result[i]);
    //        }
    //    }
    //}
    //chrome.storage.local.set({ 'recent_tx': tx });
    StoreRecentTransactions(tx);
    return Promise.resolve(true);   
}

//get address
async function getAccountAddress(pkkey) {
    const arrayPkDataToPass = pkkey.toString().split(",");
    const typedPkArray = new Uint8Array(arrayPkDataToPass.length);
    for (let i = 0; i < arrayPkDataToPass.length; i++) {
        typedPkArray[i] = arrayPkDataToPass[i];
    }
    let address = PublicKeyToAddress(typedPkArray);
    return Promise.resolve(address);
}

//Tx data 
async function getTxMessage(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid) {
    var message = TxMessage(fromaddress, nonce, toaddress, amount, gas, gasprice, null, chainid);
    var msg = message.encodeHex();
    return Promise.resolve(msg);
}

async function getTxHash(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid, pkkey, sig) {
    const arrayPkDataToPass = pkkey.toString().split(",");
    const typedPkArray = new Uint8Array(arrayPkDataToPass.length);
    for (let i = 0; i < arrayPkDataToPass.length; i++) {
        typedPkArray[i] = arrayPkDataToPass[i];
    }
    const arraySigDataToPass = sig.toString().split(",");
    const typedSigArray = new Uint8Array(arraySigDataToPass.length);
    for (let i = 0; i < arraySigDataToPass.length; i++) {
        typedSigArray[i] = arraySigDataToPass[i];
    }
    var hash = TxHash(fromaddress, nonce, toaddress, amount, gas, gasprice, null, chainid, typedPkArray, typedSigArray)
    return Promise.resolve(hash);
}

async function getTxData(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid, pkkey, sig) {
    const arrayPkDataToPass = pkkey.toString().split(",");
    const typedPkArray = new Uint8Array(arrayPkDataToPass.length);
    for (let i = 0; i < arrayPkDataToPass.length; i++) {
        typedPkArray[i] = arrayPkDataToPass[i];
    }
    const arraySigDataToPass = sig.toString().split(",");
    const typedSigArray = new Uint8Array(arraySigDataToPass.length);
    for (let i = 0; i < arraySigDataToPass.length; i++) {
        typedSigArray[i] = arraySigDataToPass[i];
    }
    var data = TxData(fromaddress, nonce, toaddress, amount, gas, gasprice, null, chainid, typedPkArray, typedSigArray)
    return Promise.resolve(data);
}

async function getDogeProtocolToWei(dp) { 
    var wei = DogeProtocolToWei(dp);
    return Promise.resolve(wei);
}

async function getWeiToDogeProtocol(wei) {
    var dp = WeiToDogeProtocol(wei);
    return Promise.resolve(dp);
}

async function getParseBigFloat(value) {
    var f = ParseBigFloat(value);
    return Promise.resolve(f);
}
