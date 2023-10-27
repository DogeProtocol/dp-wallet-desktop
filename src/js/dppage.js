"use strict";

function GoBack() {
    if (PREVIOUS_PAGE == -1) {
        return false;
    }
    loadPage(PREVIOUS_PAGE);
    return false;
}

async function loadPage(status) {
    PREVIOUS_PAGE = CURRENT_PAGE;
    CURRENT_PAGE = status;
    console.log("loadpage " + status);
    switch (status) {
        case WELCOME1:
            $("#dp-content").load("welcome1.html");
            break;
        case WELCOME2:
            $("#dp-content").load("welcome2.html");
            break;
        case WELCOME3:
            $("#dp-content").load("welcome3.html");
            break;
        case WELCOME4:
            $("#dp-content").load("welcome4.html");
            break;
        case WELCOME5:
            $("#dp-content").load("welcome5.html");
            break;
        case QUIZ:
            $("#dp-content").load("quiz.html");
            break;
        case NEW_ACCOUNT:
            $("#dp-content").load("newaccount.html");
            break;
        case NEW_ACCOUNT_PASSWORD:
            $("#dp-content").load("newaccountpassword.html");
            break;
        case NEW_SEED_PHRASE:
            $("#dp-content").load("newseedphrase.html");
            break;
        case PASSWORD:
            $("#dp-content").load("password.html");
            break;
        case SETTINGS:
            $("#dp-content").load("settings.html");
            break;
        case EXPORT_WALLET:
            $("#dp-content").load("export-wallet.html");
            break;
        case RECEIVE:
            $("#dp-content").load("receive.html");
            break;
        case TESTNET_COINS:
            $("#dp-content").load("testnet-coins.html");
            break;
        case PENDING_TRANSACTIONS:
            $("#dp-content").load("pendingtransactions.html");
            break;
        case VERIFY_SEED_PHRASE:
            $("#dp-content").load("verifyseed.html");
            break;
        case IMPORT_SEED:
            $("#dp-content").load("importseed.html");
            break;
        case IMPORT_SEED_PASSWORD:
            $("#dp-content").load("importseedpassword.html");
            break;
        /*
        case ACCOUNT:
            $("#dp-content").load("account.html", function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    getAccountAddress(PK_KEY).then(accountAddress => {
                        $(document).ready(function () {
                            $("#dp-address").text(accountAddress);
                            qrCode(accountAddress);
                        });
                    });
                }
                if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
            });
            break;

        case WALLET:
            LoadWalletPage();
            break;
          
        case TRANSACTION:
            $("#dp-content").load("transactions.html", function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    getAccountAddress(PK_KEY).then(accountAddress => {
                        $(document).ready(function () {
                            $("#dp-address").text(accountAddress);
                            $("#dp-transaction-logo").attr({
                                src: CRYPTO_LOGO
                            });
                            $("#dp-transaction-caption").text(CRYPTO_NAME);
                            $("#dp-transaction-refresh").attr({
                                src: CRYPTO_REFRESH
                            });
                            $("#dp-transaction-balance").text(0);
                            $("#dp-transaction-symbol").text(CRYPTO_SYMPOL);
                            getCoinBalance(accountAddress, "dp-transaction-balance");

                            listTransactions(accountAddress, 0);
                        });
                    });
                }
                if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
            });
            break;
        case DEPOSIT:
            $("#dp-content").load("deposit.html", function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    $('#dp_deposit_url_1').attr('href', DEPOSIT_CRYPTO_URL_1);
                }
                if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
            });
            break;
        */
        case SEND:
           /* $("#dp-content").load("send.html", function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    getAccountAddress(PK_KEY).then(accountAddress => {
                        $(document).ready(function () {
                            $("#dp-address").text(accountAddress);
                            $("#dp-send-from-logo").attr({
                                src: CRYPTO_LOGO
                            });
                            $("#dp-send-from-caption").text(CRYPTO_NAME);
                            $("#dp-send-from-refresh").attr({
                                src: CRYPTO_REFRESH
                            });
                            $("#dp-send-from-balance").text(0);
                            $("#dp-send-from-symbol").text(CRYPTO_SYMPOL);
                            getCoinBalance(accountAddress, "dp-send-from-balance");
                        });
                    });
                }
                if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
            });*/
            $("#dp-content").load("send.html");
            break;
        case SETTINGS:
            $("#dp-content").load("setting.html");
            break;
        case IMPORT:
            $("#dp-content").load("import.html");
            break;
    }
    return Promise.resolve(true);
}

