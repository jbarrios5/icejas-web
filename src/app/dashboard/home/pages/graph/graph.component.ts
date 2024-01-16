import { Component, OnInit } from "@angular/core";
import { ChartConfiguration } from "chart.js";

@Component({
    selector: 'graph-page',
    templateUrl: './graph.component.html'
  })
export class GraphComponent implements OnInit{
    
    
    ngOnInit(): void {
        
    }
    title = 'Movimientos';

    public barChartLegend = true;
    public barChartPlugins = [];
  
    public barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ],
      datasets: [
        { data: [ 1000000, 1500000, 1300000, 1100000, 1900000, 3000000, 1300000,1300000,1300000,1300000,1300000,1300000 ], label: 'Egreso' },
        { data: [ 1000000, 2300000, 2000000, 2200000, 2500000, 2400000, 2900000,2900000,2900000,2900000,2900000,2800000 ], label: 'Ingreso' }
      ]
    };
  
    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 18
                    }
                }
            }
        }
    };
  
    constructor() {
    }


    
}