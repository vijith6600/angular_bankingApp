import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //properties / variable

  aim = 'your perfect banking partner'
  account = 'account number here'

  //to hold uswe account number
  // acno = ""

  // pass = ""

  // userDetails:any = {
  //   1000: { acno: 1000, userName: 'max', password: 1000, balance: 5000 },
  //   1001: { acno: 1001, userName: 'anu', password: 1001, balance: 7000 },
  //   1002: { acno: 1002, userName: 'athul', password: 1002, balance: 6000 },

  // }


  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  // acno: any;
  // pass: any;


  //constructor - Dependency injection
  constructor(private router: Router, private db: DataService, private fb: FormBuilder) { }

  //life cycle hook - angular
  ngOnInit(): void {
  }

  //user defiend function

  // login

  login() {
    var acno = this.loginForm.value.acno
    var pass = this.loginForm.value.pass
    if (this.loginForm.valid){
      this.db.login(acno, pass)
        .subscribe((result: any) => {
          localStorage.setItem("currentUname",JSON.stringify(result.cusername))
          localStorage.setItem("currentAcno",JSON.stringify(result.cusername))
          localStorage.setItem("token",JSON.stringify(result.token))

          alert(result.message)
          this.router.navigateByUrl("home")
        },
          result => {
            alert(result.error.message)
          })
  }
      else {
  alert('incoreect passs')
}
  }
}



  // acnoChange(event: any) {
  //   this.acno = event.target.value
  //   console.log(this.acno);

  // }

  // passChange(event: any) {
  //   this.pass = event.target.value
  //   console.log(this.pass);
  // }
