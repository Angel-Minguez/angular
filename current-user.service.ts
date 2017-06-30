import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class CurrentUserService {
	public currentUser: string;
	private subject = new Subject<string>();
	constructor() { }
	setCurrentUser(currentUser:string):void{
		this.currentUser = currentUser;
		this.subject.next(this.currentUser);
	}
	getCurrentUser():Observable<string> {
		return this.subject.asObservable();
	}
	
}
