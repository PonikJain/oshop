import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(userService : UserService,auth : AuthService, router : Router){
    auth.user$.subscribe(user => {
      if(user){
        userService.save(user);
        router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    })
  }

}
