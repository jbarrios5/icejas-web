import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "src/app/dashboard/navigation/navigation.component";
import { BalanceReporComponent } from "./pages/balance/balance.component";

const routes: Routes = [
    {
        path:'',
        component:NavigationComponent,
        children:[
            {path:'balance',component:BalanceReporComponent},
            {path:'**',redirectTo:'home'},
        ]

        

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReportRouting{}