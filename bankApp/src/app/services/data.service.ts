import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


    // login user b=name
    cusername:any

    // login acno
    cacno:any


  //data base
  userDetails: any = {
    1000: { acno: 1000, userName: 'max', password: 1000, balance: 5000,transaction:[]},
    1001: { acno: 1001, userName: 'anu', password: 1001, balance: 7000,transaction:[]},
    1002: { acno: 1002, userName: 'athul', password: 1002, balance: 6000,transaction:[]},

  }



  constructor(private http:HttpClient ) { this.getDetails()}


  //Store Data into Local Storage
  saveDetails(): void{
    //data base
    if (this.userDetails) {
      localStorage.setItem('userDetails',JSON.stringify(this.userDetails))
    }

    //login acno
    if(this.cacno){
      localStorage.setItem('cacno',JSON.stringify(this.cacno))
    }

    //login username
    if(this.cusername){
      localStorage.setItem('cusername',JSON.stringify(this.cusername))
    }
  }



    //To get data from local Storage
    getDetails(){

       //data base
      if(localStorage.getItem('userDetails')){
        this.userDetails= JSON.parse(localStorage.getItem('userDetails') || "")
      }
      
      //login acno
      if(localStorage.getItem('cacno')){
        this.cacno= JSON.parse(localStorage.getItem('cacno') || "")
      }

      //login usernamr
      if(localStorage.getItem('cusername')){
        this.cusername= JSON.parse(localStorage.getItem('cusername') || "")
      }
    }
   



  login(acno: any, pass: any) {
    //req body
    const data={
      acno, pass
    }

    //register api Asynchronous
    return this.http.post('http://localhost:3000/login',data)

  }






  //register
  register(acno: any, pass: any, uname: any) {
    //req body
    const data={
      acno, pass, uname
    }

    //register api Asynchronous
    return this.http.post('http://localhost:3000/register',data)

  }


  // deposit function
  deposit(acno: any, pass: any, amound: any) {
    let userDetails = this.userDetails

    if (acno in this.userDetails) {
      if (pass == this.userDetails[acno]['password']) {
        userDetails[acno]['balance'] +=Number(amound)
        userDetails[acno]['transaction'].push({
          type:'Credit',
          amound
        })
        console.log(userDetails);
        this.saveDetails()
        
        return userDetails[acno]['balance']
        
      }
      else {
        alert('incorrect password')
        return false
      }

    }

    else {
      alert('user doesnot exist')
      return false
    }
  }


  withdrow(acno2:any,amound2:any,pass2:any){
    let userDetails=this.userDetails
    if (acno2 in this.userDetails) {
      if (pass2==userDetails[acno2]['password']) {
        if (amound2<=userDetails[acno2]['balance']) {
          
        
          userDetails[acno2]['balance']-=parseInt(amound2)
          userDetails[acno2]['transaction'].push({
            type:'debit',
            amound2
          })
          console.log(userDetails);
          this.saveDetails()
          return userDetails[acno2]['balance']

        }
        else{
          alert('Insufficient balance')
          return false
        }
       
        
      }
      else{
        alert('wrong username or password')
        return false
      }
      
    }
    else{
      alert('user doesnot exist')
      return false
    }

  }


  // tansaction
  transaction(acno:any){
    return this.userDetails[acno]['transaction']
  }


}
