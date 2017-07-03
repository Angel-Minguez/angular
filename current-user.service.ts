import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentUserService {
	public currentUser: string;
	private subject = new BehaviorSubject<string>('N/A');
	constructor() { }
	setCurrentUser(currentUser:string):void{
		this.currentUser = currentUser;
		this.subject.next(this.currentUser);
		console.log('[%s] set as current user', this.currentUser);
	}
	getCurrentUser():Observable<string> {
		return this.subject.asObservable();
	}
	
}
