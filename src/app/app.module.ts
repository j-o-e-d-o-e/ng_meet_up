import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VoteComponent} from './vote/vote.component';
import {ResultsComponent} from './results/results.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import {ChartsModule} from 'ng2-charts';
import {ResultService} from './results/result.service';
import {FooterComponent} from './footer/footer.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {LoginComponent} from './login/login.component';
import {DataService} from './services/data/data.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SpinnerComponent} from './spinner/spinner.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';

// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ResultsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule,
    TooltipModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [UserService, ResultService, DataService, AuthService, AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
