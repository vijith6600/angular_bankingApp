import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  //path setting for user defined component
  {
    path:'',component:LoginComponent
  },
  //home component path
  {
    path:'home',component:HomeComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'trans',component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
