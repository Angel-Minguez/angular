import { Component, OnInit, Input, ViewChild, OnDestroy ,HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbAlertConfig, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login.service';
import { CurrentUserService } from '../current-user.service';
import { RecoveryModalComponent } from '../recovery-modal/recovery-modal.component'
import { routerTransition } from '../animations';

@Component({
	providers: [LoginService],
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../styles/landingCard.css'],
	animations: [ routerTransition()],
})
export class LoginComponent implements OnDestroy, OnInit {
	 @HostBinding('@routerTransition') routerTransition:boolean ;
	data: {
		userName:	string, 
		userPwd:	string,
		rememberFlag:boolean
	}
	loginResponse: {
		userName:	string, 
		rememberFlag:boolean,
		loginResult:string,
		loginError: string,
		token:		Object
	}
	loginButtonPopoverMessage: string;
	recoveryButtonPopoverMessage: string;
	loginStatus : string;
	@ViewChild('statusNotification') statusNotification: NgbAlertConfig;
	@ViewChild('loginButton') loginButton: NgbPopover;
	constructor(private LoginService: LoginService, 
				private CurrentUserService: CurrentUserService, 
				private Router: Router, 
				private route: ActivatedRoute,
				private modalService: NgbModal) { 
		
		this.routerTransition = true;
		
		this.data = {	userName:'', 
						userPwd:'', 
						rememberFlag:false
					};
		this.loginResponse = {
						userName:'', 
						rememberFlag:false,
						loginResult:'',
						loginError:'',
						token:{}
					};
		this.loginButtonPopoverMessage = 'N/A';
		this.recoveryButtonPopoverMessage = 'N/A';
		this.loginStatus = 'N/A';
	}
	openRecoveryModal() {
		const modalRef = this.modalService.open(RecoveryModalComponent, {windowClass:'custom-modal'});
		modalRef.componentInstance.name = 'World';
	}
	getLoginData(userName:string, userPwd:string, rememberFlag:boolean){
		this.data.userName = userName;
		this.data.userPwd = userPwd;
		this.data.rememberFlag = rememberFlag;
		this.LoginService.sendData(this.data).subscribe(
			(_res) => {
				this.loginResponse = _res;				
			},
			(_error) => { 
				this.loginButtonPopoverMessage = 'Connection error, no server response';
				this.loginButton.open();
			},
			() => {
				if(this.loginResponse.loginResult =='LOGIN_OK') {
					localStorage.setItem('authToken', JSON.stringify(this.loginResponse.token));
					this.CurrentUserService.setCurrentUser(this.loginResponse.userName);
					this.Router.navigate(['/home',this.loginResponse.userName]);		
				}
				else {
					this.loginButtonPopoverMessage = this.loginResponse.loginError;
					this.loginButton.open();
				}
			});
	}
	ngOnInit() {
		this.route.params.subscribe(
			(_param: Params) => {
				this.loginStatus = _param['status'];
			});
	}
	ngOnDestroy() {}
}

@Component({
  selector: 'ngbd-alert-custom',
  templateUrl: './alert-custom.html',
  styles: [`
    :host >>> .alert-custom {
      color: #666;
	 background-color:transparent;
      border-color: rgb(233, 84, 32);
	  border-width: 2px;
	  box-shadow: 0 0 5px rgba(233, 84, 32, 1);
	  text-align: center;
    }
  `]
})
export class NgbdAlertCustom {}