function QuizResults() {

}

window.addEventListener('load', async () => {
    let walletCreated = await IsWalletCreated();
    if (walletCreated == true) {
        loadPage(PASSWORD);
    } else {
        loadPage(WELCOME1); 
    }
    /*//startup load
    chrome.storage.local.get('pqc_key', function (pqc_result) {        
        if (JSON.stringify(pqc_result).length > STORAGE_KEY_MIN_LENGTH) {
            loadPage(PASSWORD);
        }  else {
            loadPage(NEW_ACCOUNT); 
        }
    });*/

    document.body.addEventListener('click', function (event) {
        if (event.target.id == 'btn-welcome1') {
            loadPage(WELCOME2);
            return;
        };
        if (event.target.id == 'btn-welcome2') {
            loadPage(WELCOME3);
            return;
        };
        if (event.target.id == 'btn-welcome3') {
            loadPage(WELCOME4);
            return;
        };
        if (event.target.id == 'btn-welcome4') {
            loadPage(WELCOME5);
            return;
        };
        if (event.target.id == 'btn-welcome5') {
            loadPage(QUIZ);
            return;
        };
        if (event.target.id == 'btn-quiz') {
            loadPage(NEW_ACCOUNT);
            return;
        };
        //new account page
        if (event.target.id == 'btn-new-account') {
            loadPage(NEW_ACCOUNT_PASSWORD);            
        };

        if (event.target.id == 'btn-new-account-import') {
             loadPage(IMPORT);
        };

        if (event.target.id == 'btn-new-account-import-seed') {
            loadPage(IMPORT_SEED);
        };

        if (event.target.id == 'btn-new-seed-phrase') {
            loadPage(NEW_SEED_PHRASE);
        };

        if (event.target.id == 'btn-verify-seed') {
            loadPage(VERIFY_SEED_PHRASE);
        };
        //account
       // if (event.target.id == 'btn-account-back') {
       //     LoadWalletPage();
       // };

        if (event.target.id == 'account-key') {
            getAccountAddress(PK_KEY).then(accountAddress => {
                downloadKey(accountAddress);
                LoadWalletPage();
            });
        };

        //password
        //if (event.target.id == 'btn-new-password') {
        //    return  OnNewAccountPassword();
        //};


        //Password page
        //if (event.target.id == 'btn-unlock') {
        //    TryUnlockAccount();
        //};

       // if (event.target.id == 'btn-settings') {
       //     loadPage(SETTINGS);
       //     return;
       // };

        //Wallet page
        //if (event.target.id == 'dp-coin-refresh') {
        //    var address = $("#dp-address").text();
        //    getCoinBalance(address, "dp-coin-balance");
        //};

        //if (event.target.id == 'btn-coin-next') {
        //    loadPage(TRANSACTION);
        //};

        //if (event.target.id == 'btn-coin-deposit') {
        //    loadPage(DEPOSIT);
        //};

        //if (event.target.id == 'btn-coin-send') {
        //    loadPage(SEND);
        //};

        //$('.list-item-transaction').unbind().click(function () {
        //    console.log($('#' + this.id).children('#' + this.id + '-5').text());
        //});

        //$('.list-item-token').unbind().click(function () {
        //    console.log($('#' + this.id).children('#' + this.id + '-1').text());
        //});

        //Transaction page
        /*
        if (event.target.id == 'btn-transaction-back') {
            LoadWalletPage();
        };

        if (event.target.id == 'dp-transaction-refresh') {
            var address = $("#dp-address").text();
            getCoinBalance(address, "dp-transaction-balance");
        };

        if (event.target.id == 'btn-transaction-deposit') {
            loadPage(DEPOSIT);
        };

        if (event.target.id == 'btn-transaction-send') {
            loadPage(SEND);
        };

        if (event.target.id == 'dp-transaction-item-preview') {
            var address = $("#dp-address").text();
            listTransactions(address, PAGE_INDEX - 1);
        };

        if (event.target.id == 'dp-transaction-item-next') {
            var address = $("#dp-address").text();
            listTransactions(address, PAGE_INDEX + 1);
        };
        */
        //Send page
        /*
        if (event.target.id == 'dp-send-to-amount') {
            //$("#dp-send-from-gas-price").val()
            var gasPrice = GAS_PRICE;
            $("#dp-send-from-gas-price").val(gasPrice);
        };

        if (event.target.id == 'dp-send-from-refresh') {
            var address = $("#dp-address").text();
            getCoinBalance(address, "dp-send-from-balance");
        };

        if (event.target.id == 'btn-send-cancel') {
            LoadWalletPage();
        };

        if (event.target.id == 'btn-send-send') {
            //check empty
            var checkstatus = false;

            getCoinBalance(address, "dp-send-from-balance");

            var fromaddressObject = $("#dp-address");
            var toaddressObject = $("#dp-send-to-address");
            var amountObject = $("#dp-send-to-amount");
            var gasPriceObject = $("#dp-send-from-gas-price");
            var accountBalanceObject = $("dp-send-from-balance");

            var fromaddress = fromaddressObject.text();
            var toaddress = toaddressObject.val();
            var amount = amountObject.val();
            var gasPrice = gasPriceObject.val();
            var accountBalance = accountBalanceObject.text();

            if (!toaddressObject.val()) {
                toaddressObject.addClass("empty");
                checkstatus = true;
            } else {
                toaddressObject.removeClass("empty");
            }
            if (!amountObject.val()) {
                amountObject.addClass("empty");
                checkstatus = true;
            } else {
                amountObject.removeClass("empty");
            }
            if (!gasPriceObject.val()) {
                gasPriceObject.addClass("empty");
                checkstatus = true;
            } else {
                gasPriceObject.removeClass("empty");
            }

            var totalamount = amount;
            getWeiToDogeProtocol(gasPrice).then(function (resolve) {
                totalamount = amount + resolve;
                if (totalamount > accountBalance) {
                    checkstatus = true;
                    console.log("Insufficient fund");
                }
            });

            if (checkstatus == true) {
                return;
            }

            getParseBigFloat(amount).then(function (resolve) {
                getDogeProtocolToWei(resolve).then(function (resolve) {
                    postTransaction(fromaddress, NONCE, toaddress, resolve, GAS, gasPrice, CHAIN_ID);
                }).catch(function (reject) {
                    console.log("error : " + JSON.stringify(reject));  // An error occurred
                });
            }).catch(function (reject) {
                console.log("error : " + JSON.stringify(reject));  // An error occurred
            });
        };

        if (event.target.id == 'dp-send-to-address') {
            var toaddressObject = $("#dp-send-to-address");
            if (!toaddressObject.val()) {
                toaddressObject.removeClass("empty");
            }
        }

        if (event.target.id == 'dp-send-to-amount') {
            var amountObject = $("#dp-send-to-amount");
            if (!amountObject.val()) {
                amountObject.removeClass("empty");
            }
        }

        if (event.target.id == 'dp-send-from-gas-price') {
            var gasPriceObject = $("#dp-send-from-gas-price");
            if (!gasPriceObject.val()) {
                gasPriceObject.removeClass("empty");
            }
        }
        */
        //Deposit
        //if (event.target.id == 'btn-deposit-back') {
        //    LoadWalletPage();
        //};

        //Import
        //if (event.target.id == 'btn-import-back') {
        //    LoadWalletPage();
        //};

        //if (event.target.id == 'btn-import-key') {
        //    ImportWalletFile();
        //};

        //footer
        /*
        $('.menu-item-footer').unbind().click(function () {
            switch (this.id) {
                case "menu-item-footer-1":
                    LoadWalletPage();
                    break;
                case "menu-item-footer-2":
                    loadPage(TRANSACTION);
                    break;
                case "menu-item-footer-3":
                    loadPage(ACCOUNT);
                    break;
                case "menu-item-footer-4":
                    loadPage(IMPORT).then(function (status) {
                        if (status) {
                            setTimeout(function () {
                                $("#btn-import-back").css('visibility', 'visible');
                            }, 200);
                        }
                    });
                    break;
                case "menu-item-footer-5":
                    let a = document.createElement('a');
                    a.target = '_blank';
                    a.href = DP_SCAN_URL + "/account/" + $('#dp-address').text() + "/txn/page";
                    a.click();
                    break;
            }
        });
        */
         //console.log(event.target.id);

    });
});

