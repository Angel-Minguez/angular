import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http'
import 'rxjs/add/operator/map';

class RegisterResponse {
	userName: string;
	userNameExists: boolean;
	userPwd: string;
	userEmail: string;
	userEmailExists: boolean;
	registerResult: string;
	registerError: Array<string>;
}

@Injectable()
export class RegisterService {
	url: string;
	constructor(private http: Http) {
		this.url = 'http://127.0.0.1:11981/register'
	}
	sendData(registerInfo):Observable<RegisterResponse>{
		let headers = new Headers({'Content-Type' : 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post ,headers : headers , withCredentials : true});
		return this.http.post(this.url, registerInfo, options).map((_res)=> _res.json());
	}
}
