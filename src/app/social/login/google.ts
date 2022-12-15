import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
/**
* 실행예제
* 1. naverLogin() :  네이버에서 제공하는 로그인 창을 연다.
* 2. 네이버 로그인이 완료되면 callback  url 로 값이 전달되는데 this.callback()이 실행된다.
*/
declare const naver: any
@Component({
    selector: 'app-login',
    templateUrl: './google.html',
    styleUrls: [],
})
export class GoogleLoginComponent implements OnInit {

    constructor(

    ) {
    }

    ngOnInit() {

    }

    /**
         * 구글 로그인
         */
        public googleLogin() {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result: any) => {
                console.log('result>>', result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user: any = result.user;

                const accessToken = user.accessToken;
                const displayName = user.displayName;
                const email = user.email;
                const phoneNumber = user.phoneNumber;
                const photoURL = user.photoURL;
                const uid = user.uid;
            // ...
            }).catch((error:any) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            });
        }



        /**
        * 다른 곳에서 결과값 받을 경우
        */
        GoogleAuth2(): Promise<any> {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then((result: any) => {
                console.log('result>>', result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user: any = result.user;

                const accessToken = user.accessToken;
                const displayName = user.displayName;
                const email = user.email;
                const phoneNumber = user.phoneNumber;
                const photoURL = user.photoURL;
                const uid = user.uid;

                const response = {
                    accessToken, displayName, email,
                }
                console.log('displayName:',displayName,'email:',email,'phoneNumber:',phoneNumber,'photoURL:',photoURL,'uid:',uid);

                // return new Promise(resolve => {

                        resolve(response);
                // });
            // ...
        }).catch((error: any) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                 reject(error);

            });

        });
  }





}




@NgModule({
    declarations: [
        GoogleLoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],

    exports: [
        GoogleLoginComponent
    ]
})
export class GoogleLoginModule { }
