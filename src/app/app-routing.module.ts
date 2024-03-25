import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component:NavComponent, canActivate: [AuthGuard], children: [
    {path:'home', component:HomeComponent},
    {path:'users', component:UserListComponent},
    {path:'users/create', component:UserCreateComponent},
    {path:'users/update/:id', component:UserUpdateComponent},
    {path:'users/delete/:id', component:UserDeleteComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
