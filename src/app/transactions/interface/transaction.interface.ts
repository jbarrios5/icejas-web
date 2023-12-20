import { Church } from "./church.interface"

export interface TransactionPostReqData {
    data:TransactionPostReq
}

export interface TransactionPostReq{
    transaction:Transaction,
    transactionType:TransactionType,
    userId:number,
    church:Church
}

export interface Transaction{
    id:number,
    amount:number,
    details:string

}

export interface TransactionType{
    id:number,
    description:string,
    category:string,
    created:string
}
