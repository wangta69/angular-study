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
import {CanvasComponent6} from './canvas/step6.component';
import {SoundComponent1} from './sounds/step1.component';
import {CanvasEffectComponent1} from './canvas-effect/step1.component';
import {CanvasEffectComponent2} from './canvas-effect/step2.component';
import {CanvasEffectComponent3} from './canvas-effect/step3.component';
import {CanvasEffectComponent4} from './canvas-effect/step4.component';
import {CanvasEffectComponent5} from './canvas-effect/step5.component';
import {CanvasEffectComponent6} from './canvas-effect/step6.component';
import {GsapComponent} from './gsap/step1.component';
import {RxjsComponent1} from './rxjs/subject.component';
import {RxjsComponent2} from './rxjs/subject2.component';
import {RxjsComponent3} from './rxjs/subject3.component';
import { BroadCastToService } from './rxjs/subject-broadcast-to-service.component';
import { BroadCastToWindow } from './rxjs/subject-broadcast-to-window.component';

import { JoystickComponent } from './tools/joystick.component';

import {XmlComponent1} from './xml/step1.component';

import { HammerComponent } from './mouse-keyboard-event/hammerjs.component';
import { KeyboardComponent } from './mouse-keyboard-event/keyboard.component';
import { MouseComponent } from './mouse-keyboard-event/mouse.component';
import { TouchComponent } from './mouse-keyboard-event/touch.component';

import { IndexDbComponent } from './indexdb/component';

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
    { path: 'canvas/step6', component: CanvasComponent6 },
    { path: 'canvas-effect/step1', component: CanvasEffectComponent1 },
    { path: 'canvas-effect/step2', component: CanvasEffectComponent2 },
    { path: 'canvas-effect/step3', component: CanvasEffectComponent3 },
    { path: 'canvas-effect/step4', component: CanvasEffectComponent4 },
    { path: 'canvas-effect/step5', component: CanvasEffectComponent5 },
    { path: 'canvas-effect/step6', component: CanvasEffectComponent6 },
    { path: 'gsap', component: GsapComponent },
    { path: 'sounds/step1', component: SoundComponent1 },
    { path: 'rxjs/subject', component: RxjsComponent1 },
    { path: 'rxjs/subject2', component: RxjsComponent2 },
    { path: 'rxjs/subject3', component: RxjsComponent3 },
    { path: 'rxjs/sample/service/broadcast', component: BroadCastToService },
    { path: 'rxjs/sample/window/broadcast', component: BroadCastToWindow },
    { path: 'xml/step1', component: XmlComponent1 },
    { path: 'tools/joystick', component: JoystickComponent },
    { path: 'event/hammer', component: HammerComponent },
    { path: 'event/keyboard', component: KeyboardComponent },
    { path: 'event/mouse', component: MouseComponent },
    { path: 'event/touch', component: TouchComponent },
    { path: 'indexdb', component: IndexDbComponent },
    {
        path: 'social/share/kakao',
        loadChildren: () => import('./social/share/kakao').then(m => m.KakaoShareModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
