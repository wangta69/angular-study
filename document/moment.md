#Moment

https://momentjs.com/

```
npm install moment --save
```

component.ts
```
import * as moment from 'moment';

this.ym = moment();
```

format
https://momentjs.com/docs/ >> Year, month, and day tokens
```
moment().format("YYYY"); // 2022
moment().format("YY");   // 22
....
```
```
moment().format("YYYY-MM-DD"); // 2022-03-03
moment().format("YYYY-M-D"); // 2022-3-3
```


