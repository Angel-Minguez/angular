import { Component, OnInit, OnDestroy, ViewChild,HostBinding } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; 
import { RegisterService } from '../register.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { routerTransition } from '../animations';

@Component({
	providers: [RegisterService],
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css', '../styles/landingCard.css'],

	animations: [routerTransition()],
})
export class RegisterComponent implements OnInit, OnDestroy {
	 @HostBinding('@routerTransition') routerTransition: boolean;
	data: {
		userName:	string,
		userPwd:	string,
		userEmail:	string,
	}
	registerResponse: {
		userName: string,
        userNameExists: boolean,
        userPwd: string,
        userEmail: string,
        userEmailExists: boolean,
        registerResult: string,
        registerError: Array<string>
	};
	connectionError: string;
	inputUserNamePopoverMessage: string;
	inputUserMailPopoverMessage: string;
	inputUserPwdPopoverMessage : string;
	@ViewChild('inputNewUser') inputNewUser: NgbPopover;
	@ViewChild('inputNewMail') inputNewMail: NgbPopover;
	@ViewChild('inputNewPwd') inputNewPwd: NgbPopover;
	@ViewChild('registerButton') registerButton: NgbPopover;
	constructor(private RegisterService: RegisterService, private router: Router) { 
		this.routerTransition = true;
		this.data = {
			userName : '',
			userPwd : '',
			userEmail : '',
			};
		this.registerResponse = {
			userName: '',
			userNameExists: false,
			userPwd: '',
			userEmail: '',
			userEmailExists: false,
			registerResult: '',
			registerError: []
		}
		this.connectionError = '';
	}
	closePopovers(){
		this.inputNewMail.close();
		this.inputNewUser.close();	
		this.inputNewPwd.close();
		this.registerButton.close();
	}
	sendRegistration(userName:string, userPwd:string, userEmail:string){
		this.data.userName = userName;
		this.data.userPwd = userPwd;
		this.data.userEmail = userEmail;
		this.RegisterService.sendData(this.data).subscribe(
			(_res) => {
				this.registerResponse = _res;				
			},
			(error) => { 
				this.connectionError = 'Connection error, no server response.';
				this.registerButton.open();
			},
			() => {
				if(this.registerResponse.registerResult =='REGISTER_ERROR') {
					if(this.registerResponse.userNameExists){
						this.inputUserNamePopoverMessage = 'Username already in use.';
						this.inputNewUser.open();	
					}
					if(this.registerResponse.userEmailExists){
						this.inputUserMailPopoverMessage = 'E-mail already in use.';
						this.inputNewMail.open();
					}
					if(this.registerResponse.registerError[0].includes('validation failed')) {
						this.registerResponse.registerError.shift();
						this.registerResponse.registerError.forEach((_err)=>{
							if(_err.includes('valid e-mail')) {
								this.inputUserMailPopoverMessage = _err;
								this.inputNewMail.open();
							}
							if(_err.includes('password')) {
								this.inputUserPwdPopoverMessage = _err;
								this.inputNewPwd.open();
							}
							if(_err.includes('user')) {
								this.inputUserNamePopoverMessage = _err;
								this.inputNewUser.open();
							}
							if(_err.includes('e-mail')) {
								this.inputUserMailPopoverMessage = _err;
								this.inputNewMail.open();								
							}
						});	
					}
				} else {
					this.router.navigate(['main', {outlets: {landingOutlet:['login','NEW_ACCOUNT']}}]);
				}
			});		
	}
	ngOnDestroy() {}
	ngOnInit() {}
}
