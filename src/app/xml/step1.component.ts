import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import * as _ from 'underscore'
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
        this.http.get('assets/xmls/Aruba2.xml',  {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/xml')
                .append('Access-Control-Allow-Methods', 'GET')
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
        })
            .subscribe((data) => {
                // console.log('data >>', data);
                this.parseXML(data)
                .then((data: any) => {

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
                trim: false,
                explicitArray: true
            });

            // console.log('parser >>', parser);

            parser.parseString(data, (err: any, result: any) => {
                if (err) {
                    console.log(err);
                }

                const data: any = [];
                // console.log(result.SokobanLevels.LevelCollection[0].Level);
                for(const k of result.SokobanLevels.LevelCollection[0].Level) {
                    // console.log(k.$);
                    // console.log(k.L);
                    const id = k.$.Id;
                    const width = k.$.Width;
                    const height = k.$.Height;
                    console.log(id, width, height);
                    let lines: any = [];
                    // console.log('==========================');
                    for (const a of k.L) {
                        // console.log('--------------------');
                        // console.log(a);
                        // console.log(a.split(''));
                        const line = a.split('');
                        for (let i = 0; i < width; i++) {
                            if (typeof line[i] === 'undefined') {
                                line[i] = ' ';
                            }
                        }

                        lines.push(...line)
                    }

                    // console.log(lines);
                    //
                    // for (let a of lines) {
                    //     // console.log(a);
                    //     switch(a) {
                    //         case '':
                    //             a = 0;
                    //             break;
                    //         case '#':
                    //             a = 85;
                    //             break;
                    //         case '.':
                    //             a = 64;
                    //             break;
                    //         case '$':
                    //             a = 9;
                    //             break;
                    //         case '@':
                    //             a = 52;
                    //             break;
                    //         case '*':
                    //             a = 26; // 박스와 destination
                    //             break;
                    //         case '+':
                    //             a = 26; // destination  + 플레이어
                    //             break;
                    //     }
                    //     // console.log(a);
                    // }
                    // console.log(lines);

                    // const mapStatic = _.map(lines, (map) => {
                    //     switch(map) {
                    //         case ' ':
                    //             return 0;
                    //         case '#':
                    //             return 85;
                    //         case '.':
                    //             return 64;
                    //         case '$':
                    //             return 9;
                    //         case '@':
                    //             return 52;
                    //         case '*':
                    //             return 26; // 박스와 destination
                    //             break;
                    //         case '+':
                    //             return 13; // destination  + 플레이어
                    //             break;
                    //         default:
                    //             return 0;
                    //     }
                    //     // return ''
                    // });

                    const mapStatic = _.map(lines, (map) => {
                        switch(map) {
                            case '#': // wall
                                return 85;
                            case '.': // destination
                            case '*': // destination + box
                            case '+': // destination  + player
                                return 64;
                            default:
                                return 0;
                        }
                        // return ''
                    });

                    const mapMovable = _.map(lines, (map) => {
                        switch(map) {
                            case '$': // box
                            case '*': // destination + box
                                return 9;
                            case '@': // player
                            case '+': // destination  + player
                                return 52;
                            default:
                                return 0;
                        }
                        // return ''
                    });

                    const mydata = {id, width, height, mapstatic: mapStatic.toString(), mapmovable: mapMovable.toString()}
                    data.push(mydata);
                    // console.log(maps);

                    // 현재 sokoban 데이타를 게임에서 요구하는 sokoban 데이타로 변경
                }

                console.log(data);

                // const obj = result.Employee;
                // for (k in obj.emp) {
                //     var item = obj.emp[k];
                //     arr.push({
                //         id: item.id[0],
                //         name: item.name[0],
                //         email: item.email[0],
                //     });
                // }
                resolve(arr);
            });
        });
    }
}
