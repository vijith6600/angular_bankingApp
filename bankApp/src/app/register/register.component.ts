import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  //register - model
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  //register
  register() {
    if (this.registerForm.get('uname')?.errors) {
      console.log('invalid uname');

    }

    console.log(this.registerForm);

    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pass = this.registerForm.value.pass


    if (this.registerForm.valid) {
      //call register in data service - asynchronous

      this.ds.register(acno, pass, uname)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.router.navigateByUrl("")
          }
          
        },
        result=> {
          alert("user alredy exist")
          this.router.navigateByUrl("")
        }
        )
      
      }
    

    else {
        alert('form invalid ')
      }

    }


  }
