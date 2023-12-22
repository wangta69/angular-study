import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`비트마스크(Bit Mask) 1. 비트연산자 console에서 보셔요`
})
export class BitMaskComponent1 implements AfterViewInit{
  constructor(
  ) {

    this.cal();
   }

  ngAfterViewInit(){
  }

  private cal() {

    // 10진수를 2진수로 바꾸기
    const decimal = 10;
    console.log(decimal.toString(2)); // 1010

    // 2진수를 10진수로
    let binary = '101010';
    console.log(parseInt(binary, 2)) // 42

    // 기본 연산
    binary = '1110';
    console.log(parseInt(binary, 2)) // 42
    // 1. AND(&) 연산
    // 2진수의 각 비트를 & 연산으로 비교한다.
    // 비교되는 두 비트가 모두 1이면 출력되는 비트도 1, 아닌 경우에는 0이다.
    // const result1 = 1110 & 1011;
    // result1 :1010
    const result1 = 14 & 11;
    console.log(result1); // 10
    
    
    

    // 2. OR(|) 연산
    // 2진수의 각 비트를 | 연산으로 비교한다.
    // 비교되는 두 비트 중 하나가 1이면 출력되는 비트도 1, 아닌 경우에는 0이다.
    // const result2 = 1100 | 1010 = 
    // result2 : 1110

    
    // 3. XOR(^) 연산
    // 2진수의 각 비트를 ^ 연산으로 비교한다.
    // 비교되는 두 비트가 다르면 출력되는 비트도 1, 같으면 0이다.
    // const result3 = 1100 ^ 1010 = 
    // result3 : 0110

    

    // 4. NOT(~) 연산
    //2진수의 각 비트를 0이면 1로, 1이면 0으로 반전시킨다.
    // const result4 = ~1010
    // result4 : 0101
    // 5. SHIFT(<<, >>) 연산
    //비트를 각 방향으로 해당 개수만큼 민다
    // const result5 = 001010 << 2;
    // result5 : 101000
    // const result6 = 001010 >> 2 = 
    // result6 : 000010
    

  }
}