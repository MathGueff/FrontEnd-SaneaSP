import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { SweetAlertService } from '../Services/sweetAlert.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected sweetAlertService: SweetAlertService
  ) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getAuthToken();

    if (!token) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.login().pipe(
      map(user => {
        this.authService.setCurrentUser(user);
        return true;
      }),
      catchError((e) => {
        this.showGuardMessage(e.error.message)
        this.authService.logout();
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  private showGuardMessage(message: string) {
    this.sweetAlertService.showMessage(message, true);
  }
}
