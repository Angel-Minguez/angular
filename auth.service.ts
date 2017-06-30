import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http'
import 'rxjs/add/operator/map';

class AuthResponse {
	userName: string;
	authResult: string;
	authError: string;
}

@Injectable()
export class AuthService {
	recoveryInfo : {
		userName : string,
		randomString : string
	}
	authUrl: string;
	constructor(private http: Http) {
		this.authUrl = 'http://127.0.0.1:11981/authenticator';
		this.recoveryInfo = {
			userName : '',
			randomString : ''
		};
	}
	sendToken(token):Observable<AuthResponse>{
		let headers = new Headers({'Content-Type' : 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post, headers : headers , withCredentials : true});
		return this.http.post(this.authUrl, {token: JSON.parse(token)}, options).map((_res)=> _res.json());
	}
	authRecovery(recoveryInfo: Object):Observable<AuthResponse> {
		let headers = new Headers({'Content-Type' : 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post, headers: headers, withCredentials: true});
		return this.http.post(this.authUrl, recoveryInfo, options).map((_res)=> _res.json());
	}
}
