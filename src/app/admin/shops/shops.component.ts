import { Component, OnInit } from '@angular/core';
import {MainHttpService} from "../../main-http.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  constructor(public http: MainHttpService) { }

  ngOnInit(): void {
    this.http.getAlllShop()
  }
  delete(_id : string){
    this.http.deleteShop(_id)
  }

}
