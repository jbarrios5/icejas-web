import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

const checkAuthStatus = ():boolean => {
    const router: Router = inject(Router);
    const at = localStorage.getItem("accessToken")
    if(!at || at.length === 0){
        router.navigateByUrl("/auth")
        return false;
    }
    return true;
}

export const canActiveGuard: CanActivateFn = () =>{
    return checkAuthStatus();
}