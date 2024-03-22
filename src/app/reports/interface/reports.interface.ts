export interface MonthSummaryGetResData {
    months:MonthSummaryGetRes[],
    totalSum:number
}
export interface MonthSummaryGetRes {
    totalDebit:number;
    totalCredit:number;
    month:number,
    totalSum:number
}