export class NgxIndexedDBManager {
    private utils: Utils;
    private dbWrapper: DbWrapper;

    constructor(dbName: string, version: number) {
        this.utils = new Utils();
        this.dbWrapper = new DbWrapper(dbName, version);
    }
    //
    openDatabase(version: number , callback: (e: any, body: any) => void) {
        return new Promise<IDBDatabase>((resolve: any, reject: any) => {
            this.dbWrapper.dbVersion = version;
            const request = this.utils.indexedDB.open(this.dbWrapper.dbName, version);
            console.log('request >>', request);
            // console.log('openDatabase >> ', this.dbWrapper.dbName, version);
            // console.log('openDatabase >> request >>', JSON.stringify(request));

            // 버젼이 변경될때 1회 적용된다. 따라서 초기 store 생성시 이 부분을 사용한다.
            // 만약 데이타 변경이 될경우 버젼을 올려서 배포한다.
            request.onupgradeneeded = (e) => {
                console.log('request.onupgradeneeded >>', e)
                // callback(e, this.dbWrapper.db);
                callback(e, this.dbWrapper.db);
            };

            request.onsuccess = (e) => {
                console.log('request.onsuccess >> e >> ', e)
                console.log('request.result >> ', request.result);
                this.dbWrapper.db = request.result;
                resolve(e);
            };
            //
            request.onerror = (e) => {
                console.log('request.onerror')
                reject('IndexedDB error: ' + (e.target as any).errorCode);
            };

        });

    }

    getByKey(storeName: string, key: any) {
        console.log('getByKey1');
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readOnly,
                error: (e: Event) => {
                    console.log('getByKey2');
                    reject(e);
                }
                // ,
                // complete: () => { // e: Event
                //    console.log('getByKey3');
                    // resolve(e);
                // }
            });
            const objectStore = transaction.objectStore(storeName);
            let request: IDBRequest;

            request = objectStore.get(key);
            request.onsuccess = (e: Event) => {
                console.log('getByKey4');
                resolve((e.target as any).result);
            };

        });
    }

    getAll(storeName: string, keyRange?: IDBKeyRange, indexDetails?: IndexDetails) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readOnly,
                error: (e: Event) => {
                    reject(e);
                },
                complete: (e: Event) => {
                    resolve(e);
                }
            });

            const objectStore = transaction.objectStore(storeName);
            const result: Array<any> = [];
            let request: IDBRequest;
            if (indexDetails) {
                const index = objectStore.index(indexDetails.indexName);
                const order = (indexDetails.order === 'desc') ? 'prev' : 'next';
                request = index.openCursor(keyRange, order);
            } else {
                request = objectStore.openCursor(keyRange);
            }

            request.onerror = (e) => {
                reject(e);
            };


            request.onsuccess = (e: Event) => {
                const cursor = (e.target as IDBOpenDBRequest).result as any ;
                if (cursor) { // cursor.value contains the current record being iterated through
                    result.push(cursor.value);
                    cursor.continue();
                } else { // no more result
                    resolve(result);
                }
            };

        });
    }

    add(storeName: string, value: any, key?: any) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readWrite,
                error: (e: Event) => {
                    reject(e);
                },
                complete: () => { // e: Event
                    resolve({ key, value });
                }
            });
            const objectStore = transaction.objectStore(storeName);

            const request = objectStore.add(value, key);
            request.onsuccess = (e: any) => {
                key = e.target.result;
            };
        });
    }

    update(storeName: string, value: any, key?: any) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readWrite,
                error: (e: Event) => {
                    reject(e);
                },
                complete: () => { // e: Event
                    resolve(value);
                },
                abort: (e: Event) => {
                    reject(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);

            objectStore.put(value, key);
        });
    }

    delete(storeName: string, key: any) {
        return new Promise<any>((resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readWrite,
                error: (e: Event) => {
                    reject(e);
                },
                complete: (e: Event) => {
                    resolve(e);
                },
                abort: (e: Event) => {
                    reject(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);

            objectStore.delete(key);
        });
    }

    openCursor(storeName: string, cursorCallback: (e: Event) => void, keyRange?: IDBKeyRange) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readOnly,
                error: (e: Event) => {
                    reject(e);
                },
                complete: (e: Event) => {
                    resolve(e);
                },
                abort: (e: Event) => {
                    reject(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.openCursor(keyRange);

            request.onsuccess = (e: Event) => {
                cursorCallback(e);
                resolve();
            };
        });
    }

    getByIndex(storeName: string, indexName: string, key: any) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readOnly,
                error: (e: Event) => {
                    reject(e);
                },
                abort: (e: Event) => {
                    reject(e);
                },
                complete: (e: Event) => {
                    resolve(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);
            const index = objectStore.index(indexName);
            const request = index.get(key);

            request.onsuccess = (e) => {
                resolve((e.target as IDBOpenDBRequest).result);
            };
        });
    }

    count(storeName: string) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readOnly,
                error: (e: Event) => {
                    reject(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.count();
            request.onsuccess = (e) => {
                resolve((e.target as IDBOpenDBRequest).result);
            };
        });
    }

    clear(storeName: string) {
        return new Promise<any>((resolve: any, reject: any) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);

            const transaction = this.dbWrapper.createTransaction({
                storeName,
                dbMode: this.utils.dbMode.readWrite,
                error: (e: Event) => {
                    reject(e);
                },
                complete: (e: Event) => {
                    resolve(e);
                },
                abort: (e: Event) => {
                    reject(e);
                }
            });
            const objectStore = transaction.objectStore(storeName);
            objectStore.clear();
            resolve();
        });
    }

    deleteDatabase() {
        return new Promise<IDBDatabase>((resolve: any, reject: any) => {
            const request = this.utils.indexedDB.deleteDatabase(this.dbWrapper.dbName);

            request.onerror = (e) => {
                reject(e);
            };

            request.onsuccess =  (e: any) => {
                resolve(e.result);
            };
        });
    }
}

class Utils {
    dbMode: DbMode;
    indexedDB: IDBFactory;

    constructor() {
        this.indexedDB = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB;
        // this.indexedDB = window.indexedDB;
        this.dbMode = {
            readOnly: 'readonly',
            readWrite: 'readwrite'
        };
    }
}

export interface IndexDetails {
    indexName: string;
    order: string;
}

interface DbMode {
    readOnly: IDBTransactionMode;
    readWrite: IDBTransactionMode;
}

class DbWrapper {
    dbName: string;
    dbVersion: number;
    db: any;
    // db: IDBDatabase;

    constructor(dbName: string, version: number) {
        this.dbName = dbName;
        this.dbVersion = version || 1;
        this.db = null;
    }

    validateStoreName(storeName: string) {
        return this.db.objectStoreNames.contains(storeName);
    }

    validateBeforeTransaction(storeName: string, reject: (body: string) => void) {
        if (!this.db) {
            reject('You need to use the createStore function to create a database before you query it!');
        }
        if (!this.validateStoreName(storeName)) {
            reject(('objectStore does not exists: ' + storeName));
        }
    }

    createTransaction(options: {
                storeName: string,
                dbMode: IDBTransactionMode,
                error: (e: Event) => any,
                complete?: (e: Event) => any,
                abort?: (e: Event) => any
            }): IDBTransaction {
        // const trans: IDBTransaction = this.db.transaction(options.storeName, options.dbMode);
        const trans: any = this.db.transaction(options.storeName, options.dbMode);
        trans.onerror = options.error;
        trans.oncomplete = options.complete;
        trans.onabort = options.abort;
        return trans;
    }
}
