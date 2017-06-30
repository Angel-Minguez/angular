import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
	recoveryInfo : {
		randomString : string,
		userName : string
	}
	authResponse : {
		userName: string;
		authResult: string;
		authError: string;
	}
	constructor( private AuthService : AuthService, private router : Router) {
		this.recoveryInfo = {
			randomString : '',
			userName : ''
		};
		this.authResponse = {
			userName: '',
			authResult: '',
			authError: ''
		};
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		this.recoveryInfo.randomString = route.params.id;
		this.recoveryInfo.userName = route.params.userName;
		return this.AuthService.authRecovery(this.recoveryInfo).map((_res) => {
			if (_res.authResult == 'AUTH_OK') return true;
			else {
				this.router.navigate(['main', {outlets: {landingOutlet:['login','RECOVERY_FAIL']}}]);
				return false;
			}
		});
	}
}
