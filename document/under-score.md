#UnderScore

https://underscorejs.org/
```
npm i underscore
npm i @types/underscore --save-dev
```
```
import * as _ from 'underscore'
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
_.find : 조검에 맞는 데이타를 찾을 때 유용합니다.

```
const targetPiece = _.find(this.piecesGroup.children.entries, (piece) =>{
    return piece.posX === posX && piece.posY === posY;
});
```