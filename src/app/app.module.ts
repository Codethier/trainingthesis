import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { BreedsComponent } from './admin/breeds/breeds.component';
import { ItemsComponent } from './admin/items/items.component';
import { ShopsComponent } from './admin/shops/shops.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { EditComponent } from './admin/edit/edit.component';
import { CreateComponent } from './admin/create/create.component';
import { FilterPipe } from './admin/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    BreedsComponent,
    ItemsComponent,
    ShopsComponent,
    OrdersComponent,
    UsersComponent,
    EditComponent,
    CreateComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
