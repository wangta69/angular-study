#GooGle Chart

```
npm i angular-google-charts
```

module.ts
```
import { GoogleChartsModule } from 'angular-google-charts';
.....
@NgModule({
    imports: [
        GoogleChartsModule
        ......
    ],

})

```

component.ts
```
public chart = {
        title: 'Company Performance',
        type: 'PieChart',
        data:  [
            ['Name1', 5.0],
             ['Name2', 36.8],
             ['Name3', 42.8],
             ['Name4', 18.5],
             ['Name5', 16.2]

              ],
        columnNames: ['Language', 'Speakers (millions)'],
        options: {pieHole: 0.5},
        width: 500,
        height: 300
    };
```
template.html
```
<google-chart
  [title]="chart.title"
  [type]="chart.type"
  [data]="chart.data"
  [columns]="chart.columnNames"
  [options]="chart.options"
  [width]="chart.width"
  [height]="chart.height"

>
</google-chart>
```

### LineChart

### CurvedLineChart
```
public chart = {
        title: 'Company Performance',
        type: 'LineChart',
        data:  [
            ['Name1', 5.0],
             ['Name2', 36.8],
             ['Name3', 42.8],
             ['Name4', 18.5],
             ['Name5', 16.2]

              ],
        columnNames: ['Language', 'Speakers (millions)'],
        options: {curveType: 'function'},
        width: 500,
        height: 300
    };
    ```