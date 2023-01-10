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

Manipulating Dates
```
moment().add(7, 'days');    // 현재 날짜에 7일을 더한다
moment().add(7, 'months');  // 현재 날짜에 7개월을 더한다
moment().add(7, 'years');   // 현재 날짜에 7년을 더한다
```

Time From Now
```
moment('2020.01.01', 'YYYY.MM.DD').fromNow(); // 9 days ago
moment('2020.01.01', 'YYYY.MM.DD').fromNow(true); // 9 days
```

Calculating the Difference Between Dates
```
const dateB = moment('2019-11-11');
const dateC = moment('2019-10-11');

console.log(`Difference is ${dateB.diff(dateC)} milliseconds`); // Difference is 2678400000 milliseconds
console.log(`Difference is ${dateB.diff(dateC, 'days')} day(s)`); // Difference is 31 day(s)
console.log(`Difference is ${dateB.diff(dateC, 'weeks')} week(s)`); // Difference is 4 week(s)
console.log(`Difference is ${dateB.diff(dateC, 'months')} month(s)`); // Difference is 1 month(s)
```
나이구하기
```
const birth = '19900909';
const age = moment().diff(moment(birth).format('YYYYMMDD'), 'years');
```


