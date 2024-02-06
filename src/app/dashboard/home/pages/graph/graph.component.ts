import { Component, OnInit } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { DashboardService } from "src/app/dashboard/service/dashboard.service";
import { TransactionReportGetRes, TransactionReportGetResData } from "src/app/transactions/interface/transaction.interface";

@Component({
    selector: 'graph-page',
    templateUrl: './graph.component.html'
  })
export class GraphComponent implements OnInit{
    
    constructor(private dashboardService:DashboardService) {
    }


    ngOnInit(): void {
        this.getReport();
    }
    title = 'Movimientos';
    totalsCredit:number[] = [ 0,0, 0, 0, 0, 0, 0,0,0,0,0,0 ];
    totalsDebit:number[] = [ 0,0, 0, 0, 0, 0, 0,0,0,0,0,0 ];
    public barChartLegend = true;
    public barChartPlugins = [];
  
    public barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ],
      datasets: [
        { data:this.totalsDebit , label: 'Egreso',backgroundColor: '#198754',borderColor: 'red' },
        { data: this.totalsCredit, label: 'Ingreso' ,backgroundColor: '#0d6efd'}
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

    getReport(): void {
        if (!this.dashboardService.transactionReportGetResData) 
            return;
        this.dashboardService.transactionReportGetResData.data.forEach(re => {
            this.totalsCredit[re.month - 1] = re.totalCredit
            this.totalsDebit[re.month - 1] = re.totalDebit
        })
        this.updateBarcharData()
    }

    updateBarcharData():void{
        this.barChartData.datasets = [
            { data:this.totalsDebit , label: 'Egreso',backgroundColor: '#198754',borderColor: 'red' },
            { data: this.totalsCredit, label: 'Ingreso' ,backgroundColor: '#0d6efd'}
          ]
    }
  
    

    
}