/*
async function postTransaction(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid) {
    //Tx message hex
    getTxMessage(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid).then(function (resolve) {
        var skKey = SK_KEY;
        var pkKey = PK_KEY;
        var txMessageHex = resolve;

        signAccount(txMessageHex, skKey).then(function (resolve) {
            if (resolve) {
                var sig = SIGN;
                verifyAccount(txMessageHex, sig, pkKey).then(function (resolve) {
                    if (resolve) {
                        getTxHash(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid, pkKey, sig).then(function (resolve) {
                            if (resolve) {                               
                                var hash = resolve;
                                getTxData(fromaddress, nonce, toaddress, amount, gas, gasprice, chainid, pkKey, sig).then(function (resolve) {
                                    if (resolve) {                                       
                                        sendTransaction(resolve, hash);
                                    }
                                }).catch(function (reject) {                                   
                                    console.log("Error getTxData : " + JSON.stringify(reject));
                                });
                            }
                        }).catch(function (reject) {
                            console.log("Error getTxHash : " + JSON.stringify(reject));  
                        });
                    }
                }).catch(function (reject) {
                    console.log("Error verifyAccount : " + JSON.stringify(reject));  
                });
            }
        }).catch(function (reject) {
            console.log("Error signAccount : " + JSON.stringify(reject));  
        });
    }).catch(function (reject) {
        console.log("Error getTxMessage : " + JSON.stringify(reject));  
    });
}
*/

