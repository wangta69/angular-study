import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import {SoundComponent1} from './sounds/step1.component';


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
    SoundComponent1,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
