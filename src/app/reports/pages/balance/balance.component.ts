import { Component } from "@angular/core";
import {MONTHS} from "../../../constants/icejas-constants"

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
  })
export class BalanceReporComponent{
  public months:string[] = MONTHS;


}