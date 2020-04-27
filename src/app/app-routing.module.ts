import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/container/home.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { AuthGuard } from './modules/auth/guards/auth-guard.guard'
import { ExerciseContainerComponent } from './modules/exercise/container/exercise-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'exercise/:exerciseId', component: ExerciseContainerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
