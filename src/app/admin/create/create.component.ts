import {Component, OnInit, DoCheck} from '@angular/core';
import {MainHttpService} from "../../main-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Breed} from "../../models/breed";
import {Item} from "../../models/item";
import {Shop} from "../../models/shop";
import {Order} from "../../models/order";
import {User} from "../../models/user";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  editFormBreeds = new FormGroup({

    breed: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    price: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  })
  editFormItems = new FormGroup({

    itemName: new FormControl(null,[Validators.required]),
    amount: new FormControl(null,[Validators.required]),
    price: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  })
  editFormShops = new FormGroup({

    address: new FormControl(null,[Validators.required]),
    name: new FormControl(null,[Validators.required]),
  })
  editFormOrders = new FormGroup({

    user_id: new FormControl(null,[Validators.required]),
    shop_id: new FormControl(null,[Validators.required]),
    items: new FormControl(null,[Validators.required]),
  })
  editFormUsers = new FormGroup({

    user: new FormControl(null,[Validators.required]),
    role: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
  })
  radio: 'breeds' | 'items' | 'shops' | 'orders' | 'users' = "breeds"

  constructor(public http: MainHttpService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.radio === "breeds") {
      let breed = this.editFormBreeds.value.breed
      let quantiy = this.editFormBreeds.value.quantity
      let price = this.editFormBreeds.value.price
      let description = this.editFormBreeds.value.description
      let data: Breed = {breed: breed, quantity: quantiy, price: price, description: description}
      this.http.createBreed(data)
      this.router.navigate(['..'])


    } else if (this.radio === "items") {
      let itemName = this.editFormItems.value.itemName
      let amount = this.editFormItems.value.amount
      let price = this.editFormItems.value.price
      let description = this.editFormItems.value.description
      let data: Item = {itemName: itemName, amount: amount, price: price, description: description}
      this.http.createItem(data)
      this.router.navigate(['..'])

    } else if (this.radio === "shops") {
      let address = this.editFormShops.value.address
      let name = this.editFormShops.value.name
      let data: Shop = {address: address, name: name}
      this.http.createShop(data)
      this.router.navigate(['..'])

    } else if (this.radio === "orders") {

      let user_id = this.editFormOrders.value.user_id
      let shop_id = this.editFormOrders.value.shop_id
      let items = this.editFormOrders.value.items
      let data: Order = {user_id: user_id, shop_id: shop_id, items: items}
      this.http.createOrder(data)
      this.router.navigate(['..'])

    } else if (this.radio === 'users') {

      let user = this.editFormUsers.value.user
      let role = this.editFormUsers.value.role
      let email = this.editFormUsers.value.email
      let password = this.editFormUsers.value.password
      let data: User = {user: user, role: role, email: email, password: password}
      this.http.createUser(data)
      this.router.navigate(['..'])
    }

  }

}
