import {Component, OnInit} from '@angular/core';
import {MainHttpService} from "../../main-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Breed} from "../../models/breed";
import {Item} from "../../models/item";
import {Shop} from "../../models/shop";
import {Order} from "../../models/order";
import {User} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  path = ""
  edit!: Breed | Item | Shop | Order | User
  page!: 'breeds' | 'items' | 'shops' | 'orders' | 'users'

  editForm!: FormGroup


  constructor(public http: MainHttpService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.page = r['page']
    })
    if (this.page === "breeds") {
      this.route.params.subscribe(r => {
        this.http.getOneBreed(r['_id']).subscribe(q => {
          //bad approach, undefined at form , but it works so (╯°□°）╯︵ ┻━┻
          this.edit = q
          this.editForm = new FormGroup({
            _id: new FormControl(this.edit._id, [Validators.required]),
            breed: new FormControl(this.edit.breed, [Validators.required]),
            quantity: new FormControl(this.edit.quantity, [Validators.required]),
            price: new FormControl(this.edit.price, [Validators.required]),
            description: new FormControl(this.edit.description, [Validators.required]),
          })
        })
      })
    } else if (this.page === "items") {
      this.route.params.subscribe(r => {
        this.http.getOneItem(r['_id']).subscribe(q => {
          this.edit = q
          this.editForm = new FormGroup({
            _id: new FormControl(this.edit._id, [Validators.required]),
            itemName: new FormControl(this.edit.itemName, [Validators.required]),
            amount: new FormControl(this.edit.amount, [Validators.required]),
            price: new FormControl(this.edit.price, [Validators.required]),
            description: new FormControl(this.edit.description, [Validators.required]),
          })
        })
      })
    } else if (this.page === "shops") {
      this.route.params.subscribe(r => {
        this.http.getOneShop(r['_id']).subscribe(q => {
          this.edit = q
          this.editForm = new FormGroup({
            _id: new FormControl(this.edit._id, [Validators.required]),
            address: new FormControl(this.edit.address, [Validators.required]),
            name: new FormControl(this.edit.name, [Validators.required]),
          })
        })
      })
    } else if (this.page === "orders") {
      this.route.params.subscribe(r => {
        this.http.getOneOrder(r['_id']).subscribe(q => {
          this.edit = q
          this.editForm = new FormGroup({
            _id: new FormControl(this.edit._id, [Validators.required]),
            user_id: new FormControl(this.edit.user_id, [Validators.required]),
            shop_id: new FormControl(this.edit.shop_id, [Validators.required]),
            items: new FormControl(this.edit.items, [Validators.required]),
          })
        })
      })

    } else if (this.page === 'users') {
      this.route.params.subscribe(r => {
        this.http.getOneUser(r['_id']).subscribe(q => {
          this.edit = q
          this.editForm = new FormGroup({
            _id: new FormControl(this.edit._id, [Validators.required]),
            user: new FormControl(this.edit.user, [Validators.required]),
            role: new FormControl(this.edit.role, [Validators.required]),
            email: new FormControl(this.edit.email, [Validators.required]),
          })
        })
      })

    }
  }

  onSubmit() {
    if (this.page === "breeds") {
      let _id = this.editForm.value._id
      let breed = this.editForm.value.breed
      let quantiy = this.editForm.value.quantity
      let price = this.editForm.value.price
      let description = this.editForm.value.description
      let data: Breed = {breed: breed, quantity: quantiy, price: price, description: description}
      //breaks orders integrity... too bad!
      //#feature!
      this.http.deleteBreed(_id)
      this.http.createBreed(data)
      this.router.navigate(['..'])


    } else if (this.page === "items") {
            let _id = this.editForm.value._id
      let itemName = this.editForm.value.itemName
      let amount = this.editForm.value.amount
      let price = this.editForm.value.price
      let description = this.editForm.value.description
      let data: Item = {itemName: itemName, amount: amount, price: price, description: description}
      this.http.deleteItem(_id)
      this.http.createItem(data)
      this.router.navigate(['..'])

    } else if (this.page === "shops") {
            let _id = this.editForm.value._id
      let address = this.editForm.value.address
      let name = this.editForm.value.name
      let data: Shop = {address: address, name: name}
      this.http.deleteShop(_id)
      this.http.createShop(data)
      this.router.navigate(['..'])

    } else if (this.page === "orders") {

      let _id = this.editForm.value._id
      let user_id = this.editForm.value.user_id
      let shop_id = this.editForm.value.shop_id
      let items = this.editForm.value.items
      let data: Order = {user_id: user_id, shop_id: shop_id, items: items}
      this.http.deleteOrder(_id)
      this.http.createOrder(data)
      this.router.navigate(['..'])

    } else if (this.page === 'users') {

      let _id = this.editForm.value._id
      let user = this.editForm.value.user
      let role = this.editForm.value.role
      let email = this.editForm.value.email
      let password = this.editForm.value.password
      let data: User = {user: user, role: role, email: email, password: password}
      this.http.deleteUser(_id)
      this.http.createUser(data)
      this.router.navigate(['..'])
    }

  }

}
