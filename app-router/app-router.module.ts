import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RecoveryComponent } from '../recovery/recovery.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../authguard.service';

const appRoutes  = [
		{path: 'main', 	 component:LandingComponent, children:[
			{path: 'login/:status', component: LoginComponent, outlet: 'landingOutlet'},
			{path: 'register', component: RegisterComponent, outlet: 'landingOutlet'},
			{path: 'recovery/:userName/:id', component: RecoveryComponent, outlet: 'landingOutlet', canActivate: [AuthGuard]},
			{path: '', component: LoginComponent, outlet: 'landingOutlet'}
		]},
		{path: 'home/:user',component: HomeComponent},
		{path: '', redirectTo:'main', pathMatch: 'full'},
		{path: '**', component: LandingComponent}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [AuthGuard],
	declarations: [],
	exports: [RouterModule]
})
export class AppRouterModule { }
