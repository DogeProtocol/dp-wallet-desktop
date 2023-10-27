var SEED_BYTES = '';
const SEED_LENGTH = 80;

const SEED_FILE = "./assets/seedwords.txt"
const SEED_MAP = new Map(); //key is word, items are string corresponding to index1 and index2
const SEED_REVERSE_MAP = new Map(); //vice-versa of SEED_MAP
const SEED_HASH = "1651697838,1921825679,138234168,742830232,-668928765,558176785,-230059454,-688373737";
const SEED_FRIENDLY_INDEX_ARRAY = ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'd3', 'd4', 'e1', 'e2', 'e3', 'e4', 'f1', 'f2', 'f3', 'f4', 'g1', 'g2', 'g3', 'g4', 'h1', 'h2', 'h3', 'h4', 'i1', 'i2', 'i3', 'i4', 'j1', 'j2', 'j3', 'j4'];
var SEED_FRIENDLY_INDEX_REVERSE_ARRAY = [];

function getSeedKey(byte1, byte2) {
    return byte1 + "-" + byte2;
}

function getSeedByteIndicesFromString(indiceKey) {
    var result = indiceKey.split("-");
    if (result.length === 2) {
        return result;
    }
    return null;
}

async function LoadSeedMap() {
    var filedata = await ReadFile(SEED_FILE);
    var seedMapHashMessage = "";

    var lines = filedata.split("\n");
    for (i in lines) {
        var columns = lines[i].split(",");

        var key = columns[0]; //word
        var left = columns[1];
        var right = columns[2];
        if (right.charCodeAt(right.length - 1) === 13) {
            right = columns[2].substring(0, columns[2].length - 1);
        }
        var val = getSeedKey(left, right); //indices
        seedMapHashMessage = key + "=" + val + ",";
        //console.log("loadseedmap " + val + "|" + columns[1].length + "|" + columns[2].length + "|" + val.length);
        SEED_MAP.set(key, val);
        SEED_REVERSE_MAP.set(val, key);
    }

    var seedhash = await sha256(seedMapHashMessage);
    var seedhashstr = seedhash.toString();

    if (seedhashstr === SEED_HASH) {
        console.log("seed hashes match");
    } else {
        console.log(seedhashstr);
        console.log(SEED_HASH);
        alert("Warning! seed hashes do not match. Seed Phrases may be incorrectly processed!!");
        window.close();
    }

    //verify
    for (i = 0; i <= 255; i++) {
        for (j = 0; j <= 255; j++) {
            var testKey = getSeedKey(i, j);
            if (SEED_REVERSE_MAP.has(testKey) === false) {
                alert("Warning error loading seed map! " + testKey);
                return;
            }
        }
    }

    //Load Friendly Array
    SEED_FRIENDLY_INDEX_REVERSE_ARRAY = new Array(SEED_LENGTH / 2);
    var count = 0;
    for (i = 0; i < SEED_LENGTH / 2; i++) {
        SEED_FRIENDLY_INDEX_REVERSE_ARRAY[i] = [count, count + 1];
        count = count + 2;
    }
    //console.log("SEED_FRIENDLY_INDEX_REVERSE_ARRAY " + SEED_FRIENDLY_INDEX_REVERSE_ARRAY);
}
function getWordListFromSeed(seed) {
    var seedArray = seed.split(",");
    
    if (seedArray.length < 2) {
        console.log("seed array not specified");
        return null;
    }
    if (seedArray.length % 2 != 0) {
        console.log("seed should be even in length");
        return null;
    }

    var seedWordArray = new Array(seedArray.length / 2);
    var wordIndex = 0;
    for (i = 0; i < seedArray.length; i = i + 2) {
        var key = getSeedKey(seedArray[i], seedArray[i + 1]);
        if (SEED_REVERSE_MAP.has(key) === false) {
            console.log("seed does not exist");
            return null;
        }
        seedWordArray[wordIndex] = SEED_REVERSE_MAP.get(key);
        wordIndex = wordIndex + 1;
    }

    return seedWordArray;
}

function getFriendlySeedIndex(index) {
    if (index < 0 || index > (SEED_LENGTH / 2) - 1) {
        console.log("index out of bounds");
        return null;
    }
    return SEED_FRIENDLY_INDEX_ARRAY[index];
}

function getIndicesFromFriendlySeed(word) {
    word = word.toLowerCase();
    if (SEED_MAP.has(word) === false) {
        console.log("seed word does not exist");
        return null;
    }
    var byteIndicesString = SEED_MAP.get(word);
    var temp = getSeedByteIndicesFromString(byteIndicesString);
    if (temp === null) {
        console.log("getSeedByteIndicesFromString returned null");
        return null;
    }
    var byteArray = new Array(2);
    byteArray[0] = parseInt(temp[0]);
    byteArray[1] = parseInt(temp[1]);
    return byteArray;
}

function getSeedFromWordList(wordList) {
    var seedArray = new Array(wordList.length * 2);
    var seedIndex = 0;
    for (i = 0; i < wordList.length; i = i + 1) {
        var byteArray = getIndicesFromFriendlySeed(wordList[i]);
        if (byteArray == null) {
            console.log("getSeedFromWordList error");
            return null;
        }
        seedArray[seedIndex] = byteArray[0];
        seedArray[seedIndex + 1] = byteArray[1];
        seedIndex = seedIndex + 2;
    }

    return seedArray;
}

function getWordFromFriendlySeed(friendlySeedIndex, seed) {    
    if (friendlySeedIndex < 0 || friendlySeedIndex > (SEED_LENGTH / 2) - 1) { //0 to 39 is valid range
        console.log("invalid index");
        return null;
    }

    var seedArray = seed.split(",");
    var actualSeedValue1 = seedArray[SEED_FRIENDLY_INDEX_REVERSE_ARRAY[friendlySeedIndex][0]];
    var actualSeedValue2 = seedArray[SEED_FRIENDLY_INDEX_REVERSE_ARRAY[friendlySeedIndex][1]];
    var seedKey = getSeedKey(actualSeedValue1, actualSeedValue2);
    if (SEED_REVERSE_MAP.has(seedKey) === false) {
        return null;
    }
    return SEED_REVERSE_MAP.get(seedKey);
}

function doesSeedWordExist(word) {
    word = word.toLowerCase();
    if (SEED_MAP.has(word) === false) {
        console.log("word does not exist in seed map");
        return false;
    }

    return true;
}

function verifySeedWord(friendlySeedIndex, word, seed) {
    word = word.toLowerCase();
    if (SEED_MAP.has(word) === false) {
        console.log("word does not exist in seed map");
        return false;
    }

    var actualWord = getWordFromFriendlySeed(friendlySeedIndex, seed);
    if (actualWord === null) {
        console.log("actual word is null");
        return false;
    }

    if (word === actualWord) {
        return true;
    }

    return false;
}