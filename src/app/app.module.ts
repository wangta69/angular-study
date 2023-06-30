import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DomComponent1} from './dom-element/step1.component';
import {DomComponent2} from './dom-element/step2.component';
import {DomComponent3} from './dom-element/step3.component';
import {DomComponent4} from './dom-element/step4.component';
import {DomComponent5} from './dom-element/step5.component';
import {HighlightDirective} from './dom-element/step2.highlight.directive';

import {CanvasComponent1} from './canvas/step1.component';
import {CanvasComponent2} from './canvas/step2.component';
import {CanvasComponent3} from './canvas/step3.component';
import {CanvasComponent4} from './canvas/step4.component';
import {CanvasComponent5} from './canvas/step5.component';
import {CanvasComponent6} from './canvas/step6.component';

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
import { EventService } from './rxjs/event.service';
import { BroadCastToService } from './rxjs/subject-broadcast-to-service.component';
import { SubscribeModule } from './rxjs/subject-subscribe-from-service.component';
import { BroadCastToWindow } from './rxjs/subject-broadcast-to-window.component';
import { SubscribeWindowModule } from './rxjs/subject-subscribe-from-window.component';
import { SoundComponent1 } from './sounds/step1.component';
import { XmlComponent1 } from './xml/step1.component';

import { HammerComponent } from './mouse-keyboard-event/hammerjs.component';
import { KeyboardComponent } from './mouse-keyboard-event/keyboard.component';
import { MouseComponent } from './mouse-keyboard-event/mouse.component';
import { TouchComponent } from './mouse-keyboard-event/touch.component';

import { JoystickComponent } from './tools/joystick.component';
import { IndexDbComponent } from './indexdb/component';

import { AnimationFrameComponent1 } from './animation-frame/step1.component';
import { AnimationFrameComponent2 } from './animation-frame/step2.component';
@NgModule({
  declarations: [
    AppComponent,
    DomComponent1,
    DomComponent2,
    DomComponent3,
    DomComponent4,
    DomComponent5,
    HighlightDirective,
    CanvasComponent1,
    CanvasComponent2,
    CanvasComponent3,
    CanvasComponent4,
    CanvasComponent5,
    CanvasComponent6,
    SoundComponent1,
    CanvasEffectComponent1,
    CanvasEffectComponent2,
    CanvasEffectComponent3,
    CanvasEffectComponent4,
    CanvasEffectComponent5,
    CanvasEffectComponent6,
    RxjsComponent1,
    RxjsComponent2,
    RxjsComponent3,
    BroadCastToService,
    BroadCastToWindow,
    XmlComponent1,
    GsapComponent,
    JoystickComponent,
    HammerComponent,
    KeyboardComponent,
    MouseComponent,
    TouchComponent,
    IndexDbComponent,
    AnimationFrameComponent1,
    AnimationFrameComponent2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SubscribeModule,
    SubscribeWindowModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
