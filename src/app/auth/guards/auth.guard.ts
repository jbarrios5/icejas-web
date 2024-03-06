import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

const checkAuthStatus = ():boolean => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    if(!authService.accessToken || !authService.authUser){
        
        
        router.navigateByUrl("/auth")
        return false;
    }
    return true;
}

export const canActiveGuard: CanActivateFn = () =>{
    return checkAuthStatus();
}