# XML

```
npm i xml2js
npm i --save-dev @types/xml2js
npm i timers // stream
```
app.modules.ts
```
import { HttpClientModule } from '@angular/common/http';
imports:[HttpClientModule]
```

```
import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
@Component({
    selector: 'app-root',
    template:`
    `
})
export class XmlComponent1{
    constructor(
        private http:HttpClient
    ) {
        this.loadXML();
    }

    private loadXML(){
        /*Read Data*/
        this.http.get('assets/xmls/users.xml',  {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/xml')
                .append('Access-Control-Allow-Methods', 'GET')
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
        })
            .subscribe((data) => {
                this.parseXML(data)
                .then((data: any) => {
                    console.log('data >>', data);
                    // this.xmlItems = data;
                });
            });
        /*Read Data*/
    }


    //store xml data into array variable
    private parseXML(data: any) {
        return new Promise(resolve => {
            let k: string | number;
            const arr: any = [];
            const parser = new xml2js.Parser(
            {
                trim: true,
                explicitArray: true
            });

            parser.parseString(data, (err: any, result: any) => {
                if (err) {
                    console.log(err);
                }
                const obj = result.Employee;
                for (k in obj.emp) {
                    var item = obj.emp[k];
                    arr.push({
                        id: item.id[0],
                        name: item.name[0],
                        email: item.email[0],
                    });
                }
                resolve(arr);
            });
        });
    }
}

```