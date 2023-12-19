import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "../dashboard/navigation/navigation.component";
import { TransactionsComponent } from "./transactions.component";

const routes: Routes = [
    {
        path:'',
        component:NavigationComponent,
        children:[
            {path:'add',component:TransactionsComponent},
            {path:'**',redirectTo:'home'},
        ]

        

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransactionRouting{}