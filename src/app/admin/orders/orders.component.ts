import { Component, OnInit } from '@angular/core';
import {MainHttpService} from "../../main-http.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  filter = ""
  constructor(public http: MainHttpService) { }

  ngOnInit(): void {
    this.http.getAlllOrder()
  }
  delete(_id : string){
    this.http.deleteOrder(_id)
  }

}
