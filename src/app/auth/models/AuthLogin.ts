/** interfaces para el post auth */
export interface AuthPostResData{
    data:AuthPostRes
}

export interface AuthPostRes{
    user:User
    authLogin:AuthLogin
}

export interface User{
    id:number,
    name:string,
    document:string,
    lastName:string,
    role:string
}

export interface AuthLogin{
    accessToken:string 
    
}
/** interfaces para la request auth */
export interface AuthPostReqData{
    data:AuthPostReq
}
export interface AuthPostReq{
    password:string,
    document:string
}