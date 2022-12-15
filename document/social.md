# Social Login

## Access Token vs Refresh Token
소셜 로그인을 다루다 보면 AccessToken, RefreshToken 이라는 용어를 종종 접한다.
이 두가지에 대한 차이점을 알아보자.
### Access Token
유효한 권한을 획득한 클라이언트에게 access token 이 발행된다.
이 토큰은 보통 30분 정도의 lifetime 을 가지면 클라이언트의 정보를 가져온다.

### Refresh Token
refresh Token 은 AccessToken을 가져오는데 사용된다.
보통 100일 정도의  lifetime을 가진다.


로그인 구현시 먼저  refrsh token을 발급받고 이것을 이용하여 access Token 을 발급 받는다. 그리고 Access Token  을 이요하여 회원정보를 획득한다. 일부에서는  refresh  토큰없이  access Token 만을 제공받는데 access Token 은 일시적인것이라 실제  db에는  refresh 토큰을 저장하여 사용하는 것을 추천한다.

# google
https://console.firebase.google.com/ >> Authentication >> Settings >> Domains >> Add domain

```
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
```

# Social Share