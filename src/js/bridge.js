async function IsWalletCreated() {
    let result = await StorageApi.GetItem("dpwallet");
    if (result == null) {
        return false;
    }

    if (result.length > STORAGE_KEY_MIN_LENGTH) {
        return true;
    } else {
        return false;
    }
}

async function StoreWallet(wallet) {
    StorageApi.SetItem("dpwallet", wallet);
    
    let result = StorageApi.GetItem("dpwallet");
    //console.log("storewallet " + result.length);
    if (result == null) {
        //console.log("storewallet3");
        return false;
    } else {
        //console.log("storewallet4");
        return true;
    }
}

async function DeleteWallet() {
    StorageApi.SetItem("dpwallet", "");

    let result = StorageApi.GetItem("dpwallet");
    //console.log("storewallet " + result.length);
    if (result == null) {
        //console.log("storewallet3");
        return false;
    } else {
        //console.log("storewallet4");
        return true;
    }
}

async function GetWallet() {
    let result = await StorageApi.GetItem("dpwallet");
    if (result == null) {
        //console.log("getwallet1");
        return null;
    }
    //console.log("getwalletlen" + result.length);
    if (result.length > STORAGE_KEY_MIN_LENGTH) {
        return JSON.parse(result);
    }
    //console.log("getwallet2");
    return null;
}

async function GetRecentTransactions() {
    let txns = await StorageApi.GetItem("recenttxns");
    return txns;
}

async function StoreRecentTransactions(txns) {
    await StorageApi.SetItem("recenttxns", txns);
    let result = await StorageApi.GetItem("recenttxns");
    if (result == null) {
        return false;
    } else {
        return true;
    }
}

async function SetWalletExported() {
    await StorageApi.SetItem("walletexported", "1");
}

async function IsWalletExported() {
    //console.log("IsWalletExported1");
    let result = await StorageApi.GetItem("walletexported");
    if (result == null) {
        //console.log("walletexported2 " + result);
        return false;
    }
    //console.log("IsWalletExported3 " + result);
    return true;
}

async function WriteTextToClipboard(text) {
    await ClipboardApi.send('WriteText', text);
}

async function OpenUrl(url) {
    (async () => {
        await ClipboardApi.send('OpenUrlInShell', url);
        return false;
    })().catch(e => {
        console.log(e);
        // Deal with the fact the chain failed
    });    

    return false;
}