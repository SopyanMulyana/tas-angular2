import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (private authenticationService: AuthenticationService,
                private router: Router){  }
  logout(){
    this.authenticationService.logout();
  }
}
