import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./models/user"
import {Breed} from "./models/breed";
import {Item} from "./models/item";
import {Order} from "./models/order";
import {Shop} from "./models/shop";

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {


  domain = 'http://localhost:8080/'
  token!: { access_token: string, token_type: string }
  auth_obj!: { [name: string]: string | string[] }
  all_breed!: Breed[]
  all_user!:  User[]
  all_item!: Item[]
  all_order!: Order[]
  all_shop!: Shop[]

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    this.http.post<{ access_token: string, token_type: string }>(this.domain + 'auth/token', {username: username, password: password}).subscribe(r => {
      this.token = r
      this.auth_obj = {'authorization': this.token.token_type + " " + this.token.access_token}
    })
  }

  //wrong approach shoulda just implemented refresh and rest return a sub
  createBreed(breed: Breed) {
    this.http.post(this.domain + 'breed/create', breed, {headers: new HttpHeaders(this.auth_obj)}).subscribe()
  }

  getAlllBreed() {
    this.http.get<Breed[]>(this.domain + 'breed/all', {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => {
      this.all_breed = r
    })
  }

  getOneBreed(_id: string) {
    return this.http.get<Breed>(this.domain + 'breed' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)})
  }

  deleteBreed(_id: string) {
    return this.http.delete<Breed>(this.domain + 'breed' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => this.getAlllBreed())
  }

  createUser(user: User) {
    this.http.post(this.domain + 'user/create', user, {headers: new HttpHeaders(this.auth_obj)}).subscribe()
  }

  getAlllUser() {
    this.http.get<User[]>(this.domain + 'user/all', {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => {
      this.all_user = r
    })
  }

  getOneUser(_id: string) {
    return this.http.get<User>(this.domain + 'user' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)})
  }

  deleteUser(_id: string) {
    return this.http.delete<User>(this.domain + 'user' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => this.getAlllUser())
  }

  createItem(Item: Item) {
    this.http.post(this.domain + 'item/create', Item, {headers: new HttpHeaders(this.auth_obj)}).subscribe()
  }

  getAlllItem() {
    this.http.get<Item[]>(this.domain + 'item/all', {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => {
      this.all_item = r
    })
  }

  getOneItem(_id: string) {
    return this.http.get<Item>(this.domain + 'item' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)})
  }

  deleteItem(_id: string) {
    return this.http.delete<Item>(this.domain + 'item' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => this.getAlllItem())
  }

  createOrder(order: Order) {
    this.http.post(this.domain + 'order/create', order, {headers: new HttpHeaders(this.auth_obj)}).subscribe()
  }

  getAlllOrder() {
    this.http.get<Order[]>(this.domain + 'order/all', {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => {
      this.all_order = r
    })
  }

  getOneOrder(_id: string) {
    return this.http.get<Order>(this.domain + 'order' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)})
  }

  deleteOrder(_id: string) {
    return this.http.delete<Order>(this.domain + 'order' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => this.getAlllOrder())
  }

  createShop(shop: Shop) {
    this.http.post(this.domain + 'shop/create', shop, {headers: new HttpHeaders(this.auth_obj)}).subscribe()
  }

  getAlllShop() {
    this.http.get<Shop[]>(this.domain + 'shop/all', {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => {
      this.all_shop = r
    })
  }

  getOneShop(_id: string) {
    return this.http.get<Shop>(this.domain + 'shop' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)})
  }

  deleteShop(_id: string) {
    return this.http.delete<Shop>(this.domain + 'shop' + '/' + _id, {headers: new HttpHeaders(this.auth_obj)}).subscribe(r => this.getAlllShop())
  }
}
