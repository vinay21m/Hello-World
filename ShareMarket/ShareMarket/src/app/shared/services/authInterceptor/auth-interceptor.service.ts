import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';

import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private modalOptions: NgbModalOptions;
  constructor(private _tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'login-backdrop',
      keyboard: false,
      ariaDescribedBy: 'modal-basic-title',
      animation: true,
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._tokenStorageService.getToken();

    if (!!token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json; charset=utf-8')
      });
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.clear();
            this.authService.logout();
            this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
          }
        }
      }));
  }
}
