import {Component, OnInit} from '@angular/core';
import {MainHttpService} from "../../main-http.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public http: MainHttpService) {
  }

  ngOnInit(): void {
    this.http.getAlllUser()
  }

  delete(_id: string) {
    this.http.deleteUser(_id)
  }

}
