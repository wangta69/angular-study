#UnderScore

https://underscorejs.org/
```
npm i underscore
npm i @types/underscore --save-dev
```
```
import * as _ from 'underscore';
```

_.map : 데이타를 재가공할 때 유용하다.
return 을 통하여 제 가공된  데이타를 입력받는다.
```
this.maps = _.map([object], (map, i) => {
    return this.unlocks[i] !== undefined ? true : false;
});
```
```
_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
_.map([[1, 2], [3, 4]], _.first);
=> [1, 3]
```
_.each 전체데이타를 처리할 때 유용하다.
```
_.each(this.boxesByColor, (color, i) => {
    if (color) {
        _.each(color, (sprite, j) => {
            console.log(sprite);
        })
    }
});
```
_.find : 조건에 맞는 데이타를 찾을 때 유용합니다.
조건에 맞는 첫번째 값만을 리턴한다.

```
const targetPiece = _.find(this.piecesGroup.children.entries, (piece) =>{
    return piece.posX === posX && piece.posY === posY;
});

const even = _.find([1, 2, 3, 4, 5, 6], (num: number) => { return num % 2 == 0; });
=> 2
```
_.filter: 조건에 맞는 모든 데이타를 리턴한다.
```
const evens = _.filter([1, 2, 3, 4, 5, 6], (num: number) => { return num % 2 == 0; });
=> [2, 4, 6]
```

```
const numbers = [10, 5, 100, 2, 1000];
_.min(numbers);
=> 2

const obj = [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 2}]
const max = _.max(obj, (o: any) => {return o.y;});
=> {x:1, y:3}
```
_.shuffle : 배열을 랜덤하게 섞을때
```
const position = _.shuffle([50, 150, 250, 350, 450, 550]);
```