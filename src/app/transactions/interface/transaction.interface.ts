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

export interface TransactionDetailGetResData{
    data:TransactionDetailGetRes;
}

export interface TransactionDetailGetRes{
    details:TransactionDetails []   

}
export interface TransactionDetails{
    transactionId:number;
    amount:number;
    transactionTypeName:string;
    transactionCategory:string;
    currentBalance:number;
    transactionDetail:string;
    registeredDate:string;
}

export interface TransactionReportGetResData{
    data: TransactionReportGetRes []
}
export interface TransactionReportGetRes{
    totalDebit:number;
    totalCredit:number;
    month:number
}
