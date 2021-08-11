import { Component, OnInit } from '@angular/core';
import {MainHttpService} from "../../main-http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.scss']
})
export class BreedsComponent implements OnInit {

  constructor(public http: MainHttpService) { }

  ngOnInit(): void {
    this.http.getAlllBreed()
  }
  delete(_id : string){
    this.http.deleteBreed(_id)
  }

}
