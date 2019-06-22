import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AngularFireObject } from 'angularfire2/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private authService : AuthService,private userService : UserService) { }

  canActivate(): boolean{
    return true;
  //   return this.authService.appUser$.map(appUser => appUser.isAdmin);
  } 

}
