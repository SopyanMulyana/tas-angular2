import { Component, OnInit } from '@angular/core';

import { ListUserService } from "../../services/list-user.service";

@Component({
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {
  users;
  constructor(private listUserService: ListUserService) {
    console.log(listUserService.getUsers());
    this.users = listUserService.getUsers();
  }

  ngOnInit() {
 
  }

}
