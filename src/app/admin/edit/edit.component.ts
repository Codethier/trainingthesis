import {Component, OnInit} from '@angular/core';
import {MainHttpService} from "../../main-http.service";
import {ActivatedRoute} from "@angular/router";
import {Breed} from "../../models/breed";
import {Item} from "../../models/item";
import {Shop} from "../../models/shop";
import {Order} from "../../models/order";
import {User} from "../../models/user";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  path = ""
  edit!: Breed | Item | Shop | Order | User
  page!: 'breeds' | 'items' | 'shops' | 'orders' | 'users'


  constructor(public http: MainHttpService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.page = r['page']
    })
    if (this.page === "breeds") {
      this.route.params.subscribe(r => {
        this.http.getOneBreed(r['_id']).subscribe(q => this.edit = q)
      })
    } else if (this.page === "items") {
      this.route.params.subscribe(r => {
        this.http.getOneItem(r['_id']).subscribe(q => this.edit = q)
      })
    } else if (this.page === "shops") {
      this.route.params.subscribe(r => {
        this.http.getOneShop(r['_id']).subscribe(q => this.edit = q)
      })
    } else if (this.page === "orders") {
      this.route.params.subscribe(r => {
        this.http.getOneOrder(r['_id']).subscribe(q => this.edit = q)
      })

    } else if (this.page === 'users') {
      this.route.params.subscribe(r => {
        this.http.getOneUser(r['_id']).subscribe(q => this.edit = q)
      })

    }
  }

}
