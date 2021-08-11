import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {BreedsComponent} from "./admin/breeds/breeds.component";
import {ItemsComponent} from "./admin/items/items.component";
import {ShopsComponent} from "./admin/shops/shops.component";
import {OrdersComponent} from "./admin/orders/orders.component";
import {UsersComponent} from "./admin/users/users.component";
import {EditComponent} from "./admin/edit/edit.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'breeds', component: BreedsComponent},
      {path: 'items', component: ItemsComponent},
      {path: 'shops', component: ShopsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'users', component: UsersComponent},
      {path: ':page/:_id', component: EditComponent}
    ]
  },
  {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
