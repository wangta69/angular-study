import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
* 실행예제
* 1. naverLogin() :  네이버에서 제공하는 로그인 창을 연다.
* 2. 네이버 로그인이 완료되면 callback  url 로 값이 전달되는데 this.callback()이 실행된다.
* <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
*/
declare const naver: any
@Component({
    selector: 'app-login',
    templateUrl: './naver.html',
    styleUrls: [],
})
export class NaverLoginComponent implements OnInit {

    public naverApi: any;
    constructor(

    ) {
        this.naverApi = new naver.LoginWithNaverId({
            clientId: 'Naver Cliend ID',
            callbackUrl: 'Callback URL',  // 네이버 개발자센터에 등록된 callback  url 과 동일하여야 작동한다.
            isPopup: false,
            callbackHandle: true,
        });
        this.naverApi.init();


        this.callback();
    }

    ngOnInit() {

    }

    /**
         * 네이버 로그인
         */
        public naverLogin() {
            this.naverApi.getLoginStatus((status: any) => {
                console.log('naverLogin...status ', status);

                if (!status) {
                    this.naverApi.authorize();
                }
            });
        }


        /**
     * 로그인 callback시 회원정보 등 을 넘긴 후 home으로 redirect
     */
    public callback() {
        console.log('naverLoginFlag....');
        this.naverApi.getLoginStatus((status: any) => {
            console.log('this.naverApi.getLoginStatus >>', status);
            console.log(this.naverApi.user);
            /**
            * email: this.naverApi.user.email,
            * id: this.naverApi.user.id,
            */
        });
    }



}




@NgModule({
    declarations: [
        NaverLoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],

    exports: [
        NaverLoginComponent
    ]
})
export class NaverLoginModule { }
