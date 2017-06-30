import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	constructor(public userProfileModal: NgbActiveModal) {}
	onSubmit(userProfileForm: NgForm){
		console.log(userProfileForm);
	}

	ngOnInit() {}
}
