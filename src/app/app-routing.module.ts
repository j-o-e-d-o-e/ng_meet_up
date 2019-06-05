import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VoteComponent} from './vote/vote.component';
import {ResultsComponent} from './results/results.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';

const routes: Routes = [
  {path: 'vote', component: VoteComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
