import * as _ from 'underscore';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`비트마스크(Bit Mask)를 이용한 패턴찾기 console에서 보셔요`
})
export class BitMaskComponent2 implements AfterViewInit{
  constructor(
  ) {

    this.cal();
   }

  ngAfterViewInit(){
  }

  private cal() {
    const map1 =  [
      {"x": 0, "y": 0, "type": "wall", "frame": 0},{"x": 1, "y": 0, "type": "gem", "frame": 1},{"x": 2, "y": 0, "type": "gem", "frame": 1},{"x": 3, "y": 0, "type": "gem", "frame": 3},
      {"x": 4, "y": 0, "type": "gem", "frame": 4},{"x": 5, "y": 0, "type": "gem", "frame": 5},{"x": 6, "y": 0, "type": "gem", "frame": 0},{"x": 7, "y": 0, "type": "wall", "frame": 1},
      
      {"x": 0, "y": 1, "type": "gem", "frame": 1},{"x": 1, "y": 1, "type": "gem", "frame": 1},{"x": 2, "y": 1, "type": "gem", "frame": 1},{"x": 3, "y": 1, "type": "gem", "frame": 1},
      {"x": 4, "y": 1, "type": "gem", "frame": 1},{"x": 5, "y": 1, "type": "block", "frame": 2},{"x": 6, "y": 1, "type": "gem", "frame": 1},{"x": 7, "y": 1, "type": "gem", "frame": 2},
      
      {"x": 0, "y": 2, "type": "gem", "frame": 2},{"x": 1, "y": 2, "type": "gem", "frame": 3},{"x": 2, "y": 2, "type": "gem", "frame": 1},{"x": 3, "y": 2, "type": "gem", "frame": 5},
      {"x": 4, "y": 2, "type": "gem", "frame": 0},{"x": 5, "y": 2, "type": "gem", "frame": 1},{"x": 6, "y": 2, "type": "gem", "frame": 2},{"x": 7, "y": 2, "type": "gem", "frame": 3},
      
      {"x": 0, "y": 3, "type": "gem", "frame": 3},{"x": 1, "y": 3, "type": "gem", "frame": 4},{"x": 2, "y": 3, "type": "gem", "frame": 1},{"x": 3, "y": 3, "type": "gem", "frame": 0},
      {"x": 4, "y": 3, "type": "gem", "frame": 4},{"x": 5, "y": 3, "type": "gem", "frame": 4},{"x": 6, "y": 3, "type": "gem", "frame": 4},{"x": 7, "y": 3, "type": "gem", "frame": 4},
      
      {"x": 0, "y": 4, "type": "gem", "frame": 4},{"x": 1, "y": 4, "type": "gem", "frame": 5},{"x": 2, "y": 4, "type": "gem", "frame": 0},{"x": 3, "y": 4, "type": "gem", "frame": 0},
      {"x": 4, "y": 4, "type": "gem", "frame": 2},{"x": 5, "y": 4, "type": "gem", "frame": 4},{"x": 6, "y": 4, "type": "gem", "frame": 4},{"x": 7, "y": 4, "type": "gem", "frame": 5},
      
      {"x": 0, "y": 5, "type": "gem", "frame": 5},{"x": 1, "y": 5, "type": "gem", "frame": 0},{"x": 2, "y": 5, "type": "gem", "frame": 1},{"x": 3, "y": 5, "type": "gem", "frame": 4},
      {"x": 4, "y": 5, "type": "gem", "frame": 4},{"x": 5, "y": 5, "type": "gem", "frame": 4},{"x": 6, "y": 5, "type": "gem", "frame": 4},{"x": 7, "y": 5, "type": "gem", "frame": 0},
      
      {"x": 0, "y": 6, "type": "gem", "frame": 0},{"x": 1, "y": 6, "type": "gem", "frame": 1},{"x": 2, "y": 6, "type": "gem", "frame": 1},{"x": 3, "y": 6, "type": "gem", "frame": 3},
      {"x": 4, "y": 6, "type": "gem", "frame": 3},{"x": 5, "y": 6, "type": "gem", "frame": 4},{"x": 6, "y": 6, "type": "gem", "frame": 0},{"x": 7, "y": 6, "type": "gem", "frame": 1},
      
      {"x": 0, "y": 7, "type": "wall", "frame": 1},{"x": 1, "y": 7, "type": "gem", "frame": 2},{"x": 2, "y": 7, "type": "gem", "frame": 1},{"x": 3, "y": 7, "type": "gem", "frame": 1},
      {"x": 4, "y": 7, "type": "gem", "frame": 1},{"x": 5, "y": 7, "type": "gem", "frame": 4},{"x": 6, "y": 7, "type": "gem", "frame": 3},{"x": 7, "y": 7, "type": "wall", "frame": 2}
    ];

    const defaultArr = this.createEmptyArr();
    this.objToArr(defaultArr, map1);

    console.log('defaultArr >>', defaultArr);

    /*
    match 3 패턴

    중요도 : 5   (3개 맵핑)
    horizon3
    vertical3

    중요도 4 (4개 맵핑)
    horizon4
    vertical4
    4개 모두 깨지는 아이템

    중요도 : 1 (5개 맵핑)
    horizon5
    vertical5
    특정 색상 없애는 아이템

    중요도 3 (4개 맵핑)
    ㅁ 패턴
    벌이 나오는 아이템

    중요도 2  (5개 맵핑)
    T, L, ㄱ 패턴
    대각선 깨는 아이템
    */
   /*
   매치되는 모든 포인트를 배열에 담은 후
   중요순서대로 매칭되는 포인트를 삭제한다.
   이렇게 되면 동일 포인트를 가지고 있더라도 매칭포인트에서는 삭제되므로 다시 비교하려하면 존재 하지 않으므로 리턴을 하게 된다.
   ㅁ 매칭은 같은자리에 벌이 나와야 하므로 값도 중요하다.
   */
    let matchPoint: number[][] = [];
    const matchList: any[] = [];
    for(let x = 0; x < 6; x++) {
      for(let y = 0; y < 6; y++) {
        // console.log(defaultArr[x][y], defaultArr[x + 1][y], defaultArr[x + 2][y]);

        
        // if (defaultArr[x][y] === defaultArr[x + 1][y] === defaultArr[x + 2][y]) { //y 고정 horizone, 
        // 수평 3라인
        if (defaultArr[x][y] === defaultArr[x + 1][y] 
          && defaultArr[x][y] === defaultArr[x + 2][y]
        ) { //y 고정 horizon, 
          matchPoint = [[x, y], [x+1, y], [x+2, y]];
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'horizone3', 5, [null, null]));
        }
        // 수직 3라인
        if (defaultArr[x][y] === defaultArr[x][y + 1]
          && defaultArr[x][y] === defaultArr[x][y + 2]
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x, y + 1], [x, y + 2]];
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'vertical3', 5, [null, null]));
        }
        // 수평 4라인
        if(defaultArr[x + 3]) {
          if (defaultArr[x][y] === defaultArr[x + 1][y] 
            && defaultArr[x][y] === defaultArr[x + 2][y]
            && defaultArr[x][y] === defaultArr[x + 3][y]
          ) { //y 고정 horizone, 
            matchPoint = [[x, y], [x+1, y], [x + 2, y], [x + 3, y]];
            matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'horizone4', 4, [x + 2, y]));
          }
        }
        // 수직 4라인
        if(defaultArr[y + 3]) {
          if (defaultArr[x][y] === defaultArr[x][y + 1]
            && defaultArr[x][y] === defaultArr[x][y + 2]
            && defaultArr[x][y] === defaultArr[x][y + 3]
          ) { //x 고정 vertical, 
            matchPoint = [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]];
            matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'vertical4', 4, [x, y + 2]));
          }
        }

        // 수평 5라인
        if(defaultArr[x + 3] && defaultArr[x + 4]) {
          if (defaultArr[x][y] === defaultArr[x + 1][y] 
            && defaultArr[x][y] === defaultArr[x + 2][y]
            && defaultArr[x][y] === defaultArr[x + 3][y]
            && defaultArr[x][y] === defaultArr[x + 4][y]
          ) { //y 고정 horizone, 
            matchPoint = [[x, y], [x+1, y], [x + 2, y], [x + 3, y], [x + 4, y]];
            matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'horizone5', 1, [x + 2, y]));
          }
        }

        // 수직 5라인
        if(defaultArr[y + 3] && defaultArr[y + 4]) {
          if (defaultArr[x][y] === defaultArr[x][y + 1]
            && defaultArr[x][y] === defaultArr[x][y + 2]
            && defaultArr[x][y] === defaultArr[x][y + 3]
            && defaultArr[x][y] === defaultArr[x][y + 4]
          ) { //x 고정 vertical, 
            matchPoint = [[x, y], [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4]];
            matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'vertical5', 1, [x, y + 2]));
          }
        }

        // ㄱ 패턴
        if (defaultArr[x][y] === defaultArr[x + 1][y] 
            && defaultArr[x][y] === defaultArr[x + 2][y]
            && defaultArr[x][y] === defaultArr[x + 2][y + 1]
            && defaultArr[x][y] === defaultArr[x + 2][y + 2] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x + 1, y], [x +2, y], [x +2, y + 1], [x +2, y + 2]];
          // console.log('ㄱ 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 't', 2, [x + 2, y]));
        }
        // 역 ㄱ 패턴
        if (defaultArr[x][y] === defaultArr[x + 1][y] 
          && defaultArr[x][y] === defaultArr[x + 2][y]
          && defaultArr[x][y] === defaultArr[x][y + 1]
          && defaultArr[x][y] === defaultArr[x][y + 2] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x + 1, y ], [x + 2, y], [x, y + 1], [x, y + 2]];
          // console.log('역 ㄱ 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 't', 2, [x, y]));
        }


        // L 패턴
        if (defaultArr[x][y] === defaultArr[x][y + 1] 
          && defaultArr[x][y] === defaultArr[x][y + 2] 
          && defaultArr[x][y] === defaultArr[x + 1][y + 2] 
          && defaultArr[x][y] === defaultArr[x + 2][y + 2] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x, y + 1], [x, y + 2], [x + 1, y + 2], [x + 2, y + 2]];
          // console.log('L 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 't', 2, [x, y + 2]));
        }

        // 역 L 패턴
        if (defaultArr[x][y + 2] === defaultArr[x + 1][y + 2] 
          && defaultArr[x][y + 2] === defaultArr[x + 2][y + 2] 
          && defaultArr[x][y + 2] === defaultArr[x + 2][y + 1] 
          && defaultArr[x][y + 2] === defaultArr[x + 2][y] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y + 2], [x + 1, y + 2], [x + 2, y + 2], [x + 2, y + 1], [x + 2, y]];
          // console.log('역 L 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y + 2], matchPoint, 't', 2, [x + 2, y + 2]));
        }

        // T 패턴
        if (defaultArr[x][y] === defaultArr[x + 1][y] 
          && defaultArr[x][y] === defaultArr[x + 2][y] 
          && defaultArr[x][y] === defaultArr[x + 1][y + 1] 
          && defaultArr[x][y] === defaultArr[x + 1][y + 2] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x + 1, y], [x + 2, y], [x + 1, y + 1], [x + 1, y + 2]];
          // console.log('정 T 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 't', 2, [x + 1, y] ));
        }

        // 역 T 패턴
        if (defaultArr[x][y + 2] === defaultArr[x + 1][y + 2] 
          && defaultArr[x][y + 2] === defaultArr[x + 2][y + 2] 
          && defaultArr[x][y + 2] === defaultArr[x + 1][y + 1] 
          && defaultArr[x][y + 2] === defaultArr[x + 1][y] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y + 2], [x + 1, y + 2], [x + 2, y + 2], [x + 1, y + 1], [x + 1, y]];
          // console.log('역 T 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y + 2], matchPoint, 't', 2, [x + 1, y + 2] ));
        }

        // 좌 T 패턴
        if (defaultArr[x][y] === defaultArr[x][y + 1] 
          && defaultArr[x][y] === defaultArr[x][y + 2] 
          && defaultArr[x][y] === defaultArr[x + 1][y + 1] 
          && defaultArr[x][y] === defaultArr[x + 2][y + 1] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x, y + 1], [x, y + 2], [x + 1, y + 1], [x + 2, y + 1]];
          // console.log('좌 T 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 't', 2, [x, y + 1]));
        }

        // 우 T 패턴'
        if (defaultArr[x][y + 1] === defaultArr[x + 1][y + 1] 
          && defaultArr[x][y + 1] === defaultArr[x + 2][y + 1] 
          && defaultArr[x][y + 1] === defaultArr[x + 2][y] 
          && defaultArr[x][y + 1] === defaultArr[x + 2][y + 2] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y + 1 ], [x + 1, y + 1], [x + 2, y + 1], [x + 2, y], [x + 2, y + 2]];
          // console.log('우 T 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y + 1], matchPoint, 't', 2, [x + 2, y + 1] ));
        }

        // ㅁ 패턴
        if (defaultArr[x][y] === defaultArr[x][y + 1] 
          && defaultArr[x][y + 1] === defaultArr[x + 1][y] 
          && defaultArr[x][y + 1] === defaultArr[x + 1][y + 1] 
        ) { //x 고정 vertical, 
          matchPoint = [[x, y], [x, y + 1], [x + 1, y], [x + 1, y + 1]];
          // console.log('ㅁ 패턴', defaultArr[x][y], matchPoint);
          matchList.push(this.collectMatchs(defaultArr[x][y], matchPoint, 'rect', 3, [x + 1, y + 1]));
        }

      }
    }

    // 기존 것을 copy 받아둔다.
    let temp = _.flatten(JSON.parse(JSON.stringify(matchList)), true); // temp는 중복체크를 위해 사용할 예정
    const bonusList: any[] = []; // 완전히 unique한 보너스만 입력
    const matchedList = _.chain(JSON.parse(JSON.stringify(temp))) // temp에서 unique한 값만을 저장, 실제 삭제할 unique gem 정보
      .sortBy((o) => { return o.prioriy; }) // 중요도 순으로 정렬
      .unique((o)=>{
        return o.x + ',' + o.y;
      })
      .value(); // 그 값을 가져온다.
     
    _.each(matchedList, (matched) =>{ // matchedList는 priority로 정렬되어 있으므로 차례로 현재 matchList 에 있는 것을 찾아 모든 block이 있으면 bonusList에 넣어 두고 현재 block을 포함하는 모든 array를 삭제하고 없으면 다음으로 진행한다.
      
      const matchListResult = _.find(matchList, (match) => { // matchListResult 는 matchedList 에 있는 항목이 포함된 것을 다시 2차 배열로 리턴
        return _.find(match, (m) => {
          return m.x === matched.x && m.y === matched.y && m.prioriy === matched.prioriy;
        })
      })

      let result = true;
      _.each(matchListResult, (match) => {

        let find = _.find(temp, (t) => {
          return t.x === match.x && t.y === match.y
        });
        if (!find) {
          result = false; // 하나라도 일치갑이 없으면 false로 변경
        } else {
          _.each(temp, (t) => {
            if(t.x === match.x && t.y === match.y) { // 이미 한번 체크한 것이라면 null로 변경하여 이후 검색시 false가 되게 한다.
              t.x = null;
              t.y = null;
            }
          });
        }
      })

      if (result) {
        bonusList.push(matched);
      }

    })

    // const bonusList = _.unique(JSON.parse(JSON.stringify(matchedList)),(m)=>{
    //   return m.center_x + ',' + m.center_y;
    // })

    // console.log('matchedList:', matchedList); // 이것은 실제로 삭제할 리스트
    console.log('bonusList:', bonusList);
    console.log('matchedList:', matchedList);

    // matchedList는 현재 우선순위로 정렬되어 있으므로 이것을 이용하여 

    // 원래것은 plattern시키고 중복되는 좌표는 업앤다.

    // _.each(defaultArr, (a) =>{
    //   console.log(a);
    // })
  }

  private collectMatchs(frame: number, matchPoint: number[][], matchType: string, prioriy: number, center: any[]) {
    const obj = _.map(matchPoint, (m) =>{
      return {x: m[0], y: m[1], frame: frame, matchType: matchType, prioriy: prioriy, center_x: center[0], center_y: center[1]}
    })
    return obj;
  }

  private createEmptyArr() {
    const map: any = [];
    for(let x=0; x<8; x++) {
      map[x] = [];
      for (let y=0; y<8; y++) {
        map[x][y] = null;
      }
    }

    return map;
  }

  private objToArr(defaultArr: any, obj: any) {
    _.each(obj, (o) =>{
      if(o.type === 'gem') {
        defaultArr[o.x][o.y] = o.frame;
      }
    })

    // console.log('defaultArr >>', defaultArr);
  }
}