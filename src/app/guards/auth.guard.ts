import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  let ok = true;

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if(!value) {
        ok = false;
        router.navigate(['login']);
      }
    },
  })

  return ok;
};
