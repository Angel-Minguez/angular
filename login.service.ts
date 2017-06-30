import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

class LoginResponse {
	userName:	string; 
	rememberFlag:boolean;
	loginResult:string;
	loginError: string;
	token:		Object;
};
class RecoveryResponse {
	userEmail:	string; 
	recoveryResult:string;
	recoveryError: string;
};
class newPwdResponse {
	userName:	string; 
	newPwdResult:string;
	newPwdError: string;
};

@Injectable()
export class LoginService {
	private loginUrl: string;
	private recoveryUrl: string;
	private newPwdUrl : string;
	constructor(private http: Http) {
		this.loginUrl = 'http://127.0.0.1:11981/login';
		this.recoveryUrl = 'http://127.0.0.1:11981/pwdRecovery';
		this.newPwdUrl = 'http://127.0.0.1:11981/newPwd';
	}
	sendData(loginInfo):Observable<LoginResponse>{
		let headers = new Headers({'Content-Type' : 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post, headers : headers, withCredentials : true});
		return this.http.post(this.loginUrl, loginInfo, options).map((_res)=> _res.json());
	}
	sendRecoveryMail(userEmail):Observable<RecoveryResponse> {
		let headers = new Headers({'Content-type': 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post, headers : headers, withCredentials : true});
		return this.http.post(this.recoveryUrl, {userEmail: userEmail}, options).map((_res)=>_res.json());
	}
	sendNewPwd(newPwdInfo):Observable<newPwdResponse> {
		let headers = new Headers({'Content-type': 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post, headers : headers, withCredentials : true});
		return this.http.post(this.newPwdUrl, newPwdInfo, options).map((_res) => _res.json());
	}
}
