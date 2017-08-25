import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LineChartModule } from './modules/linechart';//LineChartPowerLadderModule
import { MaterialModule }		from '@angular/material';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //templateUrl: './pages/linechart.html',
  template: `<div>
  <line-chart id="powerLadderChart" name="powerLadderChart" [chartData]="powerLadderChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart id="ladderChart" name="ladderChart" [chartData]="ladderChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart id="dariChart" name="dariChart" [chartData]="dariChartData" (click)="chStatusAtutoTabs()"></line-chart>

  </div>
  <div>

  </div>
  <!--

  <line-chart width="100%" name="dariChart" [chartData]="dariChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart width="100%" name="snailChart" [chartData]="snailChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart width="100%" name="powerballChart" [chartData]="powerballChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart width="100%" name="tongkyChart" [chartData]="tongkyChartData" (click)="chStatusAtutoTabs()"></line-chart>
  <line-chart width="100%" name="lowhighChart" [chartData]="lowhighChartData" (click)="chStatusAtutoTabs()"></line-chart>
  -->
  <div id="chartTooltip" class="chart_tooltip hidden"><p class="desc"></p></div>
`
})
export class AppComponent {
  title = 'app';
  powerLadderChartData = {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }


  ladderChartData= {
      legend:[{text:"ladder좌4홀", color:"#3498db"}, {text:"ladder우3홀", color:"#2980b9"}, {text:"ladder좌3짝", color:"#e74c3c"}, {text:"ladder우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"ladder우4짝"}, {turn:195, count:60, text:"ladder좌3짝"},{turn:194, count:30, text:"ladder좌4홀"},{turn:193, count:40, text:"ladder좌4홀"},{turn:192, count:51, text:"ladder좌3짝"}]
  }
  dariChartData= {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }
  /*
  snailChartData= {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }
  powerballChartData= {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }
  tongkyChartData= {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }
  lowhighChartData= {
      legend:[{text:"좌4홀", color:"#3498db"}, {text:"우3홀", color:"#2980b9"}, {text:"좌3짝", color:"#e74c3c"}, {text:"우4짝", color:"#c0392b"}]
      ,values:[{turn:196, count:51, text:"우4짝"}, {turn:195, count:60, text:"좌3짝"},{turn:194, count:30, text:"좌4홀"},{turn:193, count:40, text:"좌4홀"},{turn:192, count:51, text:"좌3짝"}]
  }
*/

  chStatusAtutoTabs(){
      console.log("chStatusAtutoTabs");

  };

}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
