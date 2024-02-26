export interface ChurchGetResData{
    data:ChurchGetRes
}
export interface ChurchGetRes{
    church:Church
}
export interface Church{
    id:number,
    name:string,
    currentBalance:number,
    created:string
}