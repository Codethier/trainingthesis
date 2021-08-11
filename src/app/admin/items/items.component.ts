import { Component, OnInit } from '@angular/core';
import {MainHttpService} from "../../main-http.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public http: MainHttpService) { }

  ngOnInit(): void {
    this.http.getAlllItem()
  }
  delete(_id : string){
    this.http.deleteItem(_id)
  }

}
