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
```
this.maps = _.map([object], (map, i) => {
    return this.unlocks[i] !== undefined ? true : false;
});
```