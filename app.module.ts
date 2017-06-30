import { AppRouterModule } from './app-router/app-router.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbdAlertCustom } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { CurrentUserService } from './current-user.service';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryModalComponent } from './recovery-modal/recovery-modal.component';
import { AuthService } from './auth.service';
import { TreeviewComponent } from './treeview/treeview.component';
import { TreeModule } from 'angular-tree-component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
	NgbdAlertCustom,
    LandingComponent,
    RegisterComponent,
    HomeComponent,
    RecoveryComponent,
    RecoveryModalComponent,
	TreeviewComponent,
	UserProfileComponent
  ],
  imports: [
	AppRouterModule,
	BrowserModule,
	BrowserAnimationsModule,
    FormsModule,
    HttpModule,
	JsonpModule,
	TreeModule,
	NgbModule.forRoot()
  ],
  entryComponents: [RecoveryModalComponent, UserProfileComponent],
  providers: [CurrentUserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
