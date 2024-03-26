import { MONTHS } from "src/app/constants/icejas-constants"

export function buildStartMonth(startMonth:string): string{
    if(!startMonth || startMonth.length === 0)
        return "2024-01-01"
    const index = MONTHS.findIndex(m => m == startMonth)
    const firstDay = new Date(new Date().getFullYear(), index, 1);
    return firstDay.toISOString().split('T')[0];
}

export function buildEndMonth(endMonth:string): string{
    let month;
    
    if(!endMonth || endMonth.length === 0)
        month = new Date().getMonth();
    else    
        month = MONTHS.findIndex(m => m == endMonth)
    
    const firstDay = new Date(new Date().getFullYear(), month +1, 0);
    return firstDay.toISOString().split('T')[0];
}