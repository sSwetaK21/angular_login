import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:UserlistComponent,
    canActivate:[AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
