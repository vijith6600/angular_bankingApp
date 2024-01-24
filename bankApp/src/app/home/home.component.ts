import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  // name hold
  user = ""


  //deposit group
  deppositForm = this.fb.group({
    amound: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    pass: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //withdrow group
  withdrowForm = this.fb.group({
    amound: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    pass: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds: DataService, private db: DataService, private fb:FormBuilder, private router:Router) {
    this.user = this.db.cusername

    // date
    this.date= new Date()

  }

  ngOnInit(): void {
 //not to return back to home
 if(!localStorage.getItem('currentAcno')){
  alert('please login')
  this.router.navigateByUrl('')
}
  }

  deposit() {
    var acno = this.deppositForm.value.acno
    var pass = this.deppositForm.value.pass
    var amound = this.deppositForm.value.amound
    const result = this.ds.deposit(acno, pass, amound)
    if (this.deppositForm.valid) {
      if (result) {
        alert(`amound ${amound} deposited sucessfully current balance is ${result}`)
      }
      else{
        alert('invalid form')
      }
    }
   
  }

  withdrow() {
    var acno = this.withdrowForm.value.acno
    var pass = this.withdrowForm.value.pass
    var amound = this.withdrowForm.value.amound
    const result = this.db.withdrow(acno, amound, pass)
    if (this.withdrowForm.valid) {
      if (result) {
        alert(`${amound} debited fro  m your accound balance amound ${result}`)
  
      }
      else{
        alert('invalid form')
      }
    }
  
  }


  //logout
  logout(){
    //delete data
    localStorage.removeItem('cusername')
    localStorage.removeItem('cacno')
    // localStorage.removeItem('userDetails')
    console.log("login functon call");
    
    this.router.navigateByUrl('')
  }


  deletebtn(){
    this.acno=JSON.parse(localStorage.getItem('cacno') || "")
  }

  // to hold telete acno
  acno:any


  // to hold Date
  date:any

  // to enty value in acno
  cancel(){
    this.acno=""
  }
}
