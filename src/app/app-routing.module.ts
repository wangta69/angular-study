import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DomComponent1} from './dom-element/step1.component';
import {DomComponent2} from './dom-element/step2.component';
import {DomComponent3} from './dom-element/step3.component';
import {DomComponent4} from './dom-element/step4.component';
import {DomComponent5} from './dom-element/step5.component';
import {CanvasComponent1} from './canvas/step1.component';
import {CanvasComponent2} from './canvas/step2.component';
import {CanvasComponent3} from './canvas/step3.component';
import {CanvasComponent4} from './canvas/step4.component';
import {CanvasComponent5} from './canvas/step5.component';

const routes: Routes = [
    { path: 'dome-element/step1', component: DomComponent1 },
    { path: 'dome-element/step2', component: DomComponent2 },
    { path: 'dome-element/step3', component: DomComponent3 },
    { path: 'dome-element/step4', component: DomComponent4 },
    { path: 'dome-element/step5', component: DomComponent5 },
    { path: 'canvas/step1', component: CanvasComponent1 },
    { path: 'canvas/step2', component: CanvasComponent2 },
    { path: 'canvas/step3', component: CanvasComponent3 },
    { path: 'canvas/step4', component: CanvasComponent4 },
    { path: 'canvas/step5', component: CanvasComponent5 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
