import { Component, OnInit, NgModule, Input, Output,EventEmitter, Injector, ElementRef,  OnChanges, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>  index.html
declare const Kakao: any
@Component({
    selector: 'app-tarrot',
    templateUrl: './kakao.html',
    styleUrls: [],
})
export class KakaoShareComponent implements OnInit {


    constructor(

    ) {
        Kakao.init('9e58cd655ecce87ec7ac35a654b52d1b'); // 자바스크립트 키
    }

    ngOnInit() {
        Kakao.Link.createDefaultButton({
            container: '#btnKakao', // HTML에서 작성한 ID값
            objectType: 'feed',
            content: {
                title: "공유 테스트", // 보여질 제목
                description: "test", // 보여질 설명
                imageUrl: '', // 콘텐츠 URL
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            }
        });
    }


    public socialShare1() {
        // 카카오링크 버튼 생성
        Kakao.Link.createDefaultButton({
            container: '#btnKakao', // HTML에서 작성한 ID값
            objectType: 'feed',
            content: {
                title: "공유 테스트", // 보여질 제목
                description: "test", // 보여질 설명
                imageUrl: '', // 콘텐츠 URL
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            }
        });
    }

    public socialShare() {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '딸기 치즈 케익',
                description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
                imageUrl:
                'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                    // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com',
                },
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845,
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com',
                    },
                },{
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com',
                    },
                },
            ],
        });
    }



}




@NgModule({
    declarations: [
        KakaoShareComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: KakaoShareComponent}
        ]),
    ],

    exports: [
        KakaoShareComponent
    ]
})
export class KakaoShareModule { }
