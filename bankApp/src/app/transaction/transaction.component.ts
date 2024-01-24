import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

acno:any
// to hold transaction arry
transaction:any

  constructor(private ds:DataService) {
// get login acno from data service
this.acno=this.ds.cacno

//get transaction array
this.transaction=this.ds.transaction(this.acno)
console.log(this.transaction);


  }

  ngOnInit(): void {
  }



}
