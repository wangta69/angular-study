# Routing
다른 모듈을 import 하여 사용하는 경우
```
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```
components 를 직접 호출하는 경우, 이 경우는  components가 module 에서  declear  되어야 한다.
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    },
    { path: 'home', component: HomePage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule {}
```
위의 경우는 둘다 모듈에서 별도의 routing.module.ts를 분리한 경우이다.
이럴경우는 모듈에서 import 과정을 거쳐야 한다.
```
import { RoutingModule } from './routing.module';
@NgModule({
  imports: [
    RoutingModule,

  ],

```
module에서 바로 처리하는 방법
```
import { RouterModule } from '@angular/router';
import { NoticePage } from './notice.page';
import { NoticeViewPage } from './notice.view.page';
@NgModule({
  imports: [
    RouterModule.forChild([
        { path: '', component: NoticePage},
        { path: 'view/:id', component: NoticeViewPage},
    ]),
    MatIconModule
  ],
```