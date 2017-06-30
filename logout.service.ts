import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http'
import 'rxjs/add/operator/map';

class LogoutResponse {
	userName: string;
	LogoutResult: string;
	LogoutError: string;	
}

@Injectable()
export class LogoutService {
	private url: string;
	constructor(private http: Http) {
		this.url = 'http://127.0.0.1:11981/logout'
	}
	endSession(logoutInfo): Observable<LogoutResponse> {
		let headers = new Headers({'Content-Type' : 'application/json'});
		let options = new RequestOptions({method: RequestMethod.Post ,headers : headers , withCredentials : true});
		return this.http.post(this.url, logoutInfo, options).map((_res)=> _res.json());
	}
}
