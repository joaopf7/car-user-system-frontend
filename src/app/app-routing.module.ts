import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component:NavComponent, children: [
    {path:'home', component:HomeComponent},
    {path:'users', component:UserListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
