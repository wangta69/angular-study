# Grammar
https://dinn.github.io/javascript/js-dotdotdot/
## ...
rest parameter or spread operator

### Rest parameter
- argument들이 배열로 함수 내부에 전달된다.
```
function passRestParam(a, b, ...args) {
    console.log(a);
    console.log(b);
    console.log(args);
}
passRestParam(1, 2, 3, 4, 5);
// 1
// 2
// [3, 4, 5]

function passRestParam(a, ...args, b) {
    // syntaxError: Rest parameter must be last formal parameter
}
```

### Spread operator
- 배열이 개별 원소가 된다.
```
let array = [3, 4, 5]

let newArray = [...array];          // [3, 4, 5] // Deep copy의 기능 제공
array.push(...[6, 7]);              // [3, 4, 5, 6, 7]
array.unshift(...[1, 2]);           // [1, 2, 3, 4, 5, 6, 7]

let arr1 = [1, 2];
let arr2 = [6, 7];
let arr3 = [...arr1, 3, arr2];      // [1, 2, 3, 6, 7]
arr3.splice(3, 0, ...[4, 5]);       // [1, 2, 3, 4, 5, 6, 7]
```
```
console.log(1, 2, 3);           // 1 2 3

let arr = [1, 2, 3];
console.log(arr);               // [1, 2, 3]
console.log(...arr);            // 1 2 3
```
```
Math.max(1, 2, 3);                      // 3

let arr = [1, 2, 3];
Math.max(arr);                          // NaN
Math.max.apply(null, arr);              // Math.max(1, 2, 3) -> 3
Math.max(...arr);                       // Math.max(1, 2, 3) -> 3


let array1 = new Array(1, 2, 3);        // [1, 2, 3]
let array2 = new Array.apply(arr);      // Uncaught TypeError: Array.apply is not a constructor
let array3 = new Array(...arr);         // [1, 2, 3]
```

### Rest Property
- 객체를 destructuring 할 때 나머지 프로퍼티를 모아준다.
### Spread Property
- 객체의 각 프로퍼티를 펼친다.
```
let obj = {
  a: 1,
  b: 2,
  x: 3,
  y: 4
}

let {a, b, ...c} = obj;
console.log(a, b, c);           // 1 2 {x: 3, y: 4}

let newObj = {a, b, ...c};
console.log(newObj);            // {a: 1, b: 2, x: 3, y: 4}
```

### rest parameter vs. arguments
```
function sumWithRest(... args) {
    for(let i = 0 ; i < args.length; ++i) console.log(args[i]);
    return args.reduce((acc, cur) => acc + cur);
}
sumWithRest(1, 2, 3, 4);
// 1
// 2
// 3
// 4
// 10        

function sumWithArgs(a, b, c) {
    for(let i = 0; i < arguments.length; ++i) console.log(arguments[i]);
    return arguments.reduce((acc, cur) => acc + cur);
}
sumWithArgs(1, 2, 3, 4);
// 1
// 2
// 3
// 4
// Uncaught TypeError: arguments.reduce is not a function
```

### Destructuring rest parametersPermalink
```
let arr1 = [1, 2, 3];
let [one, two, three] = arr1;
console.log(one, two, three);           // 1 2 3
```
```
function destructuringParam(... [a, b, c]) {
    console.log(a, b, c);
}
destructuringParam(1, 2, 3);         // 1 2 3
```


