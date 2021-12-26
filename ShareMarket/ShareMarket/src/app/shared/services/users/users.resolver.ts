import { Observable } from 'rxjs';
import { UserService } from 'src/app/authentication/services/user.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GetUserListWithCompanyAccessResolver implements Resolve<any> {
  constructor(private _users: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._users.getUserListWithCompanyAccess();
  }
}
