import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

const checkAuthStatus = ():boolean => {
    const router: Router = inject(Router);
    const result =true
    
    if(!localStorage.getItem("accessToken")){
        router.navigateByUrl("/auth")
        return false;
    }
    return true;
}

export const canActiveGuard: CanActivateFn = () =>{
    return checkAuthStatus();
}