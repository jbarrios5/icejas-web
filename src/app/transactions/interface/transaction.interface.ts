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
    details:string,
    registerDate:string

}

export interface TransactionType{
    id:number,
    description:string,
    category:string,
    created:string
}
export interface TransactionTypePosResData{
    data:TransactionTypePosRes
}
export interface TransactionTypePosRes{
    transactionTypes:TransactionType[]
}

export interface TransactionPostResData{
    data:TransactionPostRes
}
export interface TransactionPostRes{
    transactionId:number,
    message:string,
    status:number
}