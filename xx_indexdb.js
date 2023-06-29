
"use strict"


async function saveArray(array, key) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("database", 1);

        request.onerror = function (event) {
            console.error("Errore nell'apertura del database");
            resolve(false);
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore("store");
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["store"], "readwrite");
            const objectStore = transaction.objectStore("store");
            const putRequest = objectStore.put(array, key);

            putRequest.onerror = function (event) {
                console.error("Errore durante il salvataggio nell'IndexedDB");
                resolve(false);
            };

            putRequest.onsuccess = function (event) {
                console.log("Array salvato nell'IndexedDB");
                resolve(true);
            };
        };
    });
}

async function readArray(key) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("database", 1);

        request.onerror = function (event) {
            console.error("Errore nell'apertura del database");
            resolve([]);
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["store"], "readonly");
            const objectStore = transaction.objectStore("store");
            const getRequest = objectStore.get(key);

            getRequest.onerror = function (event) {
                console.error("Errore durante la lettura dall'IndexedDB");
                resolve([]);
            };

            getRequest.onsuccess = function (event) {
                const array = event.target.result;
                resolve(array || []);
            };
        };
    });
}

// Esempio di utilizzo
const array1 = ["elemento1", "elemento2", "elemento3"];
const array2 = ["elemento4", "elemento5", "elemento6"];

const key1 = 1;
const key2 = "myArray";

async function main() {
    const saveResult1 = await saveArray(array1, key1);
    console.log("Salvataggio array1 riuscito:", saveResult1);

    const saveResult2 = await saveArray(array2, key2);
    console.log("Salvataggio array2 riuscito:", saveResult2);

    const readResult1 = await readArray(key1);
    console.log("Array1 letto:", readResult1);

    const readResult2 = await readArray(key2);
    console.log("Array2 letto:", readResult2);
}

main();

