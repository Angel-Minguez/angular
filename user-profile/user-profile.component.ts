import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComService } from '../app-com.service';
import { CurrentUserService } from '../current-user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	providers: [AppComService]
})
export class UserProfileComponent implements OnInit {
	appUser: string;
	constructor(private UserProfileModal: NgbActiveModal, 
				private AppComService: AppComService,
				private CurrentUserService : CurrentUserService) {
		this.appUser = 'N/A';
	}
	onSubmit(userProfileForm: NgForm){
	}
	onChangeAvatarFile(event){
		if(event.srcElement.files.length > 0) {
			console.log('File added: [%s]', event.srcElement.files[0].name);
			let avatarImgFile : File = event.srcElement.files[0];
			let formData : FormData = new FormData();
			formData.append('avatar', avatarImgFile, avatarImgFile.name);
			this.AppComService.sendAvatarImg(formData).subscribe((_res)=> console.log(_res));
		}
	}
	ngOnInit() {
		this.CurrentUserService.getCurrentUser().subscribe((currentUser:string) => {
			this.appUser = currentUser;
		});			
			
	}
}
