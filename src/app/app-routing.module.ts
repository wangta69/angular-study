import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DomComponent1} from './dom-element/step1.component';
import {DomComponent2} from './dom-element/step2.component';
import {DomComponent3} from './dom-element/step3.component';
import {DomComponent4} from './dom-element/step4.component';
import {DomComponent5} from './dom-element/step5.component';
const routes: Routes = [
    { path: 'dome-element/step1', component: DomComponent1 },
    { path: 'dome-element/step2', component: DomComponent2 },
    { path: 'dome-element/step3', component: DomComponent3 },
    { path: 'dome-element/step4', component: DomComponent4 },
    { path: 'dome-element/step5', component: DomComponent5 },
    // {
    //         path: 'game',
    //         loadChildren: () => import('./pages/game/game.module').then((route) => route.GameModule)
    //     },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
