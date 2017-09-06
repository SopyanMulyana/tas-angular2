import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username;
  userRole;

  constructor (private authenticationService: AuthenticationService,
                private router: Router){ 
                  var user = JSON.parse(localStorage.getItem('currentUser'));
                  this.username = user.username;
                  this.userRole = user.role;
                }
  
  logout(){
    this.authenticationService.logout();
  }
}