function ShowNewCoinsNotification(value) {
    //console.log("ShowNewCoinsNotification");
    new Notification("Doge Protocol", { body: "Balance changed in wallet! " + value });
    return false;
}

function showCoinBalance(id) {
    var url = READ_API_URL + "/api/accounts/" + WALLET_ADDRESS + "/balance";
    CALL_API_GET(url).then(function (resolve) {
        if (resolve.result == null || resolve.result._Balance == null) {
            $("#" + id).text("0");
            NONCE = 0;
            return;
        }
        NONCE = parseInt(resolve.result.nonce);
        getWeiToDogeProtocol(resolve.result._Balance).then(function (resolve) {
            getParseBigFloat(resolve).then(function (resolve) {
                var value = resolve;
                $("#" + id).text(value);
            });
        });
    }).catch(function (reject) {
        $("#" + id).text("");
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

function getCoinBalance(address, id) {   
    //console.log("getCoinBalance0");
    var url = READ_API_URL + "/api/accounts/" + address + "/balance";
    console.log("getCoinBalance1");
    CALL_API_GET(url).then(function (resolve) {
        console.log("getCoinBalance2");
        var oldBalance = document.getElementById(id).innerText;

        if (resolve.result == null || resolve.result._Balance == null) {
            $("#" + id).text("0");
            NONCE = 0;
            return;
        }
       // var value = parseBigFloat(weidp(resolve.result._Balance));
        NONCE = parseInt(resolve.result.nonce);
        getWeiToDogeProtocol(resolve.result._Balance).then(function (resolve) {
            getParseBigFloat(resolve).then(function (resolve) {
                var value = resolve;
                $("#" + id).text(value);               
                var newBalance = document.getElementById(id).innerText;       

                if ((newBalance !== 'undefined' && newBalance != '0' && oldBalance === 'undefined') || (newBalance != oldBalance)) {
                    if (oldBalance == "" && isFirstTimeWalletOpen == false) {
                        //console.log("no notification 1");
                    } else {
                        ShowNewCoinsNotification(newBalance);
                    }
                } else {
                    console.log("no notification 2");
                }
            });
        });
        //console.log("getCoinBalance3 " + $("#" + id).text());
    }).catch(function (reject) {
        $("#" + id).text("");
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

async function getTokenBalance(address, tokenAddress, id) {
    var url = READ_API_URL + "/api/accounts/" + address + "/" + tokenAddress + "/balance";
    CALL_API_GET(url).then(function (resolve) {
        $("#" + id).text(resolve.result._Balance);
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

function requestTestnetTokens() {
    $("#spnLoading").css("display", "");
    var url = FAUCET_API_URL + "/api/faucet/transactions";
    var jsonAddress = {};
    jsonAddress.address = WALLET_ADDRESS;
    CALL_API_POST_DATA(url, jsonAddress).then(function (resolve) {
        loadPage(EXPORT_WALLET);
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
        $("#spnLoading").css("display", "none");
        return false;
    });
}

/*
async function listPendingTransaction(address, pageIndex) {
    var url = READ_API_URL + "/api/accounts/" + address + "/pending/txn/page/" + pageIndex;
    CALL_API_GET(url).then(function (resolve) {
        var pageCount = resolve.pageCount;
        var len = resolve.result.length;
        var trans = '';
        for (var i = 0; i < len; i++) {
            var txhash = resolve.result[i].hash;
            var value = resolve.result[i].value;
            trans = trans + "<a id='dp-recent-transaction-item-'" + i + " class='list-item-recent-transaction' herf = '#' ><div id='dp-recent-transaction-item-1-'" + i + ">" + "<div> Hash : " + txhash + "</div>" + "<div> Quantity : " + value + "</div>" + "</div></a><br/>"
        }
        //$("#dp-recent-transactions").empty();
        $("#dp-recent-transactions").html(trans);
        PAGE_INDEX = pageCount;
        if (pageIndex < pageCount && pageIndex > 0) {
            PAGE_INDEX = pageIndex;
        }
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

async function listTransactions(address, pageIndex) {
    var url = READ_API_URL + "/api/accounts/" + address + "/txn/page/" + pageIndex;
    CALL_API_GET(url).then(function (resolve) {
        var pageCount = resolve.pageCount;
        var len = resolve.result.length;
        var trans = '';
        for (var i = 0; i < len; i++) {
            var txhash = resolve.result[i].hash;
            //var txblockhash = resolve.result[i].blockHash;
            var createdat = resolve.result[i].createdAt;
            var value = resolve.result[i].value;
            trans = trans + "<a id='dp-transaction-item-'" + i + " class='list-item-transaction' herf = '#' ><div id='dp-transaction-item-1-'" + i + ">" + "<div> Hash : " + txhash + "</div>" + "<div> Created At : " + createdat + "</div>" + "<div> Quantity : " + value + "</div>" + "</div></a><br/>"
        }
        $("#dp-transactions").empty();
        $("#dp-transactions").html(trans);
        PAGE_INDEX = pageCount;
        if (pageIndex < pageCount && pageIndex > 0) {
            PAGE_INDEX = pageIndex;
        }
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

async function sendTransaction(tx, hash) {
    var url = WRITE_API_URL + "/api/transactions";
    var json = { "txnData": tx }
    CALL_API_POST_DATA(url, json).then(function (resolve) {
        //Write pending transaction
        //var guid = resolve.hash;
        //storeTransactionHash(hash, tx, guid).then(function (resolve) {
            if (resolve) {
                LoadWalletPage();
            }
        //}).catch(function (reject) {
          //  console.log("error : " + JSON.stringify(reject));  // An error occurred
        //});        
        console.log("guid : " + JSON.stringify(resolve) + " hash : " + hash);
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}

async function qrCode(address) {
    // Clear Previous QR Code
    $('#qrcode').empty();
    // Set Size to Match User Input
    $('#qrcode').css({
        'width': QR_CODE_WIDTH,
        'height': QR_CODE_HEIGHT
    })
    // Generate and Output QR Code
    $('#qrcode').qrcode({ width: QR_CODE_WIDTH, height: QR_CODE_HEIGHT, text: address });
}
*/

async function downloadKey(address) {
    let wallet = await GetWallet();
    var isoStr = new Date().toISOString();
    isoStr = isoStr.replaceAll(":", "-");
    var a = address.toLowerCase().substring(2, address.length)
    var filenanme = "UTC--" + isoStr + "--" + a + ".wallet"
    var mimtype = 'text/javascript'
    var content = JSON.stringify(wallet)
    
    download(content, mimtype, filenanme)
    //console.log("downloaded");
    await SetWalletExported();
    /*chrome.storage.local.get('pqc_key', function (pqc_result) {
        if (JSON.stringify(pqc_result).length > STORAGE_KEY_MIN_LENGTH) {
            //var result = pqc_result.pqc_key;
            console.log(JSON.stringify(pqc_result));
           // var encrypted_skkey = result.encrypted_skkey;
            var isoStr = new Date().toISOString();
            isoStr = isoStr.replaceAll(":", "-");
            var a = address.toLowerCase().substring(2, address.length)
            var filenanme = "UTC--" + isoStr + "--" + a
            //var mimtype = 'application/octet-stream'
            var mimtype = 'text/javascript'
            var content = JSON.stringify(pqc_result)
            download(content, mimtype, filenanme)
        }
    });*/
}

async function LoadWalletPage() {
    if (IsWalletUnlocked() == false) {
        return false;
    }
    //Header
    //$("#dp-header-banner").load("headerWallet.html");
    //Content
    $("#dp-content").load("wallet.html", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            console.log("LoadWalletPage1");
            getAccountAddress(PK_KEY).then(accountAddress => {
                $(document).ready(function () {
                    $("#dp-address").text(accountAddress);
                    //$("#dp-coin-logo").attr({
                      //  src: CRYPTO_LOGO
                    //});
                    //$("#dp-coin-caption").text(CRYPTO_NAME);
                    //$("#dp-coin-refresh").attr({
                      //  src: CRYPTO_REFRESH
                    //});
                    $("#dp-coin-balance").text("");
                    //$("#dp-coin-symbol").text(CRYPTO_SYMPOL);
                    getCoinBalance(accountAddress, "dp-coin-balance");
                });
/*
                (async () => {
                    let recentTxns = await GetRecentTransactions();
                    var trans = "";
                    var txlen = 0;
                    if (recentTxns != null) {
                        txlen = recentTxns.length;
                        for (var i = 0; i < txlen; i++) {
                            var txhash = tx_result.recent_tx[i].txHash;
                            var guid = tx_result.recent_tx[i].guid;
                            trans = trans + "<a id='dp-recent-transaction-item-'" + i + " class='list-item-recent-transaction' herf='#'><div id='dp-recent-transaction-item-1-'" + i + ">" + "<div>" + txhash + "</div>" + "<br/>" + "<div>" + guid + "</div>" + "</div></a>"
                        }
                        //$("#dp-recent-transactions").html(trans);
                    }
                    //listPendingTransaction(accountAddress, 0);
                })().catch(e => {
                    console.log(e);
                    // Deal with the fact the chain failed
                });*/



                /*
                chrome.storage.local.get('recent_tx', function (tx_result) {
                    console.log("Recent Transaction");
                    var trans = "";
                    var txlen = 0;
                    if (!isEmpty(tx_result.recent_tx.length)) {
                        txlen = tx_result.recent_tx.length;
                    }
                    for (var i = 0; i < txlen; i++) {
                        var txhash = tx_result.recent_tx[i].txHash;
                        var guid = tx_result.recent_tx[i].guid;
                        trans = trans + "<a id='dp-recent-transaction-item-'" + i + " class='list-item-recent-transaction' herf='#'><div id='dp-recent-transaction-item-1-'" + i + ">" + "<div>" + txhash + "</div>" + "<br/>" + "<div>" + guid + "</div>" + "</div></a>"
                    }
                    $("#dp-recent-transactions").html(trans);
                });
                */
               
            });
        }
        if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
    //Footer
    //$("#dp-footer-banner").load("footerWallet.html");
}

async function OnImportSeedPassword() {
    var newpass = $("#txt-new-password").val();
    var retypepass = $("#txt-retype-password").val();
    if (newpass != retypepass) {
        console.log("Password miss match")
        return;
    }

    newAccountFromSeed(newpass, TEMP_SEED_ARRAY).then(function (resolve) {
        if (resolve) {
            console.log("p1");
            (async () => {
                let wallet = await GetWallet();
                console.log("p2");
                if (wallet != null) {
                    console.log("p3");

                    var encrypted_skkey = wallet.encrypted_skkey;
                    var encrypted_pkkey = wallet.encrypted_pkkey;
                    var password = newpass;

                    unLockAccount(encrypted_skkey, encrypted_pkkey, password).then(function (resolve) {
                        if (resolve) {
                            //loadPage(NEW_SEED_PHRASE);
                            loadPage(TESTNET_COINS);
                            //LoadWalletPage();
                        }
                    }).catch(function (reject) {
                        console.log("Error unLockAccount : " + JSON.stringify(reject));
                    });
                } else {
                    console.log("p11");
                    //loadPage(NEW_ACCOUNT);
                }
            })().catch(e => {
                console.log(e);
                // Deal with the fact the chain failed
            });
        }
    }).catch(function (reject) {
        console.log("Error newAccount : " + JSON.stringify(reject));
    });
}

async function OnNewAccountPassword() {
    var newpass = $("#txt-new-password").val();
    var retypepass = $("#txt-retype-password").val();
    if (newpass != retypepass) {
        console.log("Password miss match")
        return;
    }
    newAccount(newpass).then(function (resolve) {
        if (resolve) {
            console.log("p1");
            (async () => {
                let wallet = await GetWallet();
                console.log("p2");
                if (wallet != null) {
                    console.log("p3");
                    
                    var encrypted_skkey = wallet.encrypted_skkey;
                    var encrypted_pkkey = wallet.encrypted_pkkey;
                    var password = newpass;

                    unLockAccount(encrypted_skkey, encrypted_pkkey, password).then(function (resolve) {
                        if (resolve) {
                            loadPage(NEW_SEED_PHRASE);
                            //loadPage(TESTNET_COINS);
                            //LoadWalletPage();
                        }
                    }).catch(function (reject) {
                        console.log("Error unLockAccount : " + JSON.stringify(reject));
                    });
                } else {
                    console.log("p11");
                    loadPage(NEW_ACCOUNT);
                }
            })().catch(e => {
                console.log(e);
                // Deal with the fact the chain failed
            });
        }
    }).catch(function (reject) {
        console.log("Error newAccount : " + JSON.stringify(reject));
    });
}

async function TryUnlockAccount() {
    (async () => {
        console.log("unlock1");
        let wallet = await GetWallet();
        
        console.log("unlock2");
        if (wallet != null) {
            console.log("unlock3");
            var encrypted_skkey = wallet.encrypted_skkey;
            var encrypted_pkkey = wallet.encrypted_pkkey;
            var password = $("#txt-password").val();
            console.log("unlock4");
            unLockAccount(encrypted_skkey, encrypted_pkkey, password).then(function (resolve) {
                console.log("unlock5");
                if (resolve) {
                    CheckExportAndLoadWalletPage();
                }
            }).catch(function (reject) {
                console.log("Error unLockAccount : " + JSON.stringify(reject));
            });
        } else {
            //loadPage(NEW_ACCOUNT);
            return false;
        }
    })().catch(e => {
        console.log(e);
        return false;
        // Deal with the fact the chain failed
    });
}

function ShowSettings() {
    loadPage(SETTINGS);
    return false;
}

function IsWalletUnlocked() {
    return IS_WALLET_UNLOCKED;
}

function CheckExportAndLoadWalletPage() {
    (async () => {
        var isWalletExported = await IsWalletExported();
        if (isWalletExported == true) {
            LoadWalletPage();
        } else {
            loadPage(EXPORT_WALLET);
        }
    })().catch(e => {
        console.log(e);        
        // Deal with the fact the chain failed
    });
}

async function ImportSeed(seed) {
    var file_to_read = document.getElementById("file-import").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        console.log("ImportWalletFile1");
        var wallet;

        try {
            wallet = JSON.parse(content);
            if (wallet == null) {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        console.log("ImportWalletFile2");
        if (JSON.stringify(wallet).length > STORAGE_KEY_MIN_LENGTH) {
            console.log("ImportWalletFile3");
            var encrypted_skkey = wallet.encrypted_skkey;
            var encrypted_pkkey = wallet.encrypted_pkkey;
            var password = $("#txt-import-password").val();

            if (encrypted_skkey == null || encrypted_pkkey == null || encrypted_skkey == undefined || encrypted_pkkey == undefined) {
                console.log("ImportWalletFile4");
                return false;
            }
            console.log("ImportWalletFile5");

            importUnLockAccount(encrypted_skkey, encrypted_pkkey, password).then(function (resolve) {
                if (resolve) {
                    console.log("ImportWalletFile6");
                    LoadWalletPage();
                }
            }).catch(function (reject) {
                console.log("Error importUnLockAccount : " + JSON.stringify(reject));
            });

        } else {
            console.log("ImportWalletFile7");
            return false;
        }

    };
    fileread.readAsText(file_to_read);
}

async function ImportWalletFile() {
    var file_to_read = document.getElementById("file-import").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        console.log("ImportWalletFile1");
        var wallet;

        try {
            wallet = JSON.parse(content); 
            if (wallet == null) {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }        
        console.log("ImportWalletFile2");
        if (JSON.stringify(wallet).length > STORAGE_KEY_MIN_LENGTH) {
            console.log("ImportWalletFile3");
            var encrypted_skkey = wallet.encrypted_skkey;
            var encrypted_pkkey = wallet.encrypted_pkkey;
            var password = $("#txt-import-password").val();

            if (encrypted_skkey == null || encrypted_pkkey == null || encrypted_skkey == undefined || encrypted_pkkey == undefined) {
                console.log("ImportWalletFile4");
                return false;
            }
            console.log("ImportWalletFile5");

            importUnLockAccount(encrypted_skkey, encrypted_pkkey, password).then(function (resolve) {
                if (resolve) {
                    console.log("ImportWalletFile6");
                    LoadWalletPage();
                }
            }).catch(function (reject) {
                console.log("Error importUnLockAccount : " + JSON.stringify(reject));
            });

        } else {
            console.log("ImportWalletFile7");
            return false;
        }

    };
    fileread.readAsText(file_to_read);
}

function LoadTransactionsPage() {

    $("#dp-content").load("transactions.html");

    //$("#dp-content").load("transactions.html", function (responseTxt, statusTxt, xhr) {
    //    if (statusTxt == "success") {
    //        getAccountAddress(PK_KEY).then(accountAddress => {
    //            $(document).ready(function () {
    //                $("#dp-address").text(accountAddress);
    //                $("#dp-transaction-logo").attr({
    //                    src: CRYPTO_LOGO
    //                });
    //                $("#dp-transaction-caption").text(CRYPTO_NAME);
    //                $("#dp-transaction-refresh").attr({
    //                    src: CRYPTO_REFRESH
    //                });
    //                $("#dp-transaction-balance").text(0);
    //                $("#dp-transaction-symbol").text(CRYPTO_SYMPOL);
    //                getCoinBalance(accountAddress, "dp-transaction-balance");

    //                listTransactions(accountAddress, 0);
    //            });
    //        });
    //    }
    //    if (statusTxt == "error") console.log("Error: " + xhr.status + ": " + xhr.statusText);
    //});
}

/*
async function GetBalanceOfCoin(address) {
    console.log("GetBalanceOfCoin0");
    var url = READ_API_URL + "/api/accounts/" + address + "/balance";
    console.log("GetBalanceOfCoin1");
    CALL_API_GET(url).then(function (resolve) {
        console.log("GetBalanceOfCoin2");
        if (resolve == null || resolve.result == null || resolve.result._Balance == null) {
            console.log("GetBalanceOfCoin2.5");
            NONCE = 0;
            return "0";
        }

        //console.log("GetBalanceOfCoin3");
        //var value = parseBigFloat(weidp(resolve.result._Balance));
        //console.log("GetBalanceOfCoin4");
        NONCE = resolve.result.nonce;

        getWeiToDogeProtocol(resolve.result._Balance).then(function (resolve) {
            getParseBigFloat(resolve).then(function (resolve) {
                var value = resolve;
                $("#" + id).text(value);
                console.log("GetBalanceOfCoin5 " + value);
                COIN_BALANCE = value;
            });
        });

        //console.log("GetBalanceOfCoin5 " + value);
        //COIN_BALANCE = value;
        //return output;
    }).catch(function (reject) {
        console.log("error : " + JSON.stringify(reject));  // An error occurred
    });
}
*/