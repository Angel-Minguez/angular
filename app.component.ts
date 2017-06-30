import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LogoutService } from './logout.service';
import { AuthService } from './auth.service'
import { CurrentUserService } from './current-user.service'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AuthService, LogoutService],
	animations: [
		trigger('flyIn', [
			state('in', style({transform: 'translateX(0)'})),
			transition('void => *', [
				style({transform: 'translateY(-50%)'}), animate(500)
			])
		]),
	]
})
export class AppComponent implements OnInit {
	appUser: string;
	isCollapsed:boolean;
	selector:Array<string>;
	isActive:number;
	highLightedLink;
	@ViewChild('userDropdown') userDropdown;
	dropdownActivated : boolean;
	constructor(private AuthService: AuthService, 
				private CurrentUserService: CurrentUserService, 
				private Router: Router,
				private LogoutService: LogoutService,
				private modalService: NgbModal){
		this.appUser = 'N/A';
		this.isCollapsed = true;
		this.selector = ['1.875%', '10.625%', '19.375%', '28.125%'];
		this.isActive = 0;
		this.highLightedLink = 0;
		this.dropdownActivated = false;
	}
	setActiveLink(link:number){
		this.isActive = link;
		this.highLightedLink = link;
	}
	setHoverLink(link:number){
		this.highLightedLink = link;
	}
	setLeaveLink(){
		this.highLightedLink = this.isActive;
	}
	activateUserDropdown(){
		if(this.userDropdown.isOpen()) this.dropdownActivated = true;
		else this.dropdownActivated = false;
	}
	logOut(){
		console.log('User: %s about to logout...', this.appUser);
		this.LogoutService.endSession({userName: this.appUser}).subscribe(
			(_res) => {
				this.CurrentUserService.setCurrentUser('N/A');
				localStorage.removeItem('authToken');
				this.Router.navigate(['']);
			},
			(_error) => { 
				console.log(_error);
			});
	}
	openUserProfileModal(content){
		this.modalService.open(UserProfileComponent);
	}
	ngOnInit() {
		this.CurrentUserService.getCurrentUser().subscribe((currentUser:string)=>{
			this.appUser = currentUser;
		});		
		if(localStorage.getItem('authToken')) {
			this.AuthService.sendToken(localStorage.getItem('authToken')).subscribe(
				(_res) => {
					if(_res.authResult == 'AUTH_OK') {
						this.appUser = _res.userName;
						this.CurrentUserService.setCurrentUser(_res.userName);
						this.Router.navigate(['/home',this.appUser]);
					}
					else {
						this.CurrentUserService.setCurrentUser('N/A');
						this.Router.navigate(['']);	
					}
				},
				(_error) => console.log(_error));
		}
		else {
			this.CurrentUserService.setCurrentUser('N/A');		
		}	
	}
}
