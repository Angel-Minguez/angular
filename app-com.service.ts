import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AppComService {
	avatarUrl:string;
	constructor(private http : Http) { 
		this.avatarUrl = 'http://127.0.0.1:11981/userProfile';
	}
	sendAvatarImg(formData:FormData){
		let headers = new Headers();
       /* headers.append('Content-Type', 'undefined');*/
		let options = new RequestOptions({method: RequestMethod.Post, headers : headers , withCredentials : true});
		return this.http.post(this.avatarUrl, formData, options).map((_res)=> _res.json());
	};

}
