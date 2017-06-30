import { Component, OnInit, ElementRef, ViewChild, Input, HostBinding } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { LoginService } from '../login.service';
import { routerTransition } from '../animations';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-recovery',
	providers: [LoginService],
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.css', '../styles/landingCard.css'],
	animations: [ routerTransition()]
})
export class RecoveryComponent implements OnInit {
	@HostBinding('@routerTransition') routerTransition: boolean;
	newPwdResponse : {
		userName:	string; 
		newPwdResult:string;
		newPwdError: string;
	};
	pwd1:string;
	pwd2:string;
	recoveryId: string;
	userName: string;
	popoverText: string;
	@ViewChild('newPwdSubmit')newPwdSubmit:NgbPopover;
	@ViewChild('newPwd') newPwd:ElementRef;
	constructor(private route: ActivatedRoute, private LoginService: LoginService, private Router : Router ) {
		this.recoveryId = '';
	}	
	sendNewPwdInfo(){
		if(this.pwd1 == this.pwd2) this.LoginService.sendNewPwd({userName: this.userName, userPwd: this.pwd1}).subscribe(
			(_res) => {
				this.newPwdResponse = _res;				
			},
			(_error) => { 
				this.popoverText = 'Connection error, no server response';
				this.newPwdSubmit.open();
			},
			() => {
				if(this.newPwdResponse.newPwdResult == 'NEW_PASSWORD_FAIL') {
					this.popoverText = this.newPwdResponse.newPwdError;
					this.newPwdSubmit.open();		
				}
				else {
					this.Router.navigate(['main', {outlets: {landingOutlet:['login','PASSWORD_RESET']}}]);
				}
			});
		else {
			 this.popoverText = "Passwords are different!";
			 this.newPwdSubmit.open();
		}
	}
	ngOnInit() {
		this.newPwd.nativeElement.focus();
		this.route.params.subscribe(
			(_param: Params) => {
				this.recoveryId = _param['id'];
				this.userName = _param['userName'];
			});
	}
}
