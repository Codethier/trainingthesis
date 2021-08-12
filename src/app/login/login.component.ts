import {Component, OnInit, DoCheck} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainHttpService} from "../main-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck  {


  loginForm = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('dancIng_HotDogz',[Validators.required])
  })

  constructor(public http: MainHttpService, public router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm)
    let username = this.loginForm.value.username
    let password = this.loginForm.value.password
    this.http.login(username,password)
  }
  ngDoCheck() {
    if (this.http.token){
      this.router.navigate(['/admin','breeds']).then(r => (r))
    }
  }
}
