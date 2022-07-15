import { Component } from '@angular/core';
import { NgxIndexedDBManager } from './lib/indexed.db';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    template: ``
    // templateUrl: 'gsap.html',
})
export class IndexDbComponent {

    private db: any;
    private storename = 'test.data';
    constructor(
        private http:HttpClient
    ) {
        this.db = new NgxIndexedDBManager('myTest.db', 1);
        this.db.openDatabase(2, (e: any) => {
            // 새로운 store 를 만든다.
            const objectStore = e.currentTarget.result.createObjectStore(this.storename, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('index', 'index', { unique: true });
        }).then(() => {
            console.log('on connection success');
            this.add();

        });
    }

    private add() {
        const url = 'assets/data/indexdb/data.json';
        this.http.get(url,  {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .append('Access-Control-Allow-Methods', 'GET')
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
        }).subscribe((data: any) => {
            this.insertNewData(JSON.parse(data));
        });

    }

    private insertNewData(data: any) {
        data.forEach((obj: any) => {
            this.db.add(this.storename, obj).then(
                () => {
                    console.log('insertNewData added');
                    // Do something after the value was added
                },
                (error: any) => {
                    console.error('insertNewData error >>', error);
                }
            );
        });

        this.retrive();
    }

    private retrive() {
        // 데이타 가져오기
        this.db.getAll(this.storename).then((data: any) => {
            console.log(data);
        }, (error: any) => {
            console.error(error);
        });
    }
}