import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService : AdminService = inject(AdminService)
  const router : Router = inject(Router)

    
    if(adminService.isLoggedIn()){
  
      return true;
    }else{
      router.navigate(['/home']);
      return false;
    }
  

};
