import { Component, OnInit } from '@angular/core';
import {MainHttpService} from "../main-http.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public http: MainHttpService) { }

  ngOnInit(): void {
  }

}